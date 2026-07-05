import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "vmc-program-filters",
  templateUrl: "./program-filters.component.html",
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class ProgramFiltersComponent {
  @Output() public filter = new EventEmitter<{ fechaDesde: any; fechaHasta: any }>();

  public fechaDesde: any;
  public fechaHasta: any;

  public consultar(): void {
    this.filter.emit({ fechaDesde: this.fechaDesde, fechaHasta: this.fechaHasta });
  }
  onChange() {
    if (!this.fechaHasta || this.fechaHasta < this.fechaDesde) {
      this.fechaHasta = this.fechaDesde;
    }
  }
}
