import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { ArtoflimematerialModule } from '../artoflimematerial/artoflimematerial.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, ArtoflimematerialModule],
})
export class MainModule {}
