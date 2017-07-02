import { setEntries, vote, next, INITIAL_STATE } from '../core/core';

const SET_ENTRIES = 'SET_ENTRIES';
const NEXT_STEP = 'NEXT_STEP';
const VOTE = 'VOTE';

export const setEntriesAction = entries => ({ type: SET_ENTRIES, entries });
export const nextStepAction = () => ({ type: NEXT_STEP });
export const voteAction = entrie => ({ type: VOTE, entrie });

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ENTRIES:
      return setEntries(state, action.entries);

    case NEXT_STEP:
      return next(state);

    case VOTE:
      return state.update('vote', voteState => vote(voteState, action.entrie));

    default:
      return state;
  }
};

export default reducer;
