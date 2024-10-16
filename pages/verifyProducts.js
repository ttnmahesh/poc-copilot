class VerifyProducts {
    constructor(page) {
        this.page = page;
        this.productSelector = '.card'; // Updated to match the product card selector
        this.productNameSelector = 'h5 b'; // Updated to match the product name selector
        this.productPriceSelector = '.text-muted'; // Updated to match the product price selector
        this.viewButtonSelector = 'button:has-text("View")'; // Updated to match the View button selector
        this.addToCartButtonSelector = 'button:has-text("Add To Cart")'; // Updated to match the Add To Cart button selector
    }

    async verifyDashboardUrl() {
        await this.page.waitForLoadState('networkidle');
        return this.page.url();    
    }

        async fetchProductDetails() {
            const products = this.page.locator(this.productSelector);
            const productCount = await products.count();
            const productDetails = [];
            for (let i = 0; i < productCount; i++) {
                const product = products.nth(i);
                const name = await product.locator(this.productNameSelector).textContent() || 'No name';
                const price = await product.locator(this.productPriceSelector).textContent() || 'No price';
                productDetails.push({ name: name.trim(), price: price.trim() });
            }
            return productDetails;
        }
        

    async checkProductButtons() {
        const products = await this.page.$$(this.productSelector);
        const buttonVisibility = [];
        for (const product of products) {
            const viewButton = await product.$(this.viewButtonSelector);
            const addToCartButton = await product.$(this.addToCartButtonSelector);
            buttonVisibility.push({
                viewButtonVisible: await viewButton.isVisible(),
                addToCartButtonVisible: await addToCartButton.isVisible()
            });
        }
        return buttonVisibility;
    }
}

module.exports = VerifyProducts;