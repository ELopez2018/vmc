import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Week } from 'src/app/core/interfaces/reuniones.interface';

@Component({
  selector: 'vmc-config-general-entre-semana',
  templateUrl: './config-general-entre-semana.component.html',
  styleUrls: ['./config-general-entre-semana.component.scss']
})
export class ConfigGeneralEntreSemanaComponent implements OnInit {
  @Input() public week!: Week;
  public form!: FormGroup;
  @Input() public publishers: any[]=[];
  constructor(private formBuilder: FormBuilder) {
    if (this.week) {
      this.form = this.formBuilder.group({
        week: new FormControl(this.week.week),
        weekNumber: new FormControl(this.week.weekNumber),
        openingSong: new FormControl(this.week.openingSong),
        openingPrayer: new FormControl(this.week.openingPrayer),
        president: new FormControl(this.week.president),
        introTime: new FormControl(this.week.introTime),
        timeType: new FormControl(this.week.timeType),
        intermediateSong: new FormControl(this.week.intermediateSong),
        finalSong: new FormControl(this.week.finalSong),
        finalPrayer: new FormControl(this.week.finalPrayer),
      })
    }
  }
  ngOnInit(): void {

    if (this.week) {
      console.log(this.week);
      this.form = this.formBuilder.group({
        week: new FormControl(this.week.week),
        weekNumber: new FormControl(this.week.weekNumber),
        openingSong: new FormControl(this.week.openingSong),
        openingPrayer: new FormControl(this.week.openingPrayer),
        president: new FormControl(this.week.president),
        introTime: new FormControl(this.week.introTime),
        timeType: new FormControl(this.week.timeType),
        intermediateSong: new FormControl(this.week.intermediateSong),
        finalSong: new FormControl(this.week.finalSong),
        finalPrayer: new FormControl(this.week.finalPrayer),
      })
    }
    console.log(this.form);
  }

}
