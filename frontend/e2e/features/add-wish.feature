Feature: Add wishes

  As a person that forgets everything
  I want to be able to save my wishes to a list
  So I can look them up once I forget them

  Scenario Outline: Add a wish
    Given "<initial>" wishes
    When I add a new wish
    Then there are "<result>" wishes displayed

    Examples:
      | initial | result |
      | 6       | 7      |
      | 0       | 1      |
