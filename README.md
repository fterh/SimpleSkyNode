# thunderbird
Live Singapore weather data web app, written in Javascript.

## Changelog
### 1.1 (28 Feb 2018)
* Implemented local storage (session storage) to store recent weather data. This loads the data instantly instead of forcing the user to wait through the splash screen, but doesn't prevent the usual AJAX calls in the background. 
### 1.0 (28 Feb 2018)
* There have been a few significant updates since the very first *actual* version (which I didn't track), so for the purposes of this changelog, v1.0 shall be considered to include all of them.

## Run instructions
1. Clone the repo: `git clone https://github.com/fterh/thunderbird`
2. Rename `.env.sample` to `.env` and enter your API key
3. Run `npm install`
4. Run `node refreshData.js` (This creates a .JSON file containing weather data. You may wish to run this as a scheduled task, e.g. Cron.)
4. Finally, run `npm start` and navigate to http://localhost:3000
