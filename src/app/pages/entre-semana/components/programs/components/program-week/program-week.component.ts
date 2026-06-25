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
  PUBLISHER_REPEATED_CURRENT_WEEK_TEXT,
  PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT,
} from "../publisher-warning.util";
import { MeetingRoom, ProgramChangeType, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";

type ProgramPublisherField =
  | AssignmentType.PRESIDENT
  | AssignmentType.ASSISTANT_ADVISER
  | AssignmentType.OPENING_PRAYER
  | AssignmentType.FINAL_PRAYER;
type WeeklyPublisherField =
  | WeeklyProgramChangeType.RESPONSIBLE
  | WeeklyProgramChangeType.ASSISTANT
  | WeeklyProgramChangeType.RESPONSIBLE_B
  | WeeklyProgramChangeType.ASSISTANT_B;
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
  public readonly publisherTooltipClass = "tooltip-publisher-warning";
  public readonly publisherTooltipPlacement = "top";

  private readonly repeatedPreviousWeekText = PUBLISHER_REPEATED_PREVIOUS_WEEK_TEXT;
  private readonly repeatedCurrentWeekText = PUBLISHER_REPEATED_CURRENT_WEEK_TEXT;
  private readonly programPublisherFields: ProgramPublisherField[] = [
    AssignmentType.PRESIDENT,
    AssignmentType.ASSISTANT_ADVISER,
    AssignmentType.OPENING_PRAYER,
    AssignmentType.FINAL_PRAYER,
  ];
  private readonly weeklyPublisherFields: WeeklyPublisherField[] = [
    WeeklyProgramChangeType.RESPONSIBLE,
    WeeklyProgramChangeType.ASSISTANT,
    WeeklyProgramChangeType.RESPONSIBLE_B,
    WeeklyProgramChangeType.ASSISTANT_B,
  ];
  private publisherSignature = "";
  private viewInitialized = false;
  private tooltipShowTimeout?: ReturnType<typeof setTimeout>;

  public ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.openPresidentTooltip();
  }

  public ngOnChanges(): void {
    this.syncPublisherTooltips();

    if (this.viewInitialized) {
      this.openPresidentTooltip();
    }
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

  public getPublisherTooltipText(publisher?: Publisher | null, fallbackText = ""): string {
    return publisher?.publisherTooltipText ?? fallbackText;
  }

  public getPublisherTooltipClass(publisher?: Publisher | null, fallbackClass = ""): string {
    return publisher?.publisherTooltipText ? this.publisherTooltipClass : fallbackClass;
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

  private syncPublisherTooltips(): void {
    if (!this.semana) {
      return;
    }

    const signature = this.buildPublisherSignature();

    if (signature === this.publisherSignature) {
      return;
    }

    this.publisherSignature = signature;
    this.setPublisherTooltipText();
  }

  private setPublisherTooltipText(): void {
    const currentSlots = this.getPublisherSlots(this.semana);
    const previousPublisherIds = new Set(this.getPublisherSlots(this.getAdjacentWeek(-1)).map((slot) => slot.publisher?.id).filter((id): id is number => !!id));
    const currentPublisherCounts = this.getPublisherCounts(currentSlots);

    currentSlots.forEach((slot) => {
      const publisherId = slot.publisher?.id;
      let tooltipText: string | undefined;

      if (publisherId && (currentPublisherCounts.get(publisherId) ?? 0) > 1) {
        tooltipText = this.repeatedCurrentWeekText;
      } else if (publisherId && previousPublisherIds.has(publisherId)) {
        tooltipText = this.repeatedPreviousWeekText;
      }

      this.updatePublisherTooltipText(slot, tooltipText);
    });
  }

  private buildPublisherSignature(): string {
    const currentWeek = this.semana;
    const previousWeek = this.getAdjacentWeek(-1);
    const nextWeek = this.getAdjacentWeek(1);

    return [previousWeek, currentWeek, nextWeek]
      .filter((week): week is ProgramPdf => !!week)
      .map((week) => {
        const publisherIds = this.getPublisherSlots(week)
          .map((slot) => `${slot.field}:${slot.publisher?.id ?? "none"}`)
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

    return [...weeks].sort((a, b) => (a.meeting?.week ?? 0) - (b.meeting?.week ?? 0));
  }

  private getPublisherSlots(week?: ProgramPdf): PublisherSlot[] {
    if (!week) {
      return [];
    }

    const programSlots = this.programPublisherFields.map((field) => ({
      field,
      publisher: week[field],
      week,
    }));

    const weeklyProgramSlots = (week.weeklyPrograms ?? []).flatMap((weeklyProgram) =>
      this.weeklyPublisherFields.map((field) => ({
        field,
        publisher: weeklyProgram[field],
        week,
        weeklyProgram,
      })),
    );

    return [...programSlots, ...weeklyProgramSlots];
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
