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
      const title = await product.$eval('.productinfo p', el => el.textContent).catch(() => 'Title not found');
      const price = await product.$eval('.productinfo h2', el => el.textContent).catch(() => 'Price not found');
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

  async findProduct(productName) {
    const products = await this.page.$$('.features_items .col-sm-4');
    for (const product of products) {
      const title = await product.$eval('.productinfo p', el => el.textContent);
      console.log(`Found product: ${title}`);
      if (title.includes(productName)) {
        return product;
      }
    }
    return null;
  }

  async addProductToCart(product) {
    await product.hover(); // Hover over the product to reveal the "Add to cart" button
    await this.page.waitForTimeout(500); // Wait for the button to appear
    const addToCartButton = await product.$('a[title="Add to cart"]');
    if (addToCartButton) {
      console.log('Add to cart button found');
      await addToCartButton.click();
      await this.page.click('button[data-dismiss="modal"]'); // Close the modal
    } else {
      console.log('Add to cart button not found');
      throw new Error('Add to cart button not found');
    }
  }

  async goToCart() {
    await this.page.click('a[href="/view_cart"]');
  }

  async proceedToCheckout() {
    await this.page.click('a[href="/checkout"]');
  }

  async verifyAddresses() {
    const deliveryAddress = await this.page.textContent('#address_delivery');
    const billingAddress = await this.page.textContent('#address_invoice');
    return { deliveryAddress, billingAddress };
  }

  async enterPaymentDetails(name, cardNumber, cvc, expiryMonth, expiryYear) {
    await this.page.fill('input[name="name_on_card"]', name);
    await this.page.fill('input[name="card_number"]', cardNumber);
    await this.page.fill('input[name="cvc"]', cvc);
    await this.page.fill('input[name="expiry_month"]', expiryMonth);
    await this.page.fill('input[name="expiry_year"]', expiryYear);
  }

  async placeOrder() {
    await this.page.click('button[data-qa="pay-button"]');
  }

  async verifyOrderConfirmation() {
    const confirmationMessage = await this.page.textContent('.cheque-indent strong');
    return confirmationMessage;
  }
}

module.exports = AutomationExercisePage;