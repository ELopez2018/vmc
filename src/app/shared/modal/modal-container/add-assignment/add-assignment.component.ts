import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Assignment, Program, WeeklyProgram } from "src/app/core/interfaces/reuniones.interface";
import { PrimeIcons } from "primeng/api";
import { Utils } from "../../../Utils";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AssignmentService } from "src/app/core/services/assignment/assignment.service";
import { Asignacion } from "../../../../core/interfaces/reuniones.interface";
import { WeeklyProgramService } from "src/app/core/services/weeklyProgram/WeeklyProgram.service";

@Component({
  selector: "vmc-add-assignment",
  templateUrl: "./add-assignment.component.html",
  styleUrls: ["./add-assignment.component.scss"],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddAssignmentComponent implements OnInit {
  @Input() public week!: Program;
  @Input() public sectionMeeting!: string;
  @Output() onClosed: EventEmitter<any> = new EventEmitter();
  public primeIcons = PrimeIcons;
  public formG!: FormGroup;
  public assignmentList: Assignment[] = [];
  constructor(
    private fb: FormBuilder,
    private assignmentService: AssignmentService,
    private weeklyProgramService: WeeklyProgramService,
  ) {
    this.formG = this.fb.group({
      number: new FormControl(null),
      start: new FormControl(null),
      title: new FormControl(null),
      time: new FormControl(null),
      tips: new FormControl(null),
      showTips: new FormControl(null),
    });
  }
  ngOnInit(): void {
    this.assignmentService.getDistinctByTitle().forEach((data) => {
      this.assignmentList = data;
      console.log(this.assignmentList);
    });
  }
  adapterTime(dateTime: any) {
    return Utils.adapterTime(dateTime);
  }
  close() {
    this.onClosed.emit("close");
  }
  add() {
    const values = this.formG.getRawValue();
    const assignment: Assignment = {
      time: values.time,
      timeType: "mins",
      title: values.title,
      tips: values.tips,
      sectionMeeting: this.sectionMeeting,
      showTips: values.showTips,
      number: values.number,
      meeting: this.week.meeting,
    };
    console.log("Enviada assignment", assignment);
    this.assignmentService.save(assignment).subscribe((data) => {
      console.log("Recibida assignment", data);
      this.addAssigment(data);
    });
  }

  addAssigment(assignment: Assignment) {
    const values = this.formG.getRawValue();
    this.week.weeklyPrograms;
    const weeklyProgram: WeeklyProgram = {
      assignment: assignment,
      congregation: this.week.weeklyPrograms[0].congregation,
      program: this.week.weeklyPrograms[0].program,
      startTime: values.start,
      room: this.week.weeklyPrograms[0].room,
      responsible: null,
      assistant: null,
    };

    this.week.weeklyPrograms.push(weeklyProgram);
    console.log(this.week.weeklyPrograms);
    this.weeklyProgramService.save(this.week.weeklyPrograms).subscribe((data) => {
      console.log("Revcibida week.weeklyProgram", data);
      this.week.weeklyPrograms = data;
    });
  }
}
