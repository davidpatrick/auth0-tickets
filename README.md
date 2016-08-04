# auth0-tickets
[![Code Climate](https://codeclimate.com/github/davidpatrick/auth0-tickets/badges/gpa.svg)](https://codeclimate.com/github/davidpatrick/auth0-tickets)
[![Test Coverage](https://codeclimate.com/github/davidpatrick/auth0-tickets/badges/coverage.svg)](https://codeclimate.com/github/davidpatrick/auth0-tickets/coverage)
[![Build Status](https://travis-ci.org/davidpatrick/auth0-tickets.svg?branch=master)](https://travis-ci.org/davidpatrick/auth0-tickets)

Submit customer support tickets to Zendesk.  You can demo this app at http://auth0-tickets.herokuapp.com/

## Required Environment Variables
* AUTH0_CLIENT_ID
* AUTH0_DOMAIN
* AUTH0_SECRET
* ZENDESK_USERNAME
* ZENDESK_TOKEN
* ZENDESK_URL 

## Todos
* Add Username/Avatar to show who the currentUser logged in is (top right menu dropdown)
* Add Assignees (query zendesk for users/groups) (predictive text input dropdown) that will allow user who to assign the ticket to
* Add Due Date (date picker)
* Add Tags field (predictive text input dropdown)
* Add Preview for Body to show markdown and code formatting
* (optional) Show Formatted Ticket afer Submission
* More tests
