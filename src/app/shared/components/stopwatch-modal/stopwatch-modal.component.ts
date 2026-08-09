import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { StopwatchService, TimerState } from "src/app/core/services/stopwatch/stopwatch.service";

@Component({
  selector: "vmc-stopwatch-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./stopwatch-modal.component.html",
  styleUrls: ["./stopwatch-modal.component.scss"],
})
export class StopwatchModalComponent implements OnInit, OnDestroy {
  @Input() assignmentId!: number;
  @Input() assignmentTitle?: string;
  @Output() closed = new EventEmitter<void>();

  elapsed = 0;
  running = false;

  private sub?: Subscription;

  constructor(private stopwatchService: StopwatchService) {}

  ngOnInit(): void {
    const current = this.stopwatchService.getState(this.assignmentId);
    this.elapsed = current.elapsed;
    this.running = current.running;

    // Start automatically when opening if timer was not running yet and has no time
    if (!this.running && this.elapsed === 0) {
      this.stopwatchService.start(this.assignmentId);
    }

    this.sub = this.stopwatchService.getState$(this.assignmentId).subscribe((state: TimerState) => {
      this.elapsed = state.elapsed;
      this.running = state.running;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get formattedTime(): string {
    return StopwatchModalComponent.format(this.elapsed);
  }

  static format(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 10); // centiseconds (2 digits)
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const base = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    return `${base}.${pad(cs)}`;
  }

  toggleStop(): void {
    if (this.running) {
      this.stopwatchService.stop(this.assignmentId);
    } else {
      this.stopwatchService.start(this.assignmentId);
    }
  }

  close(): void {
    this.closed.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    this.close();
  }
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
