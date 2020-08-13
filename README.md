# RHO-Node.js-Challenge

## Installation
Clone this repository: 
```
git clone https://github.com/BernardoFuret/RHO-Node.js-Challenge.git
```

Then, access the created folder. There, install the dependencies:
```
npm ci
```
(requires at least npm v5.7.1)

## About the API
To run the API, on the parent folder, run the following command:
```
npm start
```
It will be served on `http://localhost:8080`. To change the port, just use the environment variable `PORT`. E.g.: `PORT=8081 npm start`

To run the tests, execute:
```
npm test
```

### Endpoints
Each endpoint, except the `sports` endpoint, needs a language to be passed via the query parameter `lang`. Valid languages can be seen on `src/resources/languages.js`.

* `/sports`: Lists all sports for the given language. If no language was passed, it lists all sports for all languages.
* `/events`: Lists all events for the given language. The events come sorted, by upstream API `pos` field, hierarchically; that is, grouped and sorted by `sports.pos`, then by `comp.pos` and finally by `event.pos`.

 This endpoint also supports the query parameter `sportId`, passing a sport ID. It will return only the events for the sport ID given (or empty if no events exist for that sport or no sport exists with that ID).
* `/events/<id>`: Returns all data for the event with ID `id`.

## Other
So far, only minimum requisites are implemented.
