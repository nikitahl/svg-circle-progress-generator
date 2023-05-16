# Contributing

Thanks for contributing to SVG circle progress generator! We're quite open to new feature requests, or any work you want to do.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Creating Issues

When creating issues please follow the according template structure:
- [Bug report](./.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature request](./.github/ISSUE_TEMPLATE/feature_request.md)
- [Custom](./.github/ISSUE_TEMPLATE/custom.md)

## Contributor Workflow

The codebase is maintained using the "contributor workflow" where everyone without exception contributes patch proposals using "pull requests". This facilitates social contribution, easy testing and peer review.

To contribute a patch, the workflow is as follows:

- Fork repository
- Create topic branch
- Commit patches

If you send a pull request, please do it against the `main` branch.

## Set up a local dev environment

To set up a local dev environment following steps are required:

1. Fork this repository
2. Clone:
```
git clone git@github.com:[YOUR_USERNAME]/svg-circle-progress-generator.git
```
3. `yarn install` or `npm install`
4. Watch:
```
yarn start
```
or
```
npm start
```
5. Open http://localhost:1234/ in your browser. Find out more at [parceljs.org](https://parceljs.org/).