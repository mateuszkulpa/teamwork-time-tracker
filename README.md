# teamwork-time-tracker
Simple app to tracking work time. It uses [TeamWork API](https://developer.teamwork.com/projects/) in version V3.

## Features
- [x] display current working timers
- [x] start, pause, complete, delete timers
- [x] search tasks
- [x] modify description of timers
- [x] display total duration of current timers
- [x] recent tasks - allows to quick run timer on the recent tasks (e.g. from the last week)

## Challenges
CORS - if you want to use this application directly in your browser, you must enable cross-origin requests. The easiest way to do this is to build your proxy server. I used [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) project. My proxy server is on heroku and is available [here](https://time-tracker-cors-anywhere.herokuapp.com/).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)