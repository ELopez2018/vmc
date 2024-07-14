import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Meeting, Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { MeetingsService } from '../../../../core/services/meetings/meetings.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { Utils } from 'src/app/shared/Utils';
import { OtherAssignment, SectionMeeting } from 'src/app/core/enums/meetings.enums';

@Component({
  selector: 'vmc-config-general-entre-semana',
  templateUrl: './config-general-entre-semana.component.html',
  styleUrls: ['./config-general-entre-semana.component.scss']
})
export class ConfigGeneralEntreSemanaComponent implements OnInit {
  @Input() public week!: Meeting;
  public form!: FormGroup;
  @Input() public publishers: any[] = [];
  @Output() onUpdated: EventEmitter<boolean> = new EventEmitter()
  constructor(
    private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private modalService: ModalService
  ) {
    if (this.week) {
      // this.form = this.formBuilder.group({
      //   week: new FormControl(this.week.week),
      //   weekNumber: new FormControl(this.week.weekNumber),
      //   openingSong: new FormControl(this.week.openingSong),
      //   startTimeOpeningSong: new FormControl(this.week.startTimeOpeningSong),
      //   openingPrayer: new FormControl(this.week.openingPrayer),
      //   startTimeIntro: new FormControl(this.week.startTimeIntro),
      //   president: new FormControl(this.week.president),
      //   introTime: new FormControl(this.week.introTime),
      //   timeType: new FormControl(this.week.timeType),
      //   intermediateSong: new FormControl(this.week.intermediateSong),
      //   startTimeIntermediateSong: new FormControl(this.week.startTimeIntermediateSong),
      //   finalSong: new FormControl(this.week.finalSong),
      //   startTimeFinalSong: new FormControl(this.week.startTimeFinalSong),
      //   startTimeConclusionWords: new FormControl(this.week.startTimeConclusionWords),
      //   finalPrayer: new FormControl(this.week.finalPrayer),
      //   id: new FormControl(this.week.id),
      //   assistantAdviser: new FormControl(this.week.assistantAdviser),
      // })
    }
  }
  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   week: new FormControl(this.week.week),
    //   weekNumber: new FormControl(this.week.weekNumber),
    //   openingSong: new FormControl(this.week.openingSong),
    //   startTimeOpeningSong: new FormControl(this.week.startTimeOpeningSong),
    //   openingPrayer: new FormControl(this.week.openingPrayer),
    //   startTimeIntro: new FormControl(this.week.startTimeIntro),
    //   president: new FormControl(this.week.president),
    //   introTime: new FormControl(this.week.introTime),
    //   timeType: new FormControl(this.week.timeType),
    //   intermediateSong: new FormControl(this.week.intermediateSong),
    //   startTimeIntermediateSong: new FormControl(this.week.startTimeIntermediateSong),
    //   finalSong: new FormControl(this.week.finalSong),
    //   startTimeFinalSong: new FormControl(this.week.startTimeFinalSong),
    //   startTimeConclusionWords: new FormControl(this.week.startTimeConclusionWords),
    //   finalPrayer: new FormControl(this.week.finalPrayer),
    //   id: new FormControl(this.week.id),
    //   assistantAdviser: new FormControl(this.week.assistantAdviser),
    // })
      console.log(this.form);
}

save() {
  const meeting = this.form.value
  this.meetingsService.updateMeeting(meeting).subscribe(data => {
    console.log(data);
    this.onUpdated.emit(true)
  })
}
assigOpeningPrayer() {
  // console.log("modal");
  // const assignments = this.week.assignments[0]
  // assignments.numberWeek = this.week.weekNumber
  // assignments.assignmentType=OtherAssignment.OPENING_PRAYER
  // this.modalService.assignPublisher(assignments)
  //   .then((data: Publisher) => {
  //     this.form.get('openingPrayer')?.setValue(data)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
}
assigPresident() {
  // console.log("modal");
  // const assignments = this.week.assignments[0]
  // assignments.numberWeek = this.week.weekNumber
  // assignments.assignmentType=OtherAssignment.PRESIDENT
  // this.modalService.assignPublisher(assignments)
  //   .then((data: Publisher) => {
  //     this.form.get('president')?.setValue(data)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
}
assigAssistantAdviser() {
  // console.log("modal");
  // const assignments = this.week.assignments[0]
  // assignments.assignmentType=OtherAssignment.PRESIDENT
  // this.modalService.assignPublisher()
  //   .then((data: Publisher) => {
  //     this.form.get('assistantAdviser')?.setValue(data)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
}
assigFinalPrayer() {
  // const assignments = null
  // assignments.numberWeek = this.week.weekNumber
  // assignments.assignmentType=OtherAssignment.FINAL_PRAYER
  // this.modalService.assignPublisher(assignments)
  //   .then((data: Publisher) => {
  //     this.form.get('finalPrayer')?.setValue(data)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
}

  get president() {
  return this.form.get('president')?.value?.fullName || '';
}
  get openingPrayer() {
  return this.form.get('openingPrayer')?.value?.fullName || '';
}
  get assistantAdviser() {
  return this.form.get('assistantAdviser')?.value?.fullName || '';
}
  get finalPrayer() {
  return this.form.get('finalPrayer')?.value?.fullName || '';
}
showDayOfMeeting(fechaSemana: string){
  return Utils.showDayOfMeeting(fechaSemana)
}
}
