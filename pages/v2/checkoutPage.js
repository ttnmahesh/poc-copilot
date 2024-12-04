const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.loginEmailInput = '#userEmail';
    this.loginPasswordInput = '#userPassword';
    this.loginButton = '#login';
    this.searchBar = 'input[placeholder="Search"]';
    this.searchButton = 'button[type="submit"]';
    this.addToCartButton = 'button:has-text("Add to Cart")';
    this.cartIcon = 'a[href="/cart"]';
    this.checkoutButton = 'button:has-text("Proceed to Checkout")';
    this.paymentDetailsInput = '#paymentDetails';
    this.discountCouponInput = '#discountCoupon';
    this.placeOrderButton = 'button:has-text("Place Order")';
    this.orderHistoryLink = 'a[href="/order-history"]';
  }

  async login(username, password) {
    await this.page.goto('https://rahulshettyacademy.com/client');
    await this.page.fill(this.loginEmailInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForNavigation();
  }

  async searchProduct(productName) {
    await this.page.fill(this.searchBar, productName);
    await this.page.click(this.searchButton);
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

  async proceedToCheckout() {
    await this.page.click(this.cartIcon);
    await this.page.click(this.checkoutButton);
  }

  async enterPaymentDetails(details) {
    await this.page.fill(this.paymentDetailsInput, details);
  }

  async applyDiscountCoupon(coupon) {
    await this.page.fill(this.discountCouponInput, coupon);
  }

  async placeOrder() {
    await this.page.click(this.placeOrderButton);
  }

  async viewOrderHistory() {
    await this.page.click(this.orderHistoryLink);
  }
}

module.exports = { CheckoutPage };