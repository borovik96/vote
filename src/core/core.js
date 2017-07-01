import { List, Map } from 'immutable';

const getWinner = (vote) => {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes === bVotes) return [a, b];
  return aVotes > bVotes ? [a] : [b];
};

export const setEntries = (state, entries) => state.set('entries', List(entries));

export const next = (state) => {
  const entries = state.get('entries').concat(getWinner(state.get('vote')));
  return state.merge({
    vote: Map({
      pair: entries.take(2)
    }),
    entries: entries.skip(2)
  });
};

export const vote = (state, entrie) => state.updateIn(
  ['vote', 'tally', entrie],
  0,
  tally => tally + 1
);
