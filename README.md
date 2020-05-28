This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Local Development

1. Register for a Giphy API key at https://developers.giphy.com/dashboard/. Set the `REACT_APP_GIPHY_API_KEY` environment variable either in a `.env.local` file in the project root, or in the command line.

2. In the project directory, you can run: `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Interesting Points

- directory structure is based on "feature" rather than components/containers.
- infinite scroll component uses `IntersectionObserver`.
- Redux Toolkit allows us to write ["mutating" logic in reducers](https://redux-toolkit.js.org/api/createSlice#reducers). It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes.
- reducers, action type, action creaters are all created as a cohesive "slice", e.g. `src/features/gifsGrid/gifsSlice.ts`.

## Remaining Work

- close the modal by keyboard ESC or outside click.
- pretty visual design of the search form.
- pretty visual design of the gifs grid.
- optimize performance of _very_ long infinite scroll pages by removing some images from the DOM that were scrolled past.
- unit tests.
