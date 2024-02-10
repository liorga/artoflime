import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { ArtoflimematerialModule } from '../artoflimematerial/artoflimematerial.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, ArtoflimematerialModule],
})
export class AboutModule {}
