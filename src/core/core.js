import { List, Map } from 'immutable';

export const setEntries = (state, entries) => state.set('entries', List(entries));

export const next = (state) => {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({
      pair: entries.take(2)
    }),
    entries: entries.skip(2)
  });
};
