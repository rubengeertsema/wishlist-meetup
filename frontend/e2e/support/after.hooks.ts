const Cucumber = require('cucumber');

import {browser} from 'protractor';
import {defineSupportCode} from 'cucumber';

import * as cucumberHtmlReporter from 'cucumber-html-reporter';

defineSupportCode(function ({registerListener, After}) {

    const jsonReportDir = process.cwd() + '/reports/e2e/json';
    const htmlReport = process.cwd() + '/reports/e2e/html/cucumber_report.html';

    After(function (scenarioResult) {
        if (scenarioResult.failureException) {
            return browser.takeScreenshot().then((screenShot) => {
                this.attach(screenShot, 'image/png'); // screenShot is base-64 encoded
            });
        }
    });

    const cucumberHtmlReportOptions = {
        theme: 'bootstrap',
        jsonDir: jsonReportDir,
        output: htmlReport,
        reportSuiteAsScenarios: true
    };

    const logFn = () => {
        try {
            cucumberHtmlReporter.generate(cucumberHtmlReportOptions);
        } catch (err) {
            console.log(`Failed to save cucumber test results. Error: ${err}`);
        }
    };

    const jsonFormatter = new Cucumber.JsonFormatter({
        log: logFn
    });

    registerListener(jsonFormatter);
});
