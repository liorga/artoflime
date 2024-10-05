import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { ArtoflimematerialModule } from '../artoflimematerial/artoflimematerial.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [MainComponent, LayoutComponent, HeaderComponent],
  imports: [CommonModule, MainRoutingModule, ArtoflimematerialModule],
})
export class MainModule {}
