## Step 1: Download source
`git clone https://github.com/evacao1225/broccoli_invitation.git`

## Step 2: install dependencies
- `cd broccoli_invitation`
- `npm install`

## Step 3: run test cases
`npm run test`

## Step 4: run the app
- if in the development mode,
  - run `npm start`, then open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- if in the production mode,
  - run `npm run build` first to build the app to build folder. It correctly bundles React in production mode and optimizes the build for the best performance. Then, it's ready to be deployed.
	- `npm install -g serve` to install [serve](https://github.com/zeit/serve)
	- `serve -s build`
	- open [http://IP_of_your_host:5000](http://IP_of_your_host:5000) to view the page
