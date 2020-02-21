import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_PORTFOLIO, LOAD_PORTFOLIO_SUCCESS, UPDATE_PORTFOLIO_COUNT, SET_PORTFOLIO_CURRENT } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  portfolio: [{ projectTitle: 'Software Studios', link: 'www.software-studios.com', tags: ['Shopify', 'SCSS'], media: [{ mediaSrc: 'software-studios_04.png', caption: 'Felicia', local: true }]}],
  portfolioCurrent: { projectTitle: 'Software Studios', link: 'www.software-studios.com', tags: ['Shopify', 'SCSS'], media: [{ mediaSrc: 'software-studios_04.png', caption: 'Felicia', local: true }]},
  portfolioCount: 0,
  userData: {
    repositories: false,
  },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        userData: {
          repositories: false,
        },
      };
      return newState;
    }

    case LOAD_PORTFOLIO: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        portfolio: false,
      };
      return newState;
    }

    case UPDATE_PORTFOLIO_COUNT: {
      const newState = {
        ...state,
        portfolioCount: action.count,
      };
      return newState;
    }

    case SET_PORTFOLIO_CURRENT: {
      const newState = {
        ...state,
        portfolioCurrent: action.entry,
      };
      return newState;
    }

    case LOAD_PORTFOLIO_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        portfolio: action.portfolio,
      };
      return newState;
    }

    case LOAD_REPOS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        userData: {
          repositories: action.repos,
        },
        currentUser: action.username,
      };
      return newState;
    }

    case LOAD_REPOS_ERROR: {
      return { ...state, error: action.error, loading: false };
    }
    default:
      return state;
  }
}

export default appReducer;
