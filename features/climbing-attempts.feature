# TODO
Feature: adding/editing climbings

    Scenario: adding new climbing
        Given I've opened a new training modal popup
        When There is empty climbings adding section
        When There is "add new climbing" button
        When I clicked on "add new climbing" button
        Then It showed me a warning "Please, add even one attepmt to climbing"

        When I selected belay-type "bouldering"
        When I choose 6a+ from new attempt dropdonw

        When I click on "Add new attempt buttom"
        Then New attempt was appended to attempts list

        When I clicked on "add new climbing" button
        Then It collapsed to a string "Bouldering, 6a+"
