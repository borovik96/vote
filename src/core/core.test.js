import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from './core';

const INITIAL_ENTRIES_LIST = ['Trainspotting', '28 Days Later', 'Sunshine'];
describe('App logic', () => {
  describe('Set entries', () => {
    it('Add entries to state', () => {
      const state = Map();
      const entries = INITIAL_ENTRIES_LIST;
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List(INITIAL_ENTRIES_LIST)
      }));
    });
  });

  describe('Next step', () => {
    it('Set vote field with data from entries', () => {
      const state = Map({
        entries: List(INITIAL_ENTRIES_LIST)
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2))
        }),
        entries: List(INITIAL_ENTRIES_LIST.slice(2))
      }));
    });
  });

  describe('vote', () => {
    it('Create result of voting', () => {
      const state = Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2))
        }),
        entries: List()
      });
      const nextState = vote(state, INITIAL_ENTRIES_LIST[0]);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
          tally: Map({
            [INITIAL_ENTRIES_LIST[0]]: 1
          })
        }),
        entries: List()
      }));
    });

    it('Update exist result of voting', () => {
      const state = Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
          tally: Map({
            [INITIAL_ENTRIES_LIST[0]]: 2,
            [INITIAL_ENTRIES_LIST[1]]: 3
          })
        }),
        entries: List()
      });
      const nextState = vote(state, INITIAL_ENTRIES_LIST[1]);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
          tally: Map({
            [INITIAL_ENTRIES_LIST[0]]: 2,
            [INITIAL_ENTRIES_LIST[1]]: 4
          })
        }),
        entries: List()
      }));
    });
  });
});
