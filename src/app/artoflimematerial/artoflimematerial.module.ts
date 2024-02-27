import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_MODULES } from './index';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, MAT_MODULES, ReactiveFormsModule],
  exports: [MAT_MODULES, ReactiveFormsModule],
})
export class ArtoflimematerialModule {}
