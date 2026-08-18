import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

@Component({
  selector: "vmc-not-found",
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
})
export class NotFoundComponent {}
