Feature: RudderStack Login

  As a registered user
  I want to log in to the RudderStack web application
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given User launches the RudderStack login page
    And User enter the username as "hekelel719@amirei.com"
    And User enter the password as "Jenil2305$$$"
    When User click on the login button
    And It should ask for 2FA code will skip it
    And Click on Dashboard button 
    Then User should be redirected to the dashboard
    
