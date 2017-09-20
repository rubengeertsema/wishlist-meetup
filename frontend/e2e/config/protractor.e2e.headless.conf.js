const config = require('./protractor.shared.conf').config;

config.multiCapabilities = [
    {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                'disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=800x600'
            ]
        },
        shardTestFiles: true,
        maxInstances: 2
    }
];

exports.config = config;
