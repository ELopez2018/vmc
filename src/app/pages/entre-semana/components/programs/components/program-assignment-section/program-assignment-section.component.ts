import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { SharedModule } from "src/app/shared/shared.module";
import { Utils } from "src/app/shared/Utils";
import { getPublisherTextClasses as getPublisherWarningTextClasses, getPublisherTooltipClass as getPublisherWarningTooltipClass } from "../publisher-warning.util";
import { MeetingRoom, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { needsOverseerTalkTitle, isSpecialEventWeek } from "src/app/core/utils/program-event.util";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";
import { AssignmentSourceComponent } from "src/app/shared/components/assignment-source/assignment-source.component";
import { StopwatchService } from "src/app/core/services/stopwatch/stopwatch.service";
import { StopwatchModalComponent } from "src/app/shared/components/stopwatch-modal/stopwatch-modal.component";
import { isCongregationBibleStudyAssignment, isSpeechAssignment } from "../../program-assignment.util";
import { isExplainingBeliefsSpeechAssignment } from "src/app/core/utils/assignment-eligibility.util";

@Component({
  selector: "vmc-program-assignment-section",
  templateUrl: "./program-assignment-section.component.html",
  styleUrls: ["./program-assignment-section.component.scss"],
  imports: [CommonModule, SharedModule, NgbTooltipModule, AssignmentSourceComponent, StopwatchModalComponent],
})
export class ProgramAssignmentSectionComponent implements OnDestroy {
  @Input() public week!: ProgramPdf;
  @Input() public sectionMeeting = "";
  @Input() public title = "";
  @Input() public legendClass = "";
  @Input() public room = MeetingRoom.MAIN;
  @Input() public isAdmin = false;
  @Input() public porAsignar = "por asignar";
  @Input() public renderFieldset = true;

  @Output() public addAssignment = new EventEmitter<{ program: ProgramPdf; sectionMeeting: string }>();
  @Output() public weeklyProgramChange = new EventEmitter<{ item: WeeklyProgramPdF; type: string }>();

  public readonly weeklyProgramChangeType = WeeklyProgramChangeType;
  public readonly treasuresSection = SectionMeeting.TESOROS_DE_LA_BIBLIA;
  public readonly teachersSection = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
  public readonly livingSection = SectionMeeting.NUESTRA_VIDA_CRISTIANA;
  public readonly publisherTooltipPlacement = "top";

  public sectionCollapsed = false;
  private collapsedAssignmentKeys = new Set<string>();

  public activeStopwatchId: number | null = null;
  public activeStopwatchTitle = "";
  private clickTimers = new Map<number, ReturnType<typeof setTimeout>>();

  constructor(public stopwatchService: StopwatchService) {}

  public ngOnDestroy(): void {
    this.clickTimers.forEach((t) => clearTimeout(t));
  }

  public getItemId(item: WeeklyProgramPdF): number {
    return item.id ?? item.assignment?.id ?? 0;
  }

  public openStopwatch(item: WeeklyProgramPdF): void {
    this.activeStopwatchId = this.getItemId(item);
    this.activeStopwatchTitle = item.assignment?.title ?? "";
  }

  public closeStopwatch(): void {
    this.activeStopwatchId = null;
  }

  /** 1 clic = parar/reanudar · 2 clics = reiniciar */
  public onInlineTimerClick(id: number): void {
    if (this.clickTimers.has(id)) {
      // Segundo clic → reiniciar desde 0 y reanudar
      clearTimeout(this.clickTimers.get(id));
      this.clickTimers.delete(id);
      this.stopwatchService.reset(id);
      this.stopwatchService.start(id);
      return;
    }
    const state = this.stopwatchService.getState(id);
    if (state.running) {
      this.stopwatchService.stop(id);
    } else {
      this.stopwatchService.start(id);
    }
    const timer = setTimeout(() => this.clickTimers.delete(id), 300);
    this.clickTimers.set(id, timer);
  }

  public formatElapsed(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    const base = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    return `${base}.${pad(cs)}`;
  }

  public get sectionItems(): WeeklyProgramPdF[] {
    const items = this.week?.weeklyPrograms ?? [];

    return items.filter((item) => {
      if (item.assignment.sectionMeeting !== this.sectionMeeting) {
        return false;
      }

      return this.sectionMeeting === this.livingSection || item.room === this.room;
    });
  }

  public adapterTime(dateTime: any): string {
    return Utils.adapterTime(dateTime);
  }

  /** En semanas con evento distinto de asamblea el estudio bíblico debe llevar el título del discurso del superintendente. */
  public needsOverseerTalkTitle(item: WeeklyProgramPdF): boolean {
    return needsOverseerTalkTitle(this.week?.event, item?.assignment?.title);
  }

  public get isSpecialEventWeek(): boolean {
    return isSpecialEventWeek(this.week?.event);
  }

  public onAddAssignment(): void {
    this.addAssignment.emit({ program: this.week, sectionMeeting: this.sectionMeeting });
  }

  public onWeeklyProgramChange(item: WeeklyProgramPdF, type: string): void {
    this.weeklyProgramChange.emit({ item, type });
  }

  public toggleSection(): void {
    this.sectionCollapsed = !this.sectionCollapsed;
  }

  public toggleAssignment(item: WeeklyProgramPdF): void {
    const key = this.getAssignmentCollapseKey(item);

    if (this.collapsedAssignmentKeys.has(key)) {
      this.collapsedAssignmentKeys.delete(key);
      return;
    }

    this.collapsedAssignmentKeys.add(key);
  }

  public isAssignmentCollapsed(item: WeeklyProgramPdF): boolean {
    return this.collapsedAssignmentKeys.has(this.getAssignmentCollapseKey(item));
  }

  public getPublisherTextClasses(publisher?: Publisher | null): Record<string, boolean> {
    return getPublisherWarningTextClasses(publisher);
  }

  public getPublisherTooltipClass(publisher?: Publisher | null): string {
    return getPublisherWarningTooltipClass(publisher);
  }

  public isSpeech(item: WeeklyProgramPdF): boolean {
    return isSpeechAssignment(item.assignment);
  }

  public isCongregationBibleStudy(item: WeeklyProgramPdF): boolean {
    return isCongregationBibleStudyAssignment(item.assignment);
  }

  public isExplainingBeliefsSpeech(item: WeeklyProgramPdF): boolean {
    return isExplainingBeliefsSpeechAssignment(item.assignment);
  }

  private getAssignmentCollapseKey(item: WeeklyProgramPdF): string {
    return `${this.sectionMeeting}:${item.id ?? item.assignment?.id ?? item.assignment?.number ?? "unknown"}`;
  }
}
