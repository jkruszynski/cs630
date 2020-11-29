import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AppComponent} from './app.component';

const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];


const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

