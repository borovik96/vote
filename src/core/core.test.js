import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next } from './core';

const INITIAL_ENTRIES_LIST = ['Trainspotting', '28 Days Later', 'Sunshine'];
describe('App logic', () => {
  describe('Set entries', () => {
    it('Add entries to state', () => {
      const state = Map();
      const entries = INITIAL_ENTRIES_LIST;
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of(...INITIAL_ENTRIES_LIST)
      }));
    });
  });

  describe('Next step', () => {
    it('Set vote field with data from entries', () => {
      const state = Map({
        entries: List.of(...INITIAL_ENTRIES_LIST)
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(...INITIAL_ENTRIES_LIST.slice(0, 2))
        }),
        entries: List.of(...INITIAL_ENTRIES_LIST.slice(2))
      }));
    });
  });
});
