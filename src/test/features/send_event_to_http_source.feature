Feature: Send event to HTTP Source and validate webhook delivery

  
  Scenario: Configure webhook and send event via HTTP Source
     Given User launches the RudderStack login page
    And User enter the username as "hekelel719@amirei.com"
    And User enter the password as "Jenil2305$$$"
    When User click on the login button
    And It should ask for 2FA code will skip it
    And Click on Dashboard button 
    Then User should be redirected to the dashboard
    Given User navigates to the Connections page
    When User reads and stores the Data Plane URL from the top right corner
    And User copies and stores the Write Key of the HTTP source
    And User sends an event using API call with the stored Write Key and Data Plane URL
    And User clicks on the Webhook destination created earlier
    Then User should see the event in the Events tab of the destination
    And User should read and validate the count of delivered and failed events
