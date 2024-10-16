exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
      './tests/mobile/features/**/*.feature'
    ],
    capabilities: [{
      platformName: 'Android',
      deviceName: 'emulator-5554',
      app: './tests/mobile/app/amazon-shopping-28-16-0-100.apk',
      automationName: 'UiAutomator2'
    }],
    services: ['appium'],
    framework: 'cucumber',
    cucumberOpts: {
      require: ['./tests/mobile/step_definitions/**/*.js'],
      format: ['pretty'],
      timeout: 60000
    }
  };