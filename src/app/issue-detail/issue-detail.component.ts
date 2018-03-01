import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Issue } from '../issue';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  issue: Issue;
  dataLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getIssue();
  }

  getIssue(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataLoaded = false;
    this.apiService.getIssue(id)
      .subscribe(issue => {
        this.issue = issue;
        this.dataLoaded = true;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
