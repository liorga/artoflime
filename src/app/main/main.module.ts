import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { CustomGalleryComponent } from '../core/custom-gallery/custom-gallery.component';

@NgModule({
  declarations: [LayoutComponent, CustomGalleryComponent],
  imports: [CommonModule, MainRoutingModule, ReactiveFormsModule],
})
export class MainModule {}
