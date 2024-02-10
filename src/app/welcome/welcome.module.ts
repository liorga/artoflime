import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { ArtoflimematerialModule } from '../artoflimematerial/artoflimematerial.module';

const routes: Routes = [
  {
    path: '',
    data: {},
    component: WelcomeComponent,
  },
];
@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ArtoflimematerialModule,
  ],
})
export class WelcomeModule {}
