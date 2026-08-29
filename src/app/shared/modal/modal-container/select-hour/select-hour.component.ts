import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'select-hour',
  templateUrl: './select-hour.component.html',
  styleUrls: ['./select-hour.component.scss'],
  standalone: true
})
export class SelectHourComponent implements OnInit {
  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  public value = "";

  @Input()
  set hour(hour: unknown) {
    this.value = this.toTimeInputValue(hour);
  }

  constructor() { }

  ngOnInit() {
  }

  onSelect(hour: string) {
    this.onSelected.emit(hour);
  }

  private toTimeInputValue(hour: unknown): string {
    if (Array.isArray(hour)) {
      return this.formatTime(hour[0], hour[1]);
    }

    if (typeof hour === "string") {
      const [hours, minutes] = hour.split(":");
      return this.formatTime(hours, minutes);
    }

    return "";
  }

  private formatTime(hours: unknown, minutes: unknown): string {
    const normalizedHours = Number(hours);
    const normalizedMinutes = Number(minutes);

    if (!Number.isInteger(normalizedHours) || !Number.isInteger(normalizedMinutes)) {
      return "";
    }

    return `${normalizedHours.toString().padStart(2, "0")}:${normalizedMinutes.toString().padStart(2, "0")}`;
  }
}
