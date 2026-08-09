import { Component, Input, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Assignment } from "src/app/core/interfaces/reuniones.interface";
import { AssignmentService } from "src/app/core/services/assignment/assignment.service";
import { StopwatchService } from "src/app/core/services/stopwatch/stopwatch.service";
import { StopwatchModalComponent } from "src/app/shared/components/stopwatch-modal/stopwatch-modal.component";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { DatePipe } from "@angular/common";
import { AssignmentSourceComponent } from "src/app/shared/components/assignment-source/assignment-source.component";

@Component({
  selector: "vmc-assignment",
  templateUrl: "./assignment.component.html",
  styleUrls: ["./assignment.component.scss"],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, DatePipe, AssignmentSourceComponent, StopwatchModalComponent],
})
export class AssignmentComponent implements OnDestroy {
  @Input() assignment: Assignment[] = [];

  /** ID de la asignación cuyo modal de cronómetro está abierto, null si cerrado */
  activeStopwatchId: number | null = null;

  /** Seguimiento de clics sobre el contador en línea por asignación */
  private clickTimers = new Map<number, ReturnType<typeof setTimeout>>();

  constructor(
    private assignmentService: AssignmentService,
    public stopwatchService: StopwatchService,
  ) {
    this.assignmentService.getAllAssignment().subscribe((data) => {
      this.assignment = <Assignment[]>data.content;
    });
  }

  ngOnDestroy(): void {
    this.clickTimers.forEach((t) => clearTimeout(t));
  }

  openStopwatch(item: Assignment): void {
    this.activeStopwatchId = item.id!;
  }

  closeStopwatch(): void {
    this.activeStopwatchId = null;
  }

  /** 1 clic = parar/reanudar · 2 clics = reiniciar */
  onInlineTimerClick(id: number): void {
    if (this.clickTimers.has(id)) {
      // Segundo clic → reiniciar desde 0 y reanudar
      clearTimeout(this.clickTimers.get(id));
      this.clickTimers.delete(id);
      this.stopwatchService.reset(id);
      this.stopwatchService.start(id);
      return;
    }
    // Primer clic → parar/reanudar (espera 300 ms por si hay segundo clic)
    const state = this.stopwatchService.getState(id);
    if (state.running) {
      this.stopwatchService.stop(id);
    } else {
      this.stopwatchService.start(id);
    }
    const timer = setTimeout(() => this.clickTimers.delete(id), 300);
    this.clickTimers.set(id, timer);
  }

  formatElapsed(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const base = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    return `${base}.${pad(cs)}`;
  }

  getAssignmentTitle(id: number | null): string {
    if (id === null) return "";
    return this.assignment.find((a) => a.id === id)?.title ?? "";
  }

  toDelete(item: any): void {}
  selectedEdit(item: any): void {}
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
