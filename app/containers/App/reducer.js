import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_PORTFOLIO, LOAD_PORTFOLIO_SUCCESS, UPDATE_PORTFOLIO_COUNT, SET_PORTFOLIO_CURRENT } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  portfolio: [{ projectTitle: 'Software Studios', link: 'www.software-studios.com', imageUrl: 'https://lh3.googleusercontent.com/proxy/_JOoYfQojg3F_J53NIibXbXneVsBwKhfvYVVucoqV-u_vNIAq1BEGMX93TfWOQbVQ5XRTOpd01RE3kXm5hMV4XP7LQM0UiNe5lNKr4uKNmsYPzJfR-8rldpG9dKnEKLHibAoS4NJdzgDXQu8tjMCqr_69RTheGzpm1BEDAXwWyvqu0t_0VUkxR9cRcr3eJkxYHY' }],
  portfolioCurrent: { projectTitle: 'Software Studios', link: 'www.software-studios.com', imageUrl: 'https://lh3.googleusercontent.com/proxy/_JOoYfQojg3F_J53NIibXbXneVsBwKhfvYVVucoqV-u_vNIAq1BEGMX93TfWOQbVQ5XRTOpd01RE3kXm5hMV4XP7LQM0UiNe5lNKr4uKNmsYPzJfR-8rldpG9dKnEKLHibAoS4NJdzgDXQu8tjMCqr_69RTheGzpm1BEDAXwWyvqu0t_0VUkxR9cRcr3eJkxYHY', images: [{ imageSrc: 'https://lh3.googleusercontent.com/proxy/2PZp5qA7fvAPtZSb6OhaXHI2TRoVo-pAI8xwMc_sRWs3APqDHFK6C_dcakNWei6o6cXKN_a2ohW5G9fj5ohCmQ5kNpMHhG9N7A3a5PJxd7eZIpwfXXYH8rvK3JW8UECloip6bkl09dnXvx8EXuSY32DknXh0kjBxHvSWRH-NuLc6lrITx6mO53CLK5HOptezyGo', caption: 'Q-Bee' }] },
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
