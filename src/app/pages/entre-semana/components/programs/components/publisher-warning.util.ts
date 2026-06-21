import { Publisher } from "src/app/core/interfaces/reuniones.interface";

export const PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT = "Repetido en la semana anterior";
export const PUBLISHER_REPEATED_CURRENT_WEEK_TEXT = "Repetido esta semana";
export const PUBLISHER_PREVIOUS_WEEK_WARNING_CLASS = "publisher-warning-previous-week";

export function hasPublisherWarning(publisher?: Publisher | null): boolean {
  return !!publisher?.publisherTooltipText;
}

export function hasRepeatedPreviousWeekWarning(publisher?: Publisher | null): boolean {
  return publisher?.publisherTooltipText === PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT;
}

export function getPublisherTextClasses(publisher?: Publisher | null): Record<string, boolean> {
  const hasPreviousWeekWarning = hasRepeatedPreviousWeekWarning(publisher);

  return {
    "text-danger": !publisher || (hasPublisherWarning(publisher) && !hasPreviousWeekWarning),
    [PUBLISHER_PREVIOUS_WEEK_WARNING_CLASS]: hasPreviousWeekWarning,
  };
}
