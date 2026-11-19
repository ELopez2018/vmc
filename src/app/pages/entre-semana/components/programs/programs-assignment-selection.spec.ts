import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MeetingRoom, ModalResult, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";
import { WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import { Program, WeeklyProgram } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { ModalService } from "src/app/core/services/modal/modal.service";
import { WeeklyProgramService } from "src/app/core/services/weeklyProgram/WeeklyProgram.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { ProgramValidationsService } from "src/app/core/services/program/program-validations.service";
import { UsersService } from "src/app/core/services/users/users.service";
import { SearchPublisherComponent } from "src/app/shared/modal/modal-container/search-publisher/search-publisher.component";
import { EntreSemanaComponent } from "../../entre-semana.component";
import { ProgramsComponent } from "./programs.component";

describe("Consulta de candidatos para asignaciones semanales", () => {
  let http: HttpTestingController;
  let selector: SearchPublisherComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    selector?.ngOnDestroy();
  });

  it("consulta Nuestra vida cristiana después de asignar varias partes sin recargar", async () => {
    const meeting = { id: 10, week: Date.UTC(2026, 10, 2) };
    const parts = [
      { number: 1, title: "Predico con valor", section: SectionMeeting.TESOROS_DE_LA_BIBLIA, type: AssignmentType.ASSIGNMENT_1 },
      { number: 4, title: "Empecemos conversaciones", section: SectionMeeting.SEAMOS_MEJORES_MAESTROS, type: AssignmentType.STARTING_A_CONVERSATION },
      { number: 5, title: "Hagamos revisitas", section: SectionMeeting.SEAMOS_MEJORES_MAESTROS, type: AssignmentType.FOLLOWING_UP },
      { number: 6, title: "Hagamos discípulos", section: SectionMeeting.SEAMOS_MEJORES_MAESTROS, type: AssignmentType.MAKING_DISCIPLES },
      { number: 7, title: "Discurso sobre compartir lo que tenemos", section: SectionMeeting.NUESTRA_VIDA_CRISTIANA, type: AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS },
    ];
    const rows = parts.map((part) => ({
      id: 900 + part.number, program: 501, room: MeetingRoom.MAIN,
      responsible: null, assistant: null, responsibleB: null, assistantB: null, congregation: { id: 2 },
      assignment: { id: 300 + part.number, number: part.number, title: part.title, sectionMeeting: part.section, meeting },
    } as WeeklyProgramPdF));
    const program = { id: 501, meeting, weeklyPrograms: rows } as unknown as Program;
    let modalInputs: Partial<SearchPublisherComponent>;
    let resolveSelection!: (publisher: unknown) => void;
    const open = jasmine.createSpy("open").and.callFake(() => {
      modalInputs = {};
      return { componentInstance: modalInputs, result: new Promise((resolve) => { resolveSelection = resolve; }) };
    });
    const component = new ProgramsComponent(null!, new ModalService({ open } as unknown as NgbModal), null!, TestBed.inject(WeeklyProgramService), null!);
    component.semanas = [program];
    const dataService = {
      getCongregation$: () => of({ id: 2 }), getMeeting: () => of([program]),
    } as unknown as DataService;

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const view = { ...row };
      component.changeWeeklyProgram(view, WeeklyProgramChangeType.RESPONSIBLE);
      selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!, { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService, TestBed.inject(ProgramValidationsService));
      Object.assign(selector, modalInputs!);
      selector.onClicked.subscribe((publisher) => resolveSelection(publisher));
      selector.ngOnInit();

      const publisher = { id: 80 + index, fullName: `Participante ${index}`, gender: "Masculino" };
      const query = http.expectOne((request) => request.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
      expect(query.request.params.get("assignment")).toBe(parts[index].type);
      expect(query.request.params.get("assignmentNumber")).toBe(String(parts[index].number));
      expect(query.request.params.get("dateAssignment")).toBe("2026-11-02");
      query.flush({ frequent: [], sisters: [], brothers: [{ user: publisher, history: {} }] });
      expect(selector.male.length).toBe(1);
      selector.selected(selector.male[0]);
      await Promise.resolve();

      const save = http.expectOne((request) => request.method === "PUT" && request.url.endsWith(`/weeklyProgram/${row.id}`));
      expect(save.request.body.responsibleId).toBe(publisher.id);
      expect(save.request.body.assistantId).toBeNull();
      expect(save.request.body.programId).toBe(501);
      const { meeting: omittedMeeting, ...assignment } = row.assignment;
      save.flush({ id: row.id, programId: 501, assignment, congregation: { id: 2 }, responsible: publisher, assistant: null, room: "A", startTime: null, notificationSentAt: null });
      expect(row.assignment.meeting).toBe(meeting as any);
      expect(view.responsible?.id).toBe(publisher.id);
      selector.ngOnDestroy();
    }
    expect(open).toHaveBeenCalledTimes(5);
  });

  it("muestra el mensaje y código HTTP del backend al fallar Nuestra vida cristiana", () => {
    const dataService = {
      getCongregation$: () => of({ id: 2 }), getMeeting: () => of([]),
    } as unknown as DataService;
    selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!, { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService, TestBed.inject(ProgramValidationsService));
    Object.assign(selector, {
      week: Date.UTC(2026, 10, 2), assignmentType: AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS,
      assignment: { assignment: { number: 7, title: "Compartamos lo que tenemos", sectionMeeting: SectionMeeting.NUESTRA_VIDA_CRISTIANA } },
    });
    selector.ngOnInit();
    const query = http.expectOne((request) => request.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
    query.flush({ message: "No existe el tipo de autorización solicitado." }, { status: 400, statusText: "Bad Request" });
    expect(selector.loadError).toContain("HTTP 400");
    expect(selector.loadError).toContain("No existe el tipo de autorización solicitado.");
    expect(selector.showSpinner).toBeFalse();
    expect(selector.male).toEqual([]);
  });

  it("muestra un error local y no envía assignment vacío si no reconoce el título", () => {
    selector = new SearchPublisherComponent(
      { getCongregation$: () => of({ id: 2 }), getMeeting: () => of([]) } as unknown as DataService,
      TestBed.inject(LoaderService), TestBed.inject(UsersService), null!,
      { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService,
      TestBed.inject(ProgramValidationsService),
    );
    selector.week = "2026-12-28";
    selector.assignmentType = "";
    selector.ngOnInit();
    expect(selector.loadError).toContain("No se pudo identificar el tipo de asignación");
    expect(selector.showSpinner).toBeFalse();
    http.expectNone(req => req.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
  });

  it("consulta assignment3 en sala B el 2026-12-28 antes de crear la sala y luego guarda con programId", async () => {
    const meeting = { id: 10, week: Date.UTC(2026, 11, 28) };
    // La proyección de lectura puede omitir assignmentId y todavía no existir sala B.
    const main = {
      id: 901, program: 501, room: "A", congregation: { id: 2 },
      assignment: { number: 3, title: "Lectura de la Biblia", sectionMeeting: SectionMeeting.TESOROS_DE_LA_BIBLIA, meeting },
      responsible: { id: 70 },
    } as WeeklyProgram;
    const program = { id: 501, meeting, weeklyPrograms: [main] } as Program;
    const view = { ...main, responsibleB: null } as WeeklyProgramPdF;
    let inputs: Partial<SearchPublisherComponent> = {};
    let resolveSelection!: (value: unknown) => void;
    const open = jasmine.createSpy("open").and.callFake(() => ({
      componentInstance: inputs, result: new Promise(resolve => { resolveSelection = resolve; }),
    }));
    const component = new ProgramsComponent(null!, new ModalService({ open } as unknown as NgbModal), null!, TestBed.inject(WeeklyProgramService), null!);
    component.semanas = [program];
    component.changeWeeklyProgram(view, WeeklyProgramChangeType.RESPONSIBLE_B);
    expect(open).toHaveBeenCalledTimes(1);
    http.expectNone(req => req.method === "POST" || req.method === "PUT");
    selector = new SearchPublisherComponent(
      { getCongregation$: () => of({ id: 2 }), getMeeting: () => of([program]) } as unknown as DataService,
      TestBed.inject(LoaderService), TestBed.inject(UsersService), null!,
      { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService,
      TestBed.inject(ProgramValidationsService),
    );
    Object.assign(selector, inputs);
    selector.onClicked.subscribe(value => resolveSelection(value));
    selector.ngOnInit();
    const query = http.expectOne(req => req.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
    expect(query.request.method).toBe("GET");
    expect(query.request.params.keys().sort()).toEqual(["assignment", "congregationId", "dateAssignment", "room", "assignmentTitle", "sectionMeeting", "assignmentNumber", "participantRole"].sort());
    expect(query.request.params.get("assignmentId")).toBeNull();
    expect(query.request.params.get("participantRole")).toBe("responsible");
    expect(query.request.params.get("assignment")).toBe("assignment3");
    expect(query.request.params.get("congregationId")).toBe("2");
    expect(query.request.params.get("dateAssignment")).toBe("2026-12-28");
    expect(query.request.params.get("room")).toBe("B");
    expect(query.request.params.get("assignmentTitle")).toBe("Lectura de la Biblia");
    expect(query.request.params.get("sectionMeeting")).toBe("TESOROS DE LA BIBLIA");
    expect(query.request.params.get("assignmentNumber")).toBe("3");
    const publisher = { id: 81, fullName: "Lector sala B" };
    query.flush({ frequent: [{ user: publisher, history: {} }], brothers: [], sisters: [] });
    selector.selected(selector.usedPublishersList[0]);
    await Promise.resolve();
    http.expectOne(req => req.method === "GET" && req.url.endsWith("/weeklyProgram/901"))
      .flush({ id: 901, programId: 501, assignment: { id: 301 } });
    const save = http.expectOne(req => req.method === "POST" && req.url.endsWith("/weeklyProgram"));
    expect(save.request.body.programId).toBe(501);
    expect(save.request.body.assignmentId).toBe(301);
    expect(save.request.body.room).toBe("B");
    expect(save.request.body.responsibleId).toBe(81);
    save.flush({ id: 902, programId: 501, assignment: { id: 301 }, responsible: publisher, room: "B" });
    expect(program.weeklyPrograms.length).toBe(2);
    expect(main.responsible?.id).toBe(70);
    expect(view.responsibleB?.id).toBe(81);

    // La siguiente apertura reutiliza la fila creada y no dispara otro POST.
    inputs = {};
    component.changeWeeklyProgram(view, WeeklyProgramChangeType.RESPONSIBLE_B);
    expect(inputs.assignment?.id).toBe(902);
    http.expectNone(req => req.method === "POST");
    resolveSelection(ModalResult.CLOSE);
    await Promise.resolve();
  });

  it("guarda el ayudante de sala B sin cambiar los demás participantes", async () => {
    const assignment = { id: 301, number: 4, title: "Empiece conversaciones", sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS };
    const row = { id: 902, program: 501, room: "B", congregation: { id: 2 }, assignment, responsible: { id: 80 } } as WeeklyProgram;
    const view = { ...row, responsible: { id: 70 }, assistant: { id: 71 } } as WeeklyProgramPdF;
    const publisher = { id: 81, fullName: "Ayudante B" };
    const modal = { assignPublisherWeeklyProgram: () => Promise.resolve(publisher) } as unknown as ModalService;
    const component = new ProgramsComponent(null!, modal, null!, TestBed.inject(WeeklyProgramService), null!);
    component.semanas = [{ id: 501, meeting: { week: Date.UTC(2026, 10, 2) }, weeklyPrograms: [row] }] as Program[];
    component.changeWeeklyProgram(view, WeeklyProgramChangeType.ASSISTANT_B);
    await Promise.resolve();
    const save = http.expectOne((request) => request.method === "PUT" && request.url.endsWith("/weeklyProgram/902"));
    expect(save.request.body.responsibleId).toBe(80);
    expect(save.request.body.assistantId).toBe(81);
    expect(save.request.body.room).toBe("B");
    save.flush({ id: 902, programId: 501, assignment, responsible: row.responsible, assistant: publisher, room: "B" });
    expect(view.assistantB?.id).toBe(81);
    expect(view.responsible?.id).toBe(70);
    expect(view.assistant?.id).toBe(71);
  });

  for (const title of ["Predico con valor", "Discurso de Tesoros de la Biblia"]) {
    for (const meeting of [undefined, { id: 10 }, { id: 10, week: Date.UTC(2026, 10, 2) }]) {
      it(`consulta responsables de la parte 1: ${title}, reunión ${JSON.stringify(meeting)}`, () => {
        const weeklyProgram = {
          id: 901, program: 501, room: MeetingRoom.MAIN,
          responsibleB: null, assistantB: null, congregation: { id: 2 },
          assignment: { id: 301, number: 1, title, sectionMeeting: SectionMeeting.TESOROS_DE_LA_BIBLIA, meeting },
        } as WeeklyProgramPdF;
        const component = Object.create(ProgramsComponent.prototype) as ProgramsComponent;
        component.semanas = [{
          id: 501, meeting: { id: 10, week: Date.UTC(2026, 10, 2) }, weeklyPrograms: [weeklyProgram],
        } as unknown as Program];
        const modalInputs: Partial<SearchPublisherComponent> = {};
        const open = jasmine.createSpy("open").and.returnValue({
          componentInstance: modalInputs, result: Promise.resolve(ModalResult.CLOSE),
        });
        (component as any).modalService = new ModalService({ open } as unknown as NgbModal);

        component.changeWeeklyProgram(weeklyProgram, WeeklyProgramChangeType.RESPONSIBLE);

        expect(open).toHaveBeenCalledTimes(1);
        const dataService = {
          getCongregation$: () => of(weeklyProgram.congregation), getMeeting: () => of([]),
        } as unknown as DataService;
        selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!, { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService, TestBed.inject(ProgramValidationsService));
        Object.assign(selector, modalInputs);
        selector.ngOnInit();

        expect(selector.loadError).toBe("");
        const request = http.expectOne((req) => req.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
        expect(request.request.params.get("assignment")).toBe(AssignmentType.ASSIGNMENT_1);
        expect(request.request.params.get("dateAssignment")).toBe("2026-11-02");
        expect(request.request.params.get("room")).toBe(MeetingRoom.MAIN);
        expect(request.request.params.get("assignmentNumber")).toBe("1");
        expect(request.request.params.get("assignmentTitle")).toBe(title);
        expect(request.request.params.get("sectionMeeting")).toBe(SectionMeeting.TESOROS_DE_LA_BIBLIA);
        request.flush({ frequent: [], brothers: [], sisters: [] });
        expect(selector.showSpinner).toBeFalse();
      });
    }
  }

  const selections = [
    { change: WeeklyProgramChangeType.RESPONSIBLE, room: MeetingRoom.MAIN, role: "responsible" },
    { change: WeeklyProgramChangeType.RESPONSIBLE_B, room: MeetingRoom.AUXILIARY, role: "responsible" },
    { change: WeeklyProgramChangeType.ASSISTANT, room: MeetingRoom.MAIN, role: "assistant" },
    { change: WeeklyProgramChangeType.ASSISTANT_B, room: MeetingRoom.AUXILIARY, role: "assistant" },
  ];

  const parts = [
    { title: "Empiece conversaciones", number: 4, responsible: AssignmentType.STARTING_A_CONVERSATION, assistant: AssignmentType.STARTING_A_CONVERSATION_ASSISTANT },
    { title: "Empecemos conversaciones", number: 4, responsible: AssignmentType.STARTING_A_CONVERSATION, assistant: AssignmentType.STARTING_A_CONVERSATION_ASSISTANT },
    { title: "Haga revisitas", number: 5, responsible: AssignmentType.FOLLOWING_UP, assistant: AssignmentType.FOLLOWING_UP_ASSISTANT },
    { title: "Hagamos revisitas", number: 5, responsible: AssignmentType.FOLLOWING_UP, assistant: AssignmentType.FOLLOWING_UP_ASSISTANT },
    { title: "Haga discípulos", number: 6, responsible: AssignmentType.MAKING_DISCIPLES, assistant: AssignmentType.MAKING_DISCIPLES_ASSISTANT },
    { title: "Hagamos discípulos", number: 6, responsible: AssignmentType.MAKING_DISCIPLES, assistant: AssignmentType.MAKING_DISCIPLES_ASSISTANT },
    { title: "Explique sus creencias", number: 6, responsible: AssignmentType.EXPLAINING_YOUR_BELIEFS, assistant: AssignmentType.EXPLAINING_YOUR_BELIEFS_ASSISTANT },
    { title: "Expliquemos nuestras creencias", number: 6, responsible: AssignmentType.EXPLAINING_YOUR_BELIEFS, assistant: AssignmentType.EXPLAINING_YOUR_BELIEFS_ASSISTANT },
    { title: "EXPLIQUEMOS NUESTRAS CREENCIAS", number: 6, responsible: AssignmentType.EXPLAINING_YOUR_BELIEFS, assistant: AssignmentType.EXPLAINING_YOUR_BELIEFS_ASSISTANT },
    { title: "¿Qué diría?", number: 6, responsible: AssignmentType.WHAT_WOULD_YOU_SAY, assistant: AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT },
    { title: "¿Qué dirías?", number: 6, responsible: AssignmentType.WHAT_WOULD_YOU_SAY, assistant: AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT },
  ];

  const categories = [
    { code: 'STARTING_A_CONVERSATION', type: AssignmentType.STARTING_A_CONVERSATION },
    { code: 'FOLLOWING_UP', type: AssignmentType.FOLLOWING_UP },
    { code: 'MAKING_DISCIPLES', type: AssignmentType.MAKING_DISCIPLES },
    { code: 'EXPLAINING_BELIEFS', type: AssignmentType.EXPLAINING_YOUR_BELIEFS },
    { code: 'WHAT_WOULD_YOU_SAY', type: AssignmentType.WHAT_WOULD_YOU_SAY },
    { code: 'SPEECH', type: AssignmentType.SPEECH },
  ];
  for (const category of categories) {
    for (const selection of selections.filter(item => category.code !== 'SPEECH' || item.role !== 'assistant')) {
      it(`usa ${category.code} con título editado para ${selection.role} ${selection.room}`, () => {
        const weeklyProgram = {
          id: 901, program: 501, room: selection.room, congregation: { id: 2 },
          assignment: { id: 301, title: 'Título completamente editado', number: 8,
            sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS, categoryCode: category.code,
            participationMode: category.code === 'SPEECH' ? 'SOLO' : 'PAIR',
          },
        } as WeeklyProgram;
        const expected = selection.role === 'assistant' ? `${category.type}Assistant` : category.type;
        const component = Object.create(ProgramsComponent.prototype) as ProgramsComponent;
        component.selectAssignmentType(weeklyProgram, selection.change);
        expect(component.assignmentType).toBe(expected);
        const legacy = Object.create(EntreSemanaComponent.prototype) as EntreSemanaComponent;
        legacy.selectAssignmentType(weeklyProgram, selection.change);
        expect(legacy.assignmentType).toBe(expected);
        selector = new SearchPublisherComponent(
          { getCongregation$: () => of({ id: 2 }), getMeeting: () => of([]) } as unknown as DataService,
          TestBed.inject(LoaderService), TestBed.inject(UsersService), null!,
          { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService, TestBed.inject(ProgramValidationsService),
        );
        // Incluso una clave heredada contradictoria se sustituye con la identidad recibida.
        Object.assign(selector, { assignment: weeklyProgram, assignmentType: 'speech', type: selection.role, room: selection.room, week: '2026-12-28' });
        selector.ngOnInit();
        const query = http.expectOne(req => req.url.endsWith('/participated-and-authorized-by-assignment'));
        expect(query.request.params.get('assignment')).toBe(expected);
        expect(query.request.params.get('assignmentId')).toBe('301');
        expect(query.request.params.get('assignmentTitle')).toBe('Título completamente editado');
        expect(query.request.params.get('participantRole')).toBe(selection.role);
        expect(query.request.params.get('room')).toBe(selection.room);
        query.flush({ frequent: [], brothers: [], sisters: [] });
      });
    }
  }
  for (const participationMode of ['SOLO', 'UNKNOWN'] as const) {
    for (const room of ['A', 'B']) {
      it(`aplica la política transitoria de ayudante ${room} con modalidad ${participationMode}`, () => {
        selector = new SearchPublisherComponent(
          { getCongregation$: () => of({ id: 2 }), getMeeting: () => of([]) } as unknown as DataService,
          TestBed.inject(LoaderService), TestBed.inject(UsersService), null!,
          { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService, TestBed.inject(ProgramValidationsService),
        );
        Object.assign(selector, { assignmentType: 'explainingYourBeliefsAssistant', type: 'assistant', room, week: '2026-12-28',
          assignment: { assignment: { id: 301, categoryCode: 'EXPLAINING_BELIEFS', participationMode, sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS } },
        });
        selector.ngOnInit();
        if (participationMode === 'UNKNOWN') {
          const query = http.expectOne(req => req.url.endsWith('/participated-and-authorized-by-assignment'));
          expect(query.request.params.get('assignment')).toBe('explainingYourBeliefsAssistant');
          expect(query.request.params.get('assignmentId')).toBe('301');
          expect(query.request.params.get('participantRole')).toBe('assistant');
          expect(query.request.params.get('room')).toBe(room);
          query.flush({ frequent: [], brothers: [], sisters: [] });
          expect(selector.loadError).toBe('');
        } else {
          expect(selector.loadError).toContain('no admite ayudante');
          http.expectNone(req => req.url.endsWith('/participated-and-authorized-by-assignment'));
        }
        expect(selector.showSpinner).toBeFalse();
        http.expectNone(req => req.method === 'POST' || req.method === 'PUT');
      });
    }
  }

  for (const number of [1, 3, 7, 8]) {
    it(`no clasifica una parte desconocida de maestros por su número ${number}`, () => {
      const row = { assignment: { number, title: 'Tema sin categoría', sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS } } as WeeklyProgram;
      const component = Object.create(ProgramsComponent.prototype) as ProgramsComponent;
      component.selectAssignmentType(row, WeeklyProgramChangeType.RESPONSIBLE);
      expect(component.assignmentType).toBe('');
      const legacy = Object.create(EntreSemanaComponent.prototype) as EntreSemanaComponent;
      legacy.selectAssignmentType(row, WeeklyProgramChangeType.RESPONSIBLE);
      expect(legacy.assignmentType).toBe('');
    });
  }

  for (const part of parts) {
    const title = part.title;
    for (const number of [part.number, 7, 8]) {
      for (const selection of selections) {
        it(`envía el tipo de ${selection.role} en sala ${selection.room} para ${number}. ${title}`, () => {
          const expectedAssignmentType = selection.role === "assistant" ? part.assistant : part.responsible;
          const weeklyProgram = {
            id: 901, program: 501, room: selection.room, responsibleB: null, assistantB: null,
            congregation: { id: 2 },
            assignment: {
              id: 301, number, title, sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS,
              meeting: { id: 10, week: Date.UTC(2026, 10, 2) },
            },
          } as WeeklyProgramPdF;
          const component = Object.create(ProgramsComponent.prototype) as ProgramsComponent;
          component.semanas = [];
          spyOn<any>(component, "getWeeklyProgramForRoom").and.returnValue(of(weeklyProgram));
          const openSelector = jasmine.createSpy("assignPublisherWeeklyProgram").and.callFake((assignment, assignmentType, type, room, brothersOnly, week) => {
            const dataService = {
              getCongregation$: () => of(weeklyProgram.congregation),
              getMeeting: () => of([]),
            } as unknown as DataService;
            selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!, { getProgramsByDateRange: () => of([]) } as unknown as MeetingsService, TestBed.inject(ProgramValidationsService));
            Object.assign(selector, { assignment, assignmentType, type, room, brothersOnly, week });
            selector.ngOnInit();
            return Promise.resolve(ModalResult.CLOSE);
          });
          (component as any).modalService = { assignPublisherWeeklyProgram: openSelector };

          component.changeWeeklyProgram(weeklyProgram, selection.change);

          expect(openSelector).toHaveBeenCalledWith(weeklyProgram, expectedAssignmentType, selection.role, selection.room, false, Date.UTC(2026, 10, 2));
          const request = http.expectOne((req) => req.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
          expect(request.request.method).toBe("GET");
          expect(request.request.params.get("assignment")).toBe(expectedAssignmentType);
          expect(request.request.params.get("assignmentId")).toBe("301");
          expect(request.request.params.get("participantRole")).toBe(selection.role);
          expect(request.request.params.get("room")).toBe(selection.room);
          expect(request.request.params.get("congregationId")).toBe("2");
          expect(request.request.params.get("dateAssignment")).toBe("2026-11-02");
          expect(request.request.params.get("assignmentTitle")).toBe(title);
          expect(request.request.params.get("sectionMeeting")).toBe(SectionMeeting.SEAMOS_MEJORES_MAESTROS);
          expect(request.request.params.get("assignmentNumber")).toBe(String(number));
          request.flush({ frequent: [], brothers: [], sisters: [] });
          http.expectNone((req) => req.url.endsWith("/assignment-balancing/pairs"));
        });
      }
    }
  }

  for (const title of ["¿Qué diría?", "¿Qué dirías?"]) {
    for (const selection of selections) {
      it(`reconoce ${title} para ${selection.role} en sala ${selection.room} desde EntreSemanaComponent`, () => {
        const component = Object.create(EntreSemanaComponent.prototype) as EntreSemanaComponent;
        component.selectAssignmentType({
          assignment: { number: 6, title, sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS },
        } as WeeklyProgram, selection.change);
        expect(component.assignmentType).toBe(selection.role === "assistant"
          ? AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT
          : AssignmentType.WHAT_WOULD_YOU_SAY);
      });
    }
  }
});
