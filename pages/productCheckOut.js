class AddProductInCart {
    constructor(page) {
        this.page = page;
        this.productSelector = '.card';
        this.productNameSelector = 'h5 b';
        this.productPriceSelector = '.text-muted';
        this.addToCartButtonSelector = 'button:has-text("Add To Cart")';
        this.cartMenuSelector = 'button[routerlink="/dashboard/cart"]';
        this.cartItemCountSelector = 'button[routerlink="/dashboard/cart"] label';
        this.cartProductNameSelector = 'h3:has-text("IPHONE 13 PRO")';
        this.cartProductPriceSelector = '.prodTotal p';
        this.buyNowButtonSelector = 'button:has-text("Buy Now")';
        this.deleteButtonSelector = 'button.btn.btn-danger';
        this.continueShoppingButtonSelector = 'button:has-text("Continue Shopping")';
        this.checkoutButtonSelector = 'button:has-text("Checkout")';
        this.cvvInputSelector = 'input[type="text"].input.txt'; // Updated selector for CVV input
        this.nameOnCardInputSelector = 'input[type="text"].input.txt'; // Updated selector for Name on Card input
        this.countryInputSelector = 'input[placeholder="Select Country"]'; // Updated selector for Country input
        this.placeOrderButtonSelector = 'a.btnn.action__submit'; // Updated selector for Place Order button
        this.successMessageSelector = 'text=Thankyou for the order.';
    }

    async addProductToCart(productNames) {
        const products = this.page.locator(this.productSelector);
        const productCount = await products.count();
        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);
            const name = await product.locator(this.productNameSelector).textContent();
            if (name.trim() === productName) {
                const price = await product.locator(this.productPriceSelector).textContent();
                await product.locator(this.addToCartButtonSelector).click();
                return { name: name.trim(), price: price.trim() };
            }
        }
        throw new Error(`Product with name ${productName} not found`);
    }

    async verifyCartItemCount(expectedCount) {
        await this.page.waitForLoadState('networkidle');
        const cartItemCount = await this.page.locator(this.cartItemCountSelector).textContent();
        return parseInt(cartItemCount.trim()) === expectedCount;
    }

    async verifyProductInCart(productName, productPrice) {
        await this.page.locator(this.cartMenuSelector).click();
        const cartProductName = await this.page.getByRole('heading', { name: productName }).textContent();
        const cartProductPrice = await this.page.locator(this.cartProductPriceSelector).textContent();
        const buyNowButtonVisible = await this.page.getByRole('button', { name: 'Buy Now' }).isVisible();
        const deleteButtonVisible = await this.page.locator(this.deleteButtonSelector).isVisible();
        const continueShoppingButtonVisible = await this.page.getByRole('button', { name: 'Continue Shopping' }).isVisible();
        const checkoutButtonVisible = await this.page.getByRole('button', { name: 'Checkout' }).isVisible();

        return {
            productNameMatch: cartProductName.trim() === productName,
            productPriceMatch: cartProductPrice.trim() === productPrice,
            buyNowButtonVisible,
            deleteButtonVisible,
            continueShoppingButtonVisible,
            checkoutButtonVisible
        };
    }

    async checkout(cvv, nameOnCard, country) {
        await this.page.getByRole('button', { name: 'Checkout' }).click();
        await this.page.waitForLoadState('networkidle'); // Wait for network idle
        await this.page.locator(this.cvvInputSelector).nth(2).fill(cvv); // Fill CVV
        await this.page.locator(this.nameOnCardInputSelector).nth(3).fill(nameOnCard); // Fill Name on Card
        await this.page.locator(this.countryInputSelector).fill(country); // Fill Country
        await this.page.keyboard.press('Backspace');
        await this.page.waitForSelector(`button:has-text("${country}")`); // Wait for the country dropdown to appear
        await this.page.getByRole('button', { name: ` ${country}` }).click(); // Select country from dropdown
        await this.page.locator(this.placeOrderButtonSelector).click(); // Click Place Order button
        const successMessage = await this.page.locator(this.successMessageSelector).textContent();
        return successMessage;
    }
}

module.exports = AddProductInCart;