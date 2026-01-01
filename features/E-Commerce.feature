Feature: Ecommerce Application

  Scenario: User Login
    Given the user is on the login Ecommerce Application with valid "abiqa@gmail.com" and "Qwerty@123"
    When Add "ZARA COAT 3" to the cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place the order
    Then verify order is present in the orderhistory