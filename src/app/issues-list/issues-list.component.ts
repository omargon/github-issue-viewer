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
  dataLoaded = false;

  private currentPage: number;
  private moreIssuesAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentPage = +this.route.snapshot.paramMap.get('page');
      this.getIssues();
  });
  }

  getIssues(): void {
    this.issues = [];
    this.dataLoaded = false;
    this.apiService.getIssues(this.currentPage)
    .subscribe(issues => {
      this.issues = issues;
      this.dataLoaded = true;
    });
  }

  disableNewerButton(): boolean {
    return this.currentPage === 1;
  }

  disableOlderButton(): boolean {
    const issuesArrayLength = this.issues.length;
    return issuesArrayLength === 0 || issuesArrayLength < this.apiService.maxItemsPerPage;
  }

  getOlderIssues(): void {
    this.router.navigate(['/', this.currentPage + 1]);
  }

  getNewerIssues(): void {
    this.router.navigate(['/', this.currentPage - 1]);
  }

}
