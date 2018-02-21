import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesListComponent  } from './issues-list/issues-list.component';
import { IssueDetailComponent } from 'app/issue-detail/issue-detail.component';

const routes: Routes = [
  { path: ':page', component: IssuesListComponent },
  { path: 'detail/:id', component: IssueDetailComponent },
  { path: '**', redirectTo: '/1' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
