import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../welcome/welcome.module').then((m) => m.WelcomeModule),
        data: {},
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../about/about.module').then((m) => m.AboutModule),
        data: {},
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('../contact/contact.module').then((m) => m.ContactModule),
        data: {},
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('../gallery/gallery.module').then((m) => m.GalleryModule),
        data: {},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
