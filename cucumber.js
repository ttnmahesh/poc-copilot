module.exports = {
    default: {
      require: [
        'tests/cucumber/step_definitions/**/*.js',
        'tests/cucumber/support/**/*.js'
      ],
      format: ['@cucumber/pretty-formatter'],
      timeout: 60000
    }
  };