import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ArtoflimematerialModule } from '../artoflimematerial/artoflimematerial.module';
import { SliderComponent } from '../core/slider/slider.component';

@NgModule({
  declarations: [GalleryComponent, SliderComponent],
  imports: [CommonModule, GalleryRoutingModule, ArtoflimematerialModule],
})
export class GalleryModule {}
