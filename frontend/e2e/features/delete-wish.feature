Feature: Delete wishes

  As a person that has fulfilled some wishes
  I want to be able to delete these wishes from the list
  So I can clearly see which wishes need my focus

  Background:
    Given "6" wishes

  Scenario: Delete a wish
    When I delete a wish
    Then there are "5" wishes displayed

  Scenario: Delete all wishes
    When I delete all wishes
    Then there are "0" wishes displayed
