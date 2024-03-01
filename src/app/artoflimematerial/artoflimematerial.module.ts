import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_MODULES, SHARED_MODULES } from './index';

@NgModule({
  declarations: [],
  imports: [CommonModule, MAT_MODULES, SHARED_MODULES],
  exports: [MAT_MODULES, SHARED_MODULES],
})
export class ArtoflimematerialModule {}
