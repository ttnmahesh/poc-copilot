Feature: Amazon App Automation

  Scenario: Launch app and search product iPhone 16 and validate the result
    Given I have launched the Amazon app
    When I search for "iPhone 16"
    Then I should see the search results for "iPhone 16"

  Scenario: Launch app, search for product iPhone 16, add to cart and verify
    Given I have launched the Amazon app
    When I search for "iPhone 16"
    And I add the first result to the cart
    Then I should see "iPhone 16" in the cart