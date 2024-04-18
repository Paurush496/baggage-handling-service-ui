import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'navigation', component: NavigationComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/navigation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
