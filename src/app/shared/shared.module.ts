import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PrinterComponent } from './printer/printer.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from './modal/modal-container/modal-container.component';
import { SearchPublisherComponent } from './modal/modal-container/search-publisher/search-publisher.component';

const MODULES = [
  MaterialModule,
  PdfViewerModule,
  PdfJsViewerModule,
  NgbModalModule
];
const COMPONENTS = [
  PrinterComponent,
  ModalContainerComponent,
  SearchPublisherComponent
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
