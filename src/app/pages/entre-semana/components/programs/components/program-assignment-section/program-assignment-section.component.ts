import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { SharedModule } from "src/app/shared/shared.module";
import { Utils } from "src/app/shared/Utils";

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
  @Input() public room = "A";
  @Input() public isAdmin = false;
  @Input() public porAsignar = "por asignar";
  @Input() public renderFieldset = true;

  @Output() public addAssignment = new EventEmitter<{ program: ProgramPdf; sectionMeeting: string }>();
  @Output() public weeklyProgramChange = new EventEmitter<{ item: WeeklyProgramPdF; type: string }>();

  public readonly treasuresSection = "TESOROS DE LA BIBLIA";
  public readonly teachersSection = "SEAMOS MEJORES MAESTROS";
  public readonly livingSection = "NUESTRA VIDA CRISTIANA";
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

  public hasPublisherWarning(publisher?: Publisher | null): boolean {
    return !!publisher?.publisherTooltipText;
  }
}
