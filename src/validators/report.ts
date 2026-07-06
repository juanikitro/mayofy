export type ValidationIssue = {
  code: string;
  message: string;
};

export function printReport(title: string, issues: ValidationIssue[]): void {
  if (issues.length === 0) {
    console.log(`${title}: OK`);
    return;
  }

  console.error(`${title}: ${issues.length} issue(s)`);
  for (const issue of issues) {
    console.error(`- ${issue.code}: ${issue.message}`);
  }
}

export function exitForIssues(issues: ValidationIssue[]): void {
  if (issues.length > 0) {
    process.exit(1);
  }
}
