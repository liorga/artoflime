import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {},
    component: WelcomeComponent,
  },
];
@NgModule({
  declarations: [WelcomeComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class WelcomeModule {}
