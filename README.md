PART 2
======

## GENERAL
In this part we will get familiar with all the stages that will eventually be part of the automated frontend Jenkins 
build pipeline (part 3). These stages are:

* install packages
* running unit testing with code coverage
* linting
* running e2e tests
* building a production package
* building a docker images
* deployment to kubernetes

## FRONTEND
The frontend has been build with `Angular 4+` and has been started with the `angular-cli`. For unit testing `Karma` is 
used. For the e2e testing we use `Protractor` with `CucumberJs` and `chai` with `chai-as-promised`.

For more information see the below links:
* https://angular.io/
* https://cli.angular.io/
* https://karma-runner.github.io/1.0/index.html
* http://www.protractortest.org/
* http://chaijs.com/
* http://chaijs.com/plugins/chai-as-promised/

### 1) Install node, npm and the angular-cli
To build and test the frontend application we first need to have Node.js and ng-cli installed. Go to the 
[Node.js](https://nodejs.org/en/) website and install the LTS version. You can also use homebrew, nvm or any other 
package managers if you like. If already installed make sure to have at least node version 6.x.x. Now go to the 
[ng-cli website](https://cli.angular.io/) and install the angular command line interface.

After installation check if all went ok by running `node -v`, `npm -v` and `ng -v`. It should show the installed node, 
npm and ng-cli versions.

### 2) Install packages
The first stage in the Jenkins build pipeline is to install all packages. For now do this locally by running 
`npm install`.

### 3) Run unit tests with coverage
Karma is used for the frontend unit tests. For this meetup 
we have only one simple test [unit test](./frontend/src/app/app.component.spec.ts) and do not focus on writing extra 
unit tests (but feel free to add some).

* First make sure to have the latest google chrome browser installed
* Try to run the unit tests with the `ng test` command. Also try to run it with the npm script defined in the 
package.json. We will use these scripts eventually in the pipeline. 
* Now run it with the flag  `--watch=false`. What happened and why is this important for the automated build pipeline?

Note: test results can be viewed in the [reports](./frontend/reports) folder. Test reporting is configured in the 
[karma configuration](./frontend/karma.con. Notice the part below:

```
reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul', 'junit', 'html']
      : ['progress', 'kjhtml', 'junit', 'html'],
    junitReporter: {
      outputDir: 'reports/unit',
      outputFile: 'testresults.xml',
      useBrowserName: false,
      suite: 'unit',
      xmlVersion: null
    },
    htmlReporter: {
      outputFile: 'reports/unit/testresults.html',
      pageTitle: 'Unit Tests',
      subPageTitle: 'Portaal',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: false
    }
```

### 4) Run unit tests headless
Since we will run our tests in a Jenkins pipeline we will need to deal with the fact that there is no screen available 
for the browser. In the past we needed to solve this issue with screen virtualization or by using browsers like 
phantomJs. Luckily google made life a lot easier by providing a headless mode in there google chrome stable version.

To be able to run the unit tests headless in chrome we have configured Karma accordingly. See the 
[karma configuration](./frontend/karma.conf.js). Notice the below part.

```
browsers: ['Chrome', 'ChromeHeadless'],
    singleRun: false,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    }
```

