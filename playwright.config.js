const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    reporter: [
        ['list'],
        ['allure-playwright']
    ],
    use: {
        trace: 'on-first-retry',
        timeout: 60000,
        headless: false,
        viewport: { width: 1900, height: 1080 },
    },
});