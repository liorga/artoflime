import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { ArtoflimematerialModule } from '../artoflimematerial/artoflimematerial.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { CustomGalleryComponent } from '../core/custom-gallery/custom-gallery.component';

@NgModule({
  declarations: [
    MainComponent,
    LayoutComponent,
    HeaderComponent,
    CustomGalleryComponent,
  ],
  imports: [CommonModule, MainRoutingModule, ArtoflimematerialModule],
})
export class MainModule {}
