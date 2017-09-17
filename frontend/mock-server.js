const express = require('express');
const path = require('path');
const ngApiMock = require('ng-apimock')();
const app = express();
const configuration = {'src': './mocks', 'outputDir': '.tmp/ngApimock'};

/**
 * Register all available mocks and generate interface
 */
ngApiMock.run(configuration);
ngApiMock.watch(configuration.src);

app.set('port', (process.env.PORT || 3000));

// process the api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);

// serve the mocking interface for local development
app.use('/mocking', express.static('.tmp/ngApimock'));

app.listen(app.get('port'), function () {
    console.log('app running on port', app.get('port'));
});
