import { Publisher } from "src/app/core/interfaces/reuniones.interface";

export const PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT = "La semana anterior participó en";
export const PUBLISHER_REPEATED_CURRENT_WEEK_TEXT = "Esta semana ya tiene la siguiente asignación";
export const PUBLISHER_PREVIOUS_WEEK_WARNING_CLASS = "publisher-warning-previous-week";
export const PUBLISHER_WARNING_TOOLTIP_CLASS = "tooltip-publisher-warning";
export const PUBLISHER_PREVIOUS_WEEK_TOOLTIP_CLASS = "tooltip-publisher-warning-previous-week";

export function hasPublisherWarning(publisher?: Publisher | null): boolean {
  return !!publisher?.publisherTooltipText;
}

export function hasRepeatedPreviousWeekWarning(publisher?: Publisher | null): boolean {
  return !!publisher?.publisherTooltipText?.startsWith(PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT);
}

export function getPublisherTextClasses(publisher?: Publisher | null): Record<string, boolean> {
  const hasPreviousWeekWarning = hasRepeatedPreviousWeekWarning(publisher);

  return {
    "text-danger": !publisher || (hasPublisherWarning(publisher) && !hasPreviousWeekWarning),
    [PUBLISHER_PREVIOUS_WEEK_WARNING_CLASS]: hasPreviousWeekWarning,
  };
}

export function getPublisherTooltipClass(publisher?: Publisher | null, fallbackClass = ""): string {
  if (!publisher?.publisherTooltipText) {
    return fallbackClass;
  }

  return hasRepeatedPreviousWeekWarning(publisher) ? PUBLISHER_PREVIOUS_WEEK_TOOLTIP_CLASS : PUBLISHER_WARNING_TOOLTIP_CLASS;
}
