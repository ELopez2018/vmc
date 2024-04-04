import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PrinterComponent } from './printer/printer.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal/modal-container/modal-container.component';

const MODULES = [
  MaterialModule,
  PdfViewerModule,
  PdfJsViewerModule,
  NgbModalModule
];
const COMPONENTS = [
  PrinterComponent,
  ModalContainerComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...MODULES
    ,
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES,
    MaterialModule
  ]
})
export class SharedModule { }
