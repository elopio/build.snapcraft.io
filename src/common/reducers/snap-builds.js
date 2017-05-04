import * as ActionTypes from '../actions/snap-builds';
import { snapBuildFromAPI } from '../helpers/snap-builds';

export const snapBuildsInitialStatus = {
  isFetching: false,
  snap: null,
  builds: [],
  success: false,
  error: null
};

export function snapBuilds(state = {}, action) {
  const initialStatus = snapBuildsInitialStatus;

  switch(action.type) {
    case ActionTypes.FETCH_BUILDS:
      return {
        ...state,
        [action.payload.id]: {
          ...initialStatus,
          ...state[action.payload.id],
          isFetching: true
        }
      };
    case ActionTypes.FETCH_SNAP_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          isFetching: false,
          // TODO
          // in refactoring this should go to entities,
          // or maybe shouldn't be needed at all
          snap: action.payload.response.payload.snap
        }
      };
    case ActionTypes.FETCH_BUILDS_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          isFetching: false,
          success: true,
          builds: action.payload.response.payload.builds.map(snapBuildFromAPI),
          error: null
        }
      };
    case ActionTypes.FETCH_BUILDS_ERROR:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          isFetching: false,
          success: false,
          error: action.payload.response.payload.error
        }
      };
    default:
      return state;
  }
}
