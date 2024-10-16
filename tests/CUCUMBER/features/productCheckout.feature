Feature: Product Checkout

  Scenario: Add product to cart and checkout successfully
    Given I am on the login page
    When I log in with valid credentials
    And I add the product "IPHONE 13 PRO" to the cart
    And I proceed to checkout
    And I fill in the checkout details
    Then I should see a success message

  Scenario: Add product to cart and fail checkout due to missing details
    Given I am on the login page
    When I log in with valid credentials
    And I add the product "IPHONE 13 PRO" to the cart
    And I proceed to checkout
    And I fill in the checkout details with missing information
    Then I should see an error message