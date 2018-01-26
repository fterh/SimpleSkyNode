# thunderbird
Live Singapore weather data web app, written in Javascript.

## Run instructions
1. Clone the repo: `git clone https://github.com/fterh/thunderbird`
2. Rename `.env.sample` to `.env` and enter your API key
3. Run `npm install`
4. Run `node refreshData.js` (This creates a .JSON file containing weather data. You may wish to run this as a scheduled task, e.g. Cron.)
4. Finally, run `npm start` and navigate to http://localhost:3000
