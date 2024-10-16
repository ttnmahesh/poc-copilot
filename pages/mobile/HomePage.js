class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  async searchProduct(productName) {
    const searchBox = await this.driver.elementById('com.amazon.mShop.android.shopping:id/rs_search_src_text');
    await searchBox.sendKeys(productName);
    const searchButton = await this.driver.elementById('com.amazon.mShop.android.shopping:id/rs_search_submit_btn');
    await searchButton.click();
  }
}

module.exports = HomePage;