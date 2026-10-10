import {
  Apis,
  HttpClient,
  Injectable,
  MEETING_PARTS,
  Servers,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-MIOFCSIM.js";

// src/app/core/utils/program-event.util.ts
var ASSEMBLY_KEYWORD = "asamblea";
var CIRCUIT_OVERSEER_VISIT = "visita del superintendente de circuito";
var normalize = (value) => (value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
function hasProgramEvent(event) {
  return normalize(event).length > 0;
}
function isAssemblyEvent(event) {
  return normalize(event).includes(ASSEMBLY_KEYWORD);
}
function isSpecialEventWeek(event) {
  return hasProgramEvent(event) && !isAssemblyEvent(event);
}
function isCircuitOverseerVisit(event) {
  return normalize(event).includes(CIRCUIT_OVERSEER_VISIT);
}
function isPendingOverseerTalkTitle(title) {
  return normalize(title) === normalize(MEETING_PARTS.CONGREGATION_BIBLE_STUDY);
}
function needsOverseerTalkTitle(event, title) {
  return isSpecialEventWeek(event) && isPendingOverseerTalkTitle(title);
}

// src/app/shared/Utils.ts
var Utils = class {
  static showDayOfMeeting(fechaSemana, meetingDay, onlyMonth = false, event) {
    const fecha = new Date(fechaSemana);
    const effectiveMeetingDay = isCircuitOverseerVisit(event) ? 2 : meetingDay;
    fecha.setDate(fecha.getDate() + effectiveMeetingDay);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mesIndex = fecha.getMonth();
    const a\u00F1o = fecha.getFullYear();
    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const mesNombre = meses[mesIndex];
    const mesNumero = (mesIndex + 1).toString().padStart(2, "0");
    return onlyMonth ? `${dia} DE ${mesNombre}` : `${dia}-${mesNumero}-${a\u00F1o}`;
  }
  static adapterTime(dateTime) {
    let horas;
    let minutos;
    let prefijo = "";
    if (!dateTime) {
      return "0.00";
    }
    if (typeof dateTime != "string") {
      prefijo = "0";
      horas = dateTime[0];
      minutos = dateTime[1];
    } else {
      prefijo = "0";
      const tiempo = dateTime.split(":").slice(0, 2);
      horas = tiempo[0];
      minutos = tiempo[1];
    }
    let newHora = horas;
    if (newHora >= 13) {
      newHora -= 12;
    }
    return `${newHora}:${minutos > 9 ? minutos : prefijo + parseInt(minutos)}`;
  }
  static showFirstDateOfWeek(fechaSemana) {
    return true;
  }
};

// src/app/core/services/assignment/assignment.service.ts
var AssignmentService = class _AssignmentService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.server = Servers.URL;
    this.api = Apis;
  }
  getAllAssignment() {
    const url = `${this.server}${this.api.ASSIGNMENT}`;
    return this.httpClient.get(url);
  }
  updateAssignment(assignment) {
    const url = `${this.server}${this.api.ASSIGNMENT}`;
    return this.httpClient.put(url, assignment);
  }
  getPublishersByAssignment(assignment) {
    const params = ``;
    const url = `${this.server}${this.api.ASSIGNMENT}/publisher-by-assignment${params}`;
    return this.httpClient.get(url);
  }
  getDistinctByTitle() {
    const url = `${this.server}${this.api.ASSIGNMENT}/titles`;
    return this.httpClient.get(url);
  }
  save(assignment) {
    const url = `${this.server}${this.api.ASSIGNMENT}`;
    return this.httpClient.post(url, assignment);
  }
  sendNotifications(body) {
    const url = `${this.server}${this.api.ASSIGNMENT}/send-notification`;
    return this.httpClient.post(url, body);
  }
  static {
    this.\u0275fac = function AssignmentService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AssignmentService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AssignmentService, factory: _AssignmentService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssignmentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  isAssemblyEvent,
  isSpecialEventWeek,
  needsOverseerTalkTitle,
  Utils,
  AssignmentService
};
//# sourceMappingURL=chunk-M2KX2K5L.js.map
