import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from "@angular/core";
import { NgbTooltip, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { SharedModule } from "src/app/shared/shared.module";
import { Utils } from "src/app/shared/Utils";
import { ProgramAssignmentSectionComponent } from "../program-assignment-section/program-assignment-section.component";
import {
  getPublisherTextClasses as getPublisherWarningTextClasses,
  getPublisherTooltipClass as getPublisherWarningTooltipClass,
  PUBLISHER_REPEATED_CURRENT_WEEK_TEXT,
  PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT,
} from "../publisher-warning.util";
import { ASSIGNMENT_TITLE, MeetingRoom, ProgramChangeType, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";

type ProgramPublisherField = AssignmentType.PRESIDENT | AssignmentType.ASSISTANT_ADVISER | AssignmentType.OPENING_PRAYER | AssignmentType.FINAL_PRAYER;
type WeeklyPublisherField = WeeklyProgramChangeType.RESPONSIBLE | WeeklyProgramChangeType.ASSISTANT | WeeklyProgramChangeType.RESPONSIBLE_B | WeeklyProgramChangeType.ASSISTANT_B;
type PublisherField = ProgramPublisherField | WeeklyPublisherField;

interface PublisherSlot {
  field: PublisherField;
  publisher?: Publisher | null;
  week: ProgramPdf;
  weeklyProgram?: WeeklyProgramPdF;
}

@Component({
  selector: "vmc-program-week",
  templateUrl: "./program-week.component.html",
  styleUrls: ["./program-week.component.scss"],
  imports: [CommonModule, SharedModule, NgbTooltipModule, ProgramAssignmentSectionComponent],
})
export class ProgramWeekComponent implements AfterViewInit, OnChanges, DoCheck, OnDestroy {
  @Input() public semana!: ProgramPdf;
  @Input() public weeks: ProgramPdf[] = [];
  @Input() public roomA = false;
  @Input() public showPresidentTooltip = false;
  @Input() public room = MeetingRoom.MAIN;
  @Input() public isAdmin = false;
  @Input() public porAsignar = "por asignar";
  @Input() public meetingDay = 1;

  @Output() public print = new EventEmitter<ProgramPdf>();
  @Output() public printAssignments = new EventEmitter<ProgramPdf>();
  @Output() public openFilters = new EventEmitter<void>();
  @Output() public programChange = new EventEmitter<{ program: ProgramPdf; type: string }>();
  @Output() public weeklyProgramChange = new EventEmitter<{ item: WeeklyProgramPdF; type: string }>();
  @Output() public addAssignment = new EventEmitter<{ program: ProgramPdf; sectionMeeting: string }>();

  @ViewChild("tooltipPresiden") private tooltipPresiden?: NgbTooltip;

  public readonly assignmentType = AssignmentType;
  public readonly programChangeType = ProgramChangeType;
  public readonly treasuresSection = SectionMeeting.TESOROS_DE_LA_BIBLIA;
  public readonly teachersSection = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
  public readonly livingSection = SectionMeeting.NUESTRA_VIDA_CRISTIANA;
  public readonly tooltipPresidenText = "";
  public readonly publisherTooltipPlacement = "top";

  private readonly repeatedPreviousWeekText = PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT;
  private readonly repeatedCurrentWeekText = PUBLISHER_REPEATED_CURRENT_WEEK_TEXT;
  private readonly programPublisherFields: ProgramPublisherField[] = [
    AssignmentType.PRESIDENT,
    AssignmentType.ASSISTANT_ADVISER,
    AssignmentType.OPENING_PRAYER,
    AssignmentType.FINAL_PRAYER,
  ];
  private publisherSignature = "";
  private viewInitialized = false;
  private tooltipShowTimeout?: ReturnType<typeof setTimeout>;
  private collapsedSectionKeys = new Set<string>();

  public ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.refreshPublisherTooltips(true);
  }

  public ngOnChanges(): void {
    this.refreshPublisherTooltips(true);
  }

  public ngDoCheck(): void {
    this.syncPublisherTooltips();
  }

  public ngOnDestroy(): void {
    clearTimeout(this.tooltipShowTimeout);
  }

  public showDayOfMeeting(fechaSemana: any): string {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay);
  }

  public adapterTime(dateTime: any): string {
    return Utils.adapterTime(dateTime);
  }

  public onProgramChange(type: string): void {
    this.programChange.emit({ program: this.semana, type });
  }

  public onWeeklyProgramChange(event: { item: WeeklyProgramPdF; type: string }): void {
    this.weeklyProgramChange.emit(event);
  }

  public onAddAssignment(event: { program: ProgramPdf; sectionMeeting: string }): void {
    this.addAssignment.emit(event);
  }

  public toggleSection(sectionMeeting: string): void {
    if (this.collapsedSectionKeys.has(sectionMeeting)) {
      this.collapsedSectionKeys.delete(sectionMeeting);
      return;
    }

    this.collapsedSectionKeys.add(sectionMeeting);
  }

  public isSectionCollapsed(sectionMeeting: string): boolean {
    return this.collapsedSectionKeys.has(sectionMeeting);
  }

  public getPublisherTooltipText(publisher?: Publisher | null, fallbackText = ""): string {
    return publisher?.publisherTooltipText ?? fallbackText;
  }

  public getPublisherTooltipClass(publisher?: Publisher | null, fallbackClass = ""): string {
    return getPublisherWarningTooltipClass(publisher, fallbackClass);
  }

  public getPublisherTextClasses(publisher?: Publisher | null): Record<string, boolean> {
    return getPublisherWarningTextClasses(publisher);
  }

  private openPresidentTooltip(): void {
    clearTimeout(this.tooltipShowTimeout);

    if (!this.roomA || !this.showPresidentTooltip) {
      return;
    }

    this.tooltipShowTimeout = setTimeout(() => this.tooltipPresiden?.open(), 0);
  }

  private refreshPublisherTooltips(force = false): void {
    this.syncPublisherTooltips(force);

    if (this.viewInitialized) {
      this.openPresidentTooltip();
    }
  }

  private syncPublisherTooltips(force = false): void {
    if (!this.semana) {
      return;
    }

    const signature = this.buildPublisherSignature();

    if (!force && signature === this.publisherSignature) {
      return;
    }

    this.publisherSignature = signature;
    this.setPublisherTooltipText();
  }

  private setPublisherTooltipText(): void {
    const currentSlots = this.getPublisherSlots(this.semana);
    const previousPublisherTitles = this.getPreviousWeekPublisherTitles();
    const currentPublisherCounts = this.getPublisherCounts(currentSlots);

    currentSlots.forEach((slot) => {
      const publisherId = slot.publisher?.id;
      let tooltipText: string | undefined;

      if (publisherId && (currentPublisherCounts.get(publisherId) ?? 0) > 1) {
        tooltipText = this.buildRepeatedCurrentWeekText(this.getOtherCurrentWeekTitles(slot, currentSlots));
      } else if (publisherId && previousPublisherTitles.has(publisherId)) {
        tooltipText = this.buildRepeatedPreviousWeekText(previousPublisherTitles.get(publisherId) ?? []);
      }

      this.updatePublisherTooltipText(slot, tooltipText);
    });
  }

  private buildPublisherSignature(): string {
    const currentWeek = this.semana;
    const previousWeek = this.getAdjacentWeek(-1);

    return [previousWeek, currentWeek]
      .filter((week): week is ProgramPdf => !!week)
      .map((week) => {
        const publisherIds = this.getPublisherSlots(week)
          .map((slot) => `${slot.field}:${slot.publisher?.id ?? "none"}:${this.getPublisherSlotTitle(slot)}`)
          .join(",");

        return `${week.id}:${publisherIds}`;
      })
      .join("|");
  }

  private getAdjacentWeek(direction: -1 | 1): ProgramPdf | undefined {
    const weeks = this.getOrderedWeeks();
    const currentIndex = weeks.findIndex((week) => week.id === this.semana.id);

    if (currentIndex < 0) {
      return undefined;
    }

    return weeks[currentIndex + direction];
  }

  private getOrderedWeeks(): ProgramPdf[] {
    const weeks = this.weeks?.length ? this.weeks : [this.semana];

    return [...weeks].sort((a, b) => {
      const diff = this.getWeekTimestamp(a) - this.getWeekTimestamp(b);
      return diff !== 0 ? diff : (a.id ?? 0) - (b.id ?? 0);
    });
  }

  private getWeekTimestamp(week: ProgramPdf): number {
    const raw = week.meeting?.week as unknown;
    const time = raw ? new Date(raw as string | number | Date).getTime() : NaN;
    return Number.isNaN(time) ? 0 : time;
  }

  private getPublisherSlots(week?: ProgramPdf): PublisherSlot[] {
    if (!week) {
      return [];
    }

    const programSlots = this.roomA
      ? this.programPublisherFields.map((field) => ({
          field,
          publisher: week[field],
          week,
        }))
      : [];

    const weeklyProgramSlots = (week.weeklyPrograms ?? []).flatMap((weeklyProgram) =>
      this.getRenderedWeeklyFields(weeklyProgram).map((field) => ({
        field,
        publisher: weeklyProgram[field],
        week,
        weeklyProgram,
      })),
    );

    return [...programSlots, ...weeklyProgramSlots];
  }

  private getRenderedWeeklyFields(weeklyProgram: WeeklyProgramPdF): WeeklyPublisherField[] {
    const section = weeklyProgram.assignment?.sectionMeeting;
    const title = weeklyProgram.assignment?.title ?? "";
    const number = weeklyProgram.assignment?.number;

    if (section === SectionMeeting.TESOROS_DE_LA_BIBLIA) {
      return number === 3 ? [WeeklyProgramChangeType.RESPONSIBLE, WeeklyProgramChangeType.RESPONSIBLE_B] : [WeeklyProgramChangeType.RESPONSIBLE];
    }

    if (section === SectionMeeting.SEAMOS_MEJORES_MAESTROS) {
      if (title === ASSIGNMENT_TITLE.SPEECH) {
        return [WeeklyProgramChangeType.RESPONSIBLE, WeeklyProgramChangeType.RESPONSIBLE_B];
      }
      return [WeeklyProgramChangeType.RESPONSIBLE, WeeklyProgramChangeType.ASSISTANT, WeeklyProgramChangeType.RESPONSIBLE_B, WeeklyProgramChangeType.ASSISTANT_B];
    }

    if (section === SectionMeeting.NUESTRA_VIDA_CRISTIANA) {
      return title === ASSIGNMENT_TITLE.CONGREGATION_BIBLE_STUDY ? [WeeklyProgramChangeType.RESPONSIBLE, WeeklyProgramChangeType.ASSISTANT] : [WeeklyProgramChangeType.RESPONSIBLE];
    }

    return [];
  }

  private getPublisherCounts(slots: PublisherSlot[]): Map<number, number> {
    return slots.reduce((counts, slot) => {
      const publisherId = slot.publisher?.id;

      if (!publisherId) {
        return counts;
      }

      counts.set(publisherId, (counts.get(publisherId) ?? 0) + 1);
      return counts;
    }, new Map<number, number>());
  }

  private getPreviousWeekPublisherTitles(): Map<number, string[]> {
    return this.getPublisherSlots(this.getAdjacentWeek(-1)).reduce((publisherTitles, slot) => {
      const publisherId = slot.publisher?.id;

      if (!publisherId) {
        return publisherTitles;
      }

      const title = this.getPublisherSlotTitle(slot);
      const titles = publisherTitles.get(publisherId) ?? [];

      if (title && !titles.includes(title)) {
        titles.push(title);
      }

      publisherTitles.set(publisherId, titles);
      return publisherTitles;
    }, new Map<number, string[]>());
  }

  private buildRepeatedPreviousWeekText(previousTitles: string[]): string {
    const titleText = previousTitles.length ? previousTitles.join(", ") : "otra asignación";

    return `${this.repeatedPreviousWeekText}: ${titleText}`;
  }

  private getOtherCurrentWeekTitles(currentSlot: PublisherSlot, currentSlots: PublisherSlot[]): string[] {
    const publisherId = currentSlot.publisher?.id;

    if (!publisherId) {
      return [];
    }

    return currentSlots.reduce((titles, slot) => {
      if (slot === currentSlot || slot.publisher?.id !== publisherId) {
        return titles;
      }

      const title = this.getPublisherSlotTitle(slot);

      if (title && !titles.includes(title)) {
        titles.push(title);
      }

      return titles;
    }, [] as string[]);
  }

  private buildRepeatedCurrentWeekText(currentTitles: string[]): string {
    const titleText = currentTitles.length ? currentTitles.join(", ") : "otra asignación";

    return `${this.repeatedCurrentWeekText}: ${titleText}`;
  }

  private getPublisherSlotTitle(slot: PublisherSlot): string {
    if (slot.weeklyProgram?.assignment?.title) {
      return slot.weeklyProgram.assignment.title;
    }

    switch (slot.field) {
      case AssignmentType.PRESIDENT:
        return "Presidencia";
      case AssignmentType.ASSISTANT_ADVISER:
        return "Consejero auxiliar";
      case AssignmentType.OPENING_PRAYER:
        return "Oración inicial";
      case AssignmentType.FINAL_PRAYER:
        return "Oración final";
      default:
        return "";
    }
  }

  private updatePublisherTooltipText(slot: PublisherSlot, tooltipText?: string): void {
    if (!slot.publisher || slot.publisher.publisherTooltipText === tooltipText) {
      return;
    }

    const publisher = { ...slot.publisher, publisherTooltipText: tooltipText };

    if (slot.weeklyProgram) {
      slot.weeklyProgram[slot.field as WeeklyPublisherField] = publisher;
      return;
    }

    slot.week[slot.field as ProgramPublisherField] = publisher;
  }
}
