const fs = require('fs');
const path = require('path');

class AutomationExercisePage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    await this.page.goto('https://automationexercise.com/login');
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
  }

  async getProductDetails() {
    const products = await this.page.$$('.features_items .col-sm-4');
    const productDetails = [];

    for (const product of products) {
      const title = await product.$eval('.productinfo h2', el => el.textContent).catch(() => 'Title not found');
      const price = await product.$eval('.productinfo h2 + p', el => el.textContent).catch(() => 'Price not found');
      const description = await product.$eval('.productinfo p', el => el.textContent).catch(() => 'Description not found');
      const imageUrl = await product.$eval('.productinfo img', el => el.src).catch(() => '');

      if (imageUrl) {
        // Save image to local folder
        const imageBuffer = await this.page.evaluate(async (url) => {
          const response = await fetch(url);
          const buffer = await response.arrayBuffer();
          return Array.from(new Uint8Array(buffer));
        }, imageUrl);
        const imageName = path.basename(imageUrl);
        fs.writeFileSync(path.join(__dirname, '../images', imageName), Buffer.from(imageBuffer));
      }

      productDetails.push({ title, price, description, imageUrl });
    }

    return productDetails;
  }

  async getCategories() {
    const categories = await this.page.$$eval('.left-sidebar .panel-group .panel-title a', els => els.map(el => el.textContent));
    return categories;
  }

  async getBrands() {
    const brands = await this.page.$$eval('.brands_products .brands-name li a', els => els.map(el => el.textContent.trim()));
    return brands;
  }
}

module.exports = AutomationExercisePage;