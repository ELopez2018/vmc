import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { SharedModule } from "src/app/shared/shared.module";
import { Utils } from "src/app/shared/Utils";
import { getPublisherTextClasses as getPublisherWarningTextClasses } from "../publisher-warning.util";
import { ASSIGNMENT_TITLE, MeetingRoom, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";

@Component({
  selector: "vmc-program-assignment-section",
  templateUrl: "./program-assignment-section.component.html",
  styleUrls: ["./program-assignment-section.component.scss"],
  imports: [CommonModule, SharedModule, NgbTooltipModule],
})
export class ProgramAssignmentSectionComponent {
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

  public readonly assignmentTitle = ASSIGNMENT_TITLE;
  public readonly weeklyProgramChangeType = WeeklyProgramChangeType;
  public readonly treasuresSection = SectionMeeting.TESOROS_DE_LA_BIBLIA;
  public readonly teachersSection = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
  public readonly livingSection = SectionMeeting.NUESTRA_VIDA_CRISTIANA;
  public readonly publisherTooltipClass = "tooltip-publisher-warning";
  public readonly publisherTooltipPlacement = "top";

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

  public onAddAssignment(): void {
    this.addAssignment.emit({ program: this.week, sectionMeeting: this.sectionMeeting });
  }

  public onWeeklyProgramChange(item: WeeklyProgramPdF, type: string): void {
    this.weeklyProgramChange.emit({ item, type });
  }

  public getPublisherTextClasses(publisher?: Publisher | null): Record<string, boolean> {
    return getPublisherWarningTextClasses(publisher);
  }
}
