import { Publisher } from "src/app/core/interfaces/reuniones.interface";

export function daysLabel(days: number): string {
  return `${days} ${days === 1 ? "día" : "días"}`;
}

export function nearFutureAssignmentLabel(days: number | null | undefined): string {
  return days == null ? "Sin próxima asignación registrada" : `Próxima asignación en ${daysLabel(days)}`;
}

// Solo se advierte si la próxima participación cae dentro de este plazo.
export const NEAR_FUTURE_WARNING_DAYS = 14;

// Mensaje de advertencia al asignar a alguien que ya tiene una participación futura.
export function nearFutureAssignmentWarning(publisher: Publisher | null, days: number | null | undefined): string | null {
  if (!publisher || days == null || days > NEAR_FUTURE_WARNING_DAYS) return null;
  const title = publisher.gender === "Femenino" ? "La hermana" : "El hermano";
  return `${title} ${publisher.fullName} en ${daysLabel(days)} tendrá una asignación. ¿Desea continuar?`;
}
