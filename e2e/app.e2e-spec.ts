import { GithubIssueViewerPage } from './app.po';

describe('github-issue-viewer App', () => {
  let page: GithubIssueViewerPage;

  beforeEach(() => {
    page = new GithubIssueViewerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
