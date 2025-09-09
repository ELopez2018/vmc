import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Congregation, Meeting, Program, Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { DataService } from 'src/app/core/services/data/data.service';
import { CongregationMock } from '../mocks/congregation.mock';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';
import { Utils } from '../../../shared/Utils';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MeetingsComponent } from './meetings/meetings.component';
import { ProgramsComponent } from './programs/programs.component';
@Component({
  selector: 'vmc-manager',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MeetingsComponent, ProgramsComponent],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  private programList: Program[] = [];
  public meetings: Meeting[] = [];
  public semanasSalaAuxiliar: Program[] = [];
  public porAsignar = "por asignar";
  public congregation: Congregation = CongregationMock
  public Superintendente!: Publisher
  public showSpinner = false;
  private meetingDay = 1;
  public selectedCity!: any;

  // Tabas

  items: any[] =[];

  activeItem: any | undefined;
  constructor(
    private dataService: DataService,
    private meetingsService: MeetingsService,

  ) {

  }
  ngOnInit(): void {
    this.dataService.getPublisher().subscribe(data => {
      this.Superintendente = data
    })

    this.dataService.getCongregation$().subscribe(data => {
      this.congregation = data
      this.meetingDay = data.day
    })
    this.getPrograms()

    // Tabs
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Transactions', icon: 'pi pi-chart-line' },
      { label: 'Products', icon: 'pi pi-list' },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
  }

  getPrograms() {
    this.showSpinner = true;
    this.meetingsService.getCurrentToLast().subscribe(data => {
      this.meetings = [...data];
      this.showSpinner = false;
    }, error => {
      console.error(error);
      this.showSpinner = false;
    })
  }
  selectedEdit(item: any) {
    console.log(item)
  }
  parceDate(date: any) {
    return Utils.showDayOfMeeting(date, this.congregation.day)
  }
}
