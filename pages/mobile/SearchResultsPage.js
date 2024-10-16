class SearchResultsPage {
  constructor(driver) {
    this.driver = driver;
  }

  async getFirstResultText() {
    const firstResult = await this.driver.elementByXPath('//android.widget.TextView[@resource-id="com.amazon.mShop.android.shopping:id/item_title"]');
    return await firstResult.text();
  }

  async addFirstResultToCart() {
    const firstResult = await this.driver.elementByXPath('//android.widget.TextView[@resource-id="com.amazon.mShop.android.shopping:id/item_title"]');
    await firstResult.click();
    const addToCartButton = await this.driver.elementById('com.amazon.mShop.android.shopping:id/add-to-cart-button');
    await addToCartButton.click();
  }

  async verifyProductInCart(productName) {
    const cartButton = await this.driver.elementById('com.amazon.mShop.android.shopping:id/action_bar_cart_image');
    await cartButton.click();
    const cartProduct = await this.driver.elementByXPath(`//android.widget.TextView[contains(@text, "${productName}")]`);
    return await cartProduct.isDisplayed();
  }
}

module.exports = SearchResultsPage;