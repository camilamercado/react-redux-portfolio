import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRoute = (state) => state.router;

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.currentUser
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.userData.repositories
);

const makeSelectPortfolio = () => createSelector(
  selectGlobal,
  (globalState) => globalState.portfolio
);

const makeSelectPortfolioCurrent = () => createSelector(
  selectGlobal,
  (globalState) => globalState.portfolioCurrent
);

const makeSelectMediaSetting = () => createSelector(
  selectGlobal,
  (globalState) => globalState.mediaSetting
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.location
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectPortfolio,
  makeSelectLocation,
  makeSelectPortfolioCurrent,
  makeSelectMediaSetting,
};
