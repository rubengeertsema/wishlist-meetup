const path = require('path');
const child_process = require('child_process');
const server = child_process.spawn('node', ['mock-server.js']);
const fs = require('fs-extra');
const jsonReportDir = process.cwd() + '/reports/e2e/json';
const htmlReportDir = process.cwd() + '/reports/e2e/html';

//noinspection JSCheckFunctionSignatures
server.stdout.pipe(process.stdout);

exports.config = {
    allScriptsTimeout: 10000,
    directConnect: true,
    baseUrl: 'http://localhost:4220',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        require: [
            path.resolve(process.cwd(), './e2e/**/after.hooks.ts'),
            path.resolve(process.cwd(), './e2e/**/cucumber.conf.ts'),
            path.resolve(process.cwd(), './e2e/**/*.steps.ts')
        ],
        format: 'json:reports/e2e/json/results.json',
        tags: ''
    },
    specs: [
        path.resolve(process.cwd(), './e2e/**/*.feature')
    ],
    beforeLaunch: function () {
        fs.ensureDirSync(jsonReportDir);
        fs.ensureDirSync(htmlReportDir);
        fs.emptyDirSync(jsonReportDir);
    },
    onPrepare: function () {
        global.ngApimock = require('../../.tmp/ngApimock/protractor.mock.js');
    },
    onComplete: function () {
        // nothing to do here
    },
    onCleanUp: function () {
        // nothing to do here
    },
    afterLaunch: function () {
        // nothing to do here
    },
    ngApimockOpts: {
        angularVersion: 4
    },
    ignoreUncaughtExceptions: true
};

process.on('exit', function () {
    server.kill()
});
