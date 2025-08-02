**Playwright  + Cucumber (BDD)**
Cucumber is a popular behavior-driven development (BDD) tool that allows developers and stakeholders to collaborate on defining and testing application requirements in a human-readable format. TypeScript is a powerful superset of JavaScript that adds optional static typing, making it easier to catch errors before runtime. By combining these two tools, we can create more reliable and maintainable tests.

 **Features**
 report with screenshots
 Execute tests on multiple environments
 Parallel execution
 Retry failed tests on CI
 Github Actions integrated with downloadable report

** Sample report **

 <img width="956" height="339" alt="image" src="https://github.com/user-attachments/assets/96666310-44c8-43fd-beb8-86a2a80bfc66" />


**Project structure**

.github -> yml file to execute the tests in GitHub Actions
src -> Contains all the features & Typescript code
test-results -> Contains all the reports related file
Reports
Logs
Screenshots of failure

**Get Started**
Setup:

Clone or download the project

Extract and open in the VS-Code

npm i to install the dependencies

npx playwright install to install the browsers

**npm run test to execute the test**

**Folder structure**
1. src\test\features -> write your features here
2. src\test\steps -> Your step definitions goes here
3. src\hooks\hooks.ts -> Browser setup and teardown logic
4. src\hooks\pageFixture.ts -> Simple way to share the page objects to steps
5. src\env -> Multiple environments are handled
5. src\browsers -> To mangage a different Browser
6. testresults -> To generate the report
7. cucumber.js -> One file to do all the magic
8. package.json -> Contains all the dependencies
