import { Publisher } from "src/app/core/interfaces/reuniones.interface";

/** Las alertas son calculadas exclusivamente por el backend. */
export function getPublisherAlertText(publisher?: Publisher | null): string {
  return (publisher?.alerts?.info ?? []).filter(Boolean).join("\n");
}

export function getPublisherAlertColor(publisher?: Publisher | null): string {
  return publisher?.alerts?.severity || "#000000";
}

export function getPublisherAlertStyle(publisher?: Publisher | null): Record<string, string> {
  if (!publisher) {
    return { color: "#dc3545", "font-style": "italic" };
  }

  return { color: getPublisherAlertColor(publisher) };
}
