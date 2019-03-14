## Overview

This single-page React app shows NASDAQ data by in 2D chart. Data can be visualized in 3 time frames: day, week or month. Data are
shown in interval of 5 minutes or 1 days (however 5-minute-spaced data are available only for recent dates).

The chart can be panned and zoomed by click and drag.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It is implemented with Redux (https://redux.js.org/) to handle states, canvasjs (https://canvasjs.com/) to plot chart
and Material UI (https://material-ui.com/) for styling.

See the live demo at : https://vuongt.github.io/nasdaq-visualization/

## How to run
Inside project's directory, run:

### npm install
    Install dependencies.

### npm start
    Starts the development server.
    The app will be run on  http://localhost:3000/

### npm run build
    Bundles the app into static files.

## Project descriptions
### To make it easier to add new features (or grop of actions), the project is organized as follow:
    _actions: contains all redux actions which can be called from any component. Related actions are organised in the same file and are exported all together at index.js
    _constants: contains constants used by each action group
    _reducers: contains reducers organised by the same group of actions. All reducers are combined in index.js into a single root reducer
    _services: contains api call functions, organised by action group. This is where we fetch NASDAQ data.
    components: custom components: Chart and WeekPicker
    config: config parameters
    App.*: main component of the app that contains the visualization options and the 2D chart. It updates the chart according to options seleted by users.

Refer to the comments in each file for more details.

###Note
    Loading NASDAQ data takes pretty long, so I choose to load the 2 data set only once when we first render the main App component.
The chart then just needs to point to one or another data set in the store according to view options.
This prevents waiting time when switching from one interval to another.
The intraday data set loads faster, so it is shown first by default to improve user experience.

    All data pulled from alphadvantage have the string timestamps in US/Eastern therefore time zone information is shown when user choose the 5-minute interval
