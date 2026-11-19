import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { UsersService } from "./users.service";
import { LoaderService } from "../loader/loader.service";
import { AssignmentCandidatesResponse, AssignmentCandidatesSort } from "../../interfaces/publishers.interface";
import { Publisher } from "../../interfaces/reuniones.interface";

describe("UsersService: contexto de candidatos", () => {
  let service: UsersService;
  let http: HttpTestingController;
  let loader: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    loader = jasmine.createSpyObj("LoaderService", ["setLoaderSearchPublisher"]);
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: LoaderService, useValue: loader }],
    });
    service = TestBed.inject(UsersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it("guarda solo los campos de ficha y envía frequency", () => {
    const publisher = {
      id: 25, fullName: "Persona Ejemplo", firstName: "Persona", lastName: "Ejemplo",
      surname: null, secondName: null, email: "persona@example.com", documentNumber: 123456,
      documentType: "CC", cellPhone: "+571234", phone: null, gender: "Masculino",
      frequency: 30, birthdate: "1990-01-15", image: null, congregationId: 2,
      password: "secreto", assignmentTypePermissions: [],
    } as Publisher;
    service.save(service.convertUserToSaveRequest(publisher)).subscribe();
    const request = http.expectOne(req => req.url.endsWith("/users") && req.method === "POST");
    expect(request.request.body.frequency).toBe(30);
    expect(request.request.body.congregationId).toBe(2);
    expect(request.request.body.password).toBeUndefined();
    expect(request.request.body.assignmentTypePermissions).toBeUndefined();
    request.flush(publisher);
  });

  it("elimina con solo el id en el body", () => {
    service.delete({ id: 25 }).subscribe();
    const request = http.expectOne(req => req.url.endsWith("/users") && req.method === "DELETE");
    expect(request.request.body).toEqual({ id: 25 });
    request.flush({ id: 25 });
  });

  it("conserva el título importado y distingue al ayudante B", () => {
    service.getPublishersByAssignment({
      assignment: "explainingYourBeliefsAssistant", congregationId: 2, dateAssignment: "2026-12-28",
      room: "B", assignmentId: 301, participantRole: "assistant",
      assignmentTitle: "Expliquemos nuestras creencias", sectionMeeting: "SEAMOS MEJORES MAESTROS", assignmentNumber: 6,
    }).subscribe();
    const query = http.expectOne(req => req.url.endsWith("/participated-and-authorized-by-assignment"));
    expect(query.request.params.get("assignmentId")).toBe("301");
    expect(query.request.params.get("participantRole")).toBe("assistant");
    expect(query.request.params.get("assignment")).toBe("explainingYourBeliefsAssistant");
    expect(query.request.params.get("room")).toBe("B");
    expect(query.request.params.get("assignmentTitle")).toBe("Expliquemos nuestras creencias");
    query.flush({ frequent: [], brothers: [], sisters: [] });
    expect(loader.setLoaderSearchPublisher).toHaveBeenCalledWith(false);
  });

  it("omite identidad y rol de parte para los cargos del programa", () => {
    service.getPublishersByAssignment({
      assignment: "president", congregationId: 2, dateAssignment: "2026-12-28", room: "A", assignmentTitle: "Presidencia",
    }).subscribe({ error: () => undefined });
    const query = http.expectOne(req => req.url.endsWith("/participated-and-authorized-by-assignment"));
    expect(query.request.params.has("assignmentId")).toBeFalse();
    expect(query.request.params.has("participantRole")).toBeFalse();
    expect(query.request.params.has("assignmentNumber")).toBeFalse();
    expect(query.request.params.has("sort")).toBeFalse();
    query.flush({ message: "Error" }, { status: 400, statusText: "Bad Request" });
    expect(loader.setLoaderSearchPublisher).toHaveBeenCalledWith(false);
  });

  const sorts: AssignmentCandidatesSort[] = [
    "lastAssignmentAsc", "lastAssignmentDesc", "lastGlobalAssignmentAsc", "lastGlobalAssignmentDesc",
  ];
  for (const sort of sorts) {
    it(`envía ${sort} y conserva las métricas y el orden devueltos por el backend`, () => {
      const response: AssignmentCandidatesResponse = {
        frequent: [], sisters: [], brothers: [
          { user: { id: 82 } as Publisher, history: { lastAssignment: "2026-10-12", allAssignments: 15, dateLastAssignment: "2026-11-16", daysSinceLastIntervention: 42, inNearFuture: 7 } },
          { user: { id: 81 } as Publisher, history: { lastAssignment: null, allAssignments: 0, dateLastAssignment: null, daysSinceLastIntervention: null, inNearFuture: null } },
        ],
      };
      service.getPublishersByAssignment({
        assignment: "explainingYourBeliefs", congregationId: 2, dateAssignment: "2026-12-28",
        room: "A", participantRole: "responsible", assignmentTitle: "Expliquemos nuestras creencias", sort,
      }).subscribe(data => expect(data).toEqual(response));
      const query = http.expectOne(req => req.url.endsWith("/participated-and-authorized-by-assignment"));
      expect(query.request.params.get("sort")).toBe(sort);
      query.flush(response);
    });
  }
});
