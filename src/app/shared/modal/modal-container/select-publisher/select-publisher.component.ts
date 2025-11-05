import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, type OnInit } from '@angular/core';
import { IconCloseComponent } from "../search-publisher/icon-close/icon-close.component";
import { SharedModule } from 'primeng/api';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { Subscription } from 'rxjs';
import { DataService } from '../../../../core/services/data/data.service';

@Component({
    selector: 'vmc-select-publisher',
    imports: [IconCloseComponent, MaterialModule, CommonModule],
    templateUrl: './select-publisher.component.html',
    styleUrls: ['./select-publisher.component.scss']
})
export class SelectPublisherComponent implements OnInit, OnDestroy {

  @Output() onClosed = new EventEmitter()
  @Output() onClicked = new EventEmitter()
  public showSpinner = true;
  public female: Publisher[] = [];
  public male: Publisher[] = [];
  private subs = new Subscription()
  public publishersAll!: Publisher[];
  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {
    this.subscritions()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  subscritions() {
    this.subs.add(
      this.dataService.getPubliherList$().subscribe(data => {
        this.female = [];
        this.male = [];
        if (data) {
          this.publishersAll = data
          this.female = this.publishersAll.filter(data => data.gender === "Femenino")
          this.male = this.publishersAll.filter(data => data.gender === "Masculino")
          this.showSpinner = !data || data.length == 0
        }
      })
    )
  }

  close() {
    this.onClosed.emit(true)
  }

  selected(publisher: Publisher) {
    this.onClicked.emit(publisher)
    this.close()
  }
}
