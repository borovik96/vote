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
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }
  return state.merge({
    vote: Map({
      pair: entries.take(2)
    }),
    entries: entries.skip(2)
  });
};

export const vote = (state, entrie) => state.updateIn(
  ['tally', entrie],
  0,
  tally => tally + 1
);

export const INITIAL_STATE = Map();
