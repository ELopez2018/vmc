import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: "vmc-program-filters",
  templateUrl: "./program-filters.component.html",
  styleUrls: ["./program-filters.component.scss"],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, CalendarModule],
})
export class ProgramFiltersComponent {
  @Output() public filter = new EventEmitter<{ fechaDesde: any; fechaHasta: any }>();

  public fechaDesde: any;
  public fechaHasta: any;

  public consultar(): void {
    this.filter.emit({ fechaDesde: this.fechaDesde, fechaHasta: this.fechaHasta });
  }

  public onChange(): void {
    if (!this.fechaHasta || this.fechaHasta < this.fechaDesde) {
      this.fechaHasta = new Date(this.fechaDesde.getFullYear(), this.fechaDesde.getMonth() + 1, 0);
    }
  }
}
