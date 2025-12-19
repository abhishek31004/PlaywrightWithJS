Feature :Ecommerce Application

  Scenario: User Login
    Given the user is on the login Ecommerce Application with valid "username" and "password"
    When Add "zara coat 3" to the cart
    Then verify "zara coat 3" is displayed in the cart
    When Checkout "zara coat 3" and submit the order
    Then verify the order is placed successfully with message "Thankyou for the order."

    //Scenario: Add Item to Cart