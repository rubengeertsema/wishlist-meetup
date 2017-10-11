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

For more information consult the links below:
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
* Now run the `ng` command with the flag  `--watch=false`. What happened and why is this important for the automated 
build pipeline?

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
phantomJs. Luckily google made life a lot easier by providing a headless mode in their google chrome stable version.

To be able to run the unit tests headless in chrome we have configured Karma accordingly. See the 
[karma configuration](./frontend/karma.conf.js). Notice the part below:

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

Now run the unit tests only once in headless mode by providing the `watch` flag and the flag 
`--browsers <browser-name-as-configured-in-the-Karma-conf>`.

### 5) Run unit tests with code coverage
Measuring code coverage and acting accordingly is an important part of Continuous Delivery. Because of the continuous
deployment to production we need to have confidence in our code. During this meetup we use a tool called Istanbul to
measure the code coverage. The Istanbul settings are also configured in the 
[karma configuration](./frontend/karma.conf.js). Notice the part below:
```
coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'json'],
      dir: path.join(__dirname, 'reports/coverage'),
      fixWebpackSourcePaths: true,
      thresholds: { // These thresholds need to be much higher but is out of scope for this meetup/tutorial
        global: { // thresholds for all files
          statements: 60,
          lines: 60,
          branches: 40,
          functions: 20
        },
        each: { // thresholds per file
          statements: 30,
          lines: 30,
          branches: 0,
          functions: 10
        }
      }
    }
``` 
Note: since we have only one unit test during this meetup we have set the thresholds extremely low. In real life that
should not be allowed.

Now run the unit tests headless, only once and with code coverage by using the flag `--code-coverage`. You can find
the code coverage report in the [reports](./frontend/reports) folder.

### 6) Add unit test script to package.json for the build pipeline
Now add a npm script to the package.json that can be used in the Jenkins build pipeline. Make sure it will run:
* only once
* headless
* with code coverage

Call the script: `test-headless`. Test if it works by running the script (`npm run <script-name>`).

### 7) Linting
Linting can be described as checking your code on errors or bad design. To increase our confidence in our code quality 
we also should at this step to the build pipeline. For now execute linting locally with the npm lint script present in 
the `package.json`

### 8) e2e testing
For the e2e tests we use protractor with cucumber to support BDD. We mocked the backend by using 
[ng-apimock](https://github.com/mdasberg/grunt-ng-apimock), a great tool for mocking. Run the e2e tests with the 
command `ng e2e --proxy-config proxy.config.json`.

Also here we need to run the tests headless (same reason as for the unit tests). To make this possible we have 
configured chrome headless in the [protractor configuration](./frontend/e2e/config).

Now run the protractor tests headless by adding the flag `--config e2e/config/protractor.e2e.headless.conf.js`. You can 
find the e2e test report in the [reports](./frontend/reports) folder.

### 9) Add e2e test script to package.json for the build pipeline
Now add a npm script to the package.json that can be used in the Jenkins build pipeline (same as you did for the unit 
tests). Call the script: `e2e-headless`.Test if it works by running the script.

### 10) Build prod package
Part of the pipeline will be building a production package of the frontend application. Do so by running the npm scipt
`npm run prod`. If all went well you should see a folder named [dist](./frontend/dist).

### 11) Build docker image
Before we can deploy to Kubernetes, we need to build a docker image. Do so by running the command 
`eval $(minikube docker-env); docker build -t frontend:latest .`. Check if it is present on the minikube virtual
machine by running the command `docker images`.

### 12) Add npm script for building the docker image
Add a npm script to the package.json for building the docker image. Call it `docker-build`.

### 13) Deploy the frontend to kubernetes
Now deploy the frontend to kubernetes by using the kubernetes 
[frontend deployment descriptor](./frontend/kubernetes/frontend.yml). Make sure to deploy it to the `prod` namespace.
Check if the frontend is up and running in the Kubernetes dashboard and open the frontend in a browser.

Note: use the `kubectl apply` command to deploy.
Note: remember that traefik exposes the frontend to the outside world. so you only have to find the external ip
for traefik. Navigate to that ip in a browser to see the frontend.

### 14) Add npm script for deployment to kubernetes
Add a npm script for deployment to kubernetes. Call it `kube-apply`. Test it out. You could also add a npm script to 
delete the deployment from kubernetes.

## END part 2
Now we have all the steps ready to build our automated pipeline. Check out the branch for part 3.