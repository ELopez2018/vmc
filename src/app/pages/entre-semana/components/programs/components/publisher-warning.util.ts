import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { PersonValidation } from "src/app/core/interfaces/program-validations.interface";

/** Las alertas son calculadas exclusivamente por el backend. */
export function getPublisherAlertText(validation?: PersonValidation): string {
  return (validation?.items ?? []).map((item) => item.message).filter(Boolean).join("\n");
}

export function getPublisherAlertColor(validation?: PersonValidation): string {
  if (!validation) return "#000000";
  return validation.severity === "ERROR" ? "#FF0000" : "#0000FF";
}

export function getPublisherAlertStyle(publisher?: Publisher | null, validation?: PersonValidation): Record<string, string> {
  if (!publisher) {
    return { color: "#dc3545", "font-style": "italic" };
  }

  return { color: getPublisherAlertColor(validation) };
}
