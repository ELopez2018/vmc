import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalendarFilterModule } from './calendar-filter/calendar-filter.module';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
    selector: 'vmc-calendar-filter',
    templateUrl: './calendar-filter.component.html',
    styleUrls: ['./calendar-filter.component.scss'],
    imports: [CalendarFilterModule]
})
export class CalendarFilterComponent implements OnInit {
  @Output() onChange= new EventEmitter<number>()
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ){
    this._locale = 'co';
    this._adapter.setLocale(this._locale);
  }
  ngOnInit(): void {

  }

  getWeekNumber(event: any): number {
    const date = new Date(event.value)
    // Copia la fecha para no modificar el objeto original
    const targetDate = new Date(date.valueOf());

    // Ajusta el día para que el primer día de la semana sea lunes (1)
    const dayNum = (targetDate.getDay() + 6) % 7;

    // Establece la fecha en el jueves de la misma semana
    targetDate.setDate(targetDate.getDate() - dayNum + 3);

    // Obtiene el primer jueves del año (será la primera semana del año)
    const firstThursday = new Date(targetDate.getFullYear(), 0, 4);
    const firstThursdayDayNum = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstThursdayDayNum + 3);

    // Calcula la diferencia en milisegundos y convierte a número de semanas
    const weekNumber = 1 + Math.round(((targetDate.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7);
    this.onChange.emit(weekNumber)
    localStorage.setItem("week", `${weekNumber}`)
    return weekNumber;
  }
  reset(){
    this.onChange.emit(0)
    localStorage.removeItem("week");
  }

}
