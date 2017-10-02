Feature: Add wishes

  As a person that forgets everything
  I want to be able to save my wishes to a list
  So I can look them up once I forget them

  Scenario: Add a wish
    Given six wishes
    When I add a new wish
    Then there are "7" wishes displayed
