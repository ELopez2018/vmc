import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { SharedModule } from "src/app/shared/shared.module";
import { Utils } from "src/app/shared/Utils";
import { ProgramAssignmentSectionComponent } from "../program-assignment-section/program-assignment-section.component";
import {
  getPublisherAlertStyle,
  getPublisherAlertText,
} from "../publisher-warning.util";
import { MeetingRoom, ProgramChangeType, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { isAssemblyEvent, isSpecialEventWeek } from "src/app/core/utils/program-event.util";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";
import { isCongregationBibleStudyAssignment, isSpeechAssignment } from "../../program-assignment.util";

@Component({
  selector: "vmc-program-week",
  templateUrl: "./program-week.component.html",
  styleUrls: ["./program-week.component.scss"],
  imports: [CommonModule, SharedModule, NgbTooltipModule, ProgramAssignmentSectionComponent],
})
export class ProgramWeekComponent {
  @Input() public semana!: ProgramPdf;
  @Input() public roomA = false;
  @Input() public room = MeetingRoom.MAIN;
  @Input() public isAdmin = false;
  @Input() public porAsignar = "por asignar";
  @Input() public meetingDay = 1;

  @Output() public print = new EventEmitter<{ program: ProgramPdf; orientation: "normal" | "landscape" }>();
  @Output() public printAssignments = new EventEmitter<ProgramPdf>();
  @Output() public openFilters = new EventEmitter<void>();
  @Output() public programChange = new EventEmitter<{ program: ProgramPdf; type: string }>();
  @Output() public weeklyProgramChange = new EventEmitter<{ item: WeeklyProgramPdF; type: string }>();
  @Output() public addAssignment = new EventEmitter<{ program: ProgramPdf; sectionMeeting: string }>();

  public readonly assignmentType = AssignmentType;
  public readonly programChangeType = ProgramChangeType;
  public readonly treasuresSection = SectionMeeting.TESOROS_DE_LA_BIBLIA;
  public readonly teachersSection = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
  public readonly livingSection = SectionMeeting.NUESTRA_VIDA_CRISTIANA;
  public readonly publisherTooltipPlacement = "top";

  private collapsedSectionKeys = new Set<string>();

  public showDayOfMeeting(fechaSemana: any): string {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay, false, this.semana?.event);
  }

  public get isAssemblyWeek(): boolean {
    return isAssemblyEvent(this.semana?.event);
  }

  public get isSpecialEventWeek(): boolean {
    return isSpecialEventWeek(this.semana?.event);
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

  public getPublisherAlertText(publisher?: Publisher | null): string {
    return getPublisherAlertText(publisher);
  }

  public getPublisherAlertStyle(publisher?: Publisher | null): Record<string, string> {
    return getPublisherAlertStyle(publisher);
  }
}
