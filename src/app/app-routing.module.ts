import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';


const routes: Routes = [
  {path:'animals/:name',component:AnimalDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
