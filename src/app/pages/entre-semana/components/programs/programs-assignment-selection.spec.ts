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
      selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!);
      Object.assign(selector, modalInputs!);
      selector.onClicked.subscribe((publisher) => resolveSelection(publisher));
      selector.ngOnInit();

      const query = http.expectOne((request) => request.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
      expect(query.request.params.get("assignment")).toBe(parts[index].type);
      expect(query.request.params.get("assignmentNumber")).toBe(String(parts[index].number));
      expect(query.request.params.get("dateAssignment")).toBe("2026-11-02");
      const publisher = { id: 80 + index, fullName: `Participante ${index}`, gender: "Masculino" };
      query.flush({ frequent: [], sisters: [], brothers: [{ user: publisher, history: {} }] });
      expect(selector.male.length).toBe(1);
      selector.selected(selector.male[0]);
      await Promise.resolve();

      const save = http.expectOne((request) => request.method === "PUT" && request.url.endsWith(`/weeklyProgram/${row.id}`));
      expect(save.request.body.responsibleId).toBe(publisher.id);
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
    selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!);
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
        selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!);
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
    { title: "¿Qué diría?", number: 6, responsible: AssignmentType.WHAT_WOULD_YOU_SAY, assistant: AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT },
    { title: "¿Qué dirías?", number: 6, responsible: AssignmentType.WHAT_WOULD_YOU_SAY, assistant: AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT },
  ];

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
          spyOn<any>(component, "getOrCreateWeeklyProgramForRoom").and.returnValue(of(weeklyProgram));
          const openSelector = jasmine.createSpy("assignPublisherWeeklyProgram").and.callFake((assignment, assignmentType, type, room, brothersOnly, week) => {
            const dataService = {
              getCongregation$: () => of(weeklyProgram.congregation),
              getMeeting: () => of([]),
            } as unknown as DataService;
            selector = new SearchPublisherComponent(dataService, TestBed.inject(LoaderService), TestBed.inject(UsersService), null!);
            Object.assign(selector, { assignment, assignmentType, type, room, brothersOnly, week });
            selector.ngOnInit();
            return Promise.resolve(ModalResult.CLOSE);
          });
          (component as any).modalService = { assignPublisherWeeklyProgram: openSelector };

          component.changeWeeklyProgram(weeklyProgram, selection.change);

          expect(openSelector).toHaveBeenCalledWith(weeklyProgram, expectedAssignmentType, selection.role, selection.room, false, Date.UTC(2026, 10, 2));
          const request = http.expectOne((req) => req.url.endsWith("/users/by-congregation/participated-and-authorized-by-assignment"));
          expect(request.request.params.get("assignment")).toBe(expectedAssignmentType);
          expect(request.request.params.get("room")).toBe(selection.room);
          expect(request.request.params.get("congregationId")).toBe("2");
          expect(request.request.params.get("dateAssignment")).toBe("2026-11-02");
          expect(request.request.params.get("assignmentTitle")).toBe(title);
          expect(request.request.params.get("sectionMeeting")).toBe(SectionMeeting.SEAMOS_MEJORES_MAESTROS);
          expect(request.request.params.get("assignmentNumber")).toBe(String(number));
          request.flush({ frequent: [], brothers: [], sisters: [] });
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
