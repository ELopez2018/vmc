import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'vmc-programs',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
  programList: any[] = [];
  congregation: any;
  ngOnInit(): void { }
  selectedEdit(item: any) {
    console.log(item);
  }
}
