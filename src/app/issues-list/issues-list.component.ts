import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Issue } from '../issue';
import { ApiService } from '../api.service';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {

  issues: Issue[];

  private currentPage: number;

  private moreIssuesAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentPage = +this.route.snapshot.paramMap.get('page');
      this.getIssues();
  });
  }

  getIssues(): void {
    this.issues = null;
    this.apiService.getIssues(this.currentPage)
    .map(issues => this.issues = issues)
    .subscribe(issues => {
      if (issues.length == this.apiService.maxItemsPerPage) {
        this.apiService.getIssues(this.currentPage + 1)
          .subscribe(nextSetOfIssues => {
            
            if (nextSetOfIssues.length && nextSetOfIssues.length > 0 ) {
              this.moreIssuesAvailable = true;
            }

            console.log(this.moreIssuesAvailable);
          });
      }
    });
  }

  disableNewerButton(): boolean {
    return this.currentPage == 1;
  }
  
  disableOlderButton(): boolean {
    return !this.moreIssuesAvailable;
  }

  getOlderIssues(): void {
    this.router.navigate(['/', this.currentPage + 1]);
  }

  getNewerIssues(): void {
    this.router.navigate(['/', this.currentPage - 1]);
  }


}
