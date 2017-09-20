const config = require('./protractor.shared.conf').config;

config.multiCapabilities = [
    {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars']
        },
        shardTestFiles: true,
        maxInstances: 2
    }
];

exports.config = config;
