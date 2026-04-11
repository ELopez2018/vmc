import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PrinterComponent } from './printer/printer.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal/modal-container/modal-container.component';
import { SearchPublisherComponent } from './modal/modal-container/search-publisher/search-publisher.component';
import { SelectHourComponent } from './modal/modal-container/select-hour/select-hour.component';
import { TitleAndTimeComponent } from './modal/modal-container/title-and-time/title-and-time.component';
import { ChangeSongComponent } from './modal/modal-container/change-song/change-song.component';
import { FormsModule } from '@angular/forms';
import { ErrorModalComponent } from './modal/modal-container/error-modal/error-modal.component';
import { InfoModalComponent } from './modal/modal-container/info-modal/info-modal.component';
import { LoaderComponent } from './modal/modal-container/loader/loader.component';
import { AddAssignmentComponent } from './modal/modal-container/add-assignment/add-assignment.component';
import { IconCloseComponent } from "./modal/modal-container/search-publisher/icon-close/icon-close.component";
import { SelectPublisherComponent } from "./modal/modal-container/select-publisher/select-publisher.component";
import { AssignmentSheetPrinterComponent } from "./assignment-sheet-printer/assignment-sheet-printer.component";
import { CalendarModule } from 'primeng/calendar';

const MODULES = [
  MaterialModule,
  PdfViewerModule,
  PdfJsViewerModule,
  NgbModalModule,
  FormsModule,
  SelectHourComponent,
  TitleAndTimeComponent,
  ChangeSongComponent,
  ErrorModalComponent,
  AddAssignmentComponent,
  CalendarModule
];
const COMPONENTS = [
  PrinterComponent,
  ModalContainerComponent,
  SearchPublisherComponent,
  InfoModalComponent,
  LoaderComponent,


]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...MODULES,
    IconCloseComponent,
    SelectPublisherComponent,
    AssignmentSheetPrinterComponent
],
  exports: [
    ...COMPONENTS,
    ...MODULES,
    MaterialModule
  ]
})
export class SharedModule { }
