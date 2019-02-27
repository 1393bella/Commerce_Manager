import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
// import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
 { path: 'home', component: HomeComponent }, // it's home component
 { path: 'new', component: NewComponent },
// { path: 'edit',component: EditComponent },
        { path: 'edit/:id',component: EditComponent },
  // use a colon and parameter name to include a parameter in the url
        { path: 'view/:id', component: ViewComponent },
  // redirect to /alpha if there is nothing in the url
        { path: '', pathMatch: 'full', redirectTo: '/home' },
        // { path: 'reset', pathMatch: 'full', redirectTo: '/new' },
  // the ** will catch anything that did not match any of the above routes
// { path: '**', component: PageNotFoundComponent }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

