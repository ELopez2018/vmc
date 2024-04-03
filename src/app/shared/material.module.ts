import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const Modules = [
  MatIconModule,
  MatButtonModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...Modules
  ],
  exports: [
    ...Modules
  ]
})
export class MaterialModule { }
