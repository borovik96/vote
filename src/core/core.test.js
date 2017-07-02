import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from './core';

const INITIAL_ENTRIES_LIST = [
  'Trainspotting',
  '28 Days Later',
  'Sunshine',
  'Millions',
  '127 Hours'
];
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

    it('Move winner to the end of entries list and create new pair', () => {
      const state = Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
          tally: Map({
            [INITIAL_ENTRIES_LIST[0]]: 4,
            [INITIAL_ENTRIES_LIST[1]]: 2
          })
        }),
        entries: List(INITIAL_ENTRIES_LIST.slice(2))
      });
      const nextState = next(state);
      const newList = [...INITIAL_ENTRIES_LIST.slice(2), INITIAL_ENTRIES_LIST[0]];
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List(newList.slice(0, 2))
        }),
        entries: List(newList.slice(2))
      }));
    });

    it('Move both entries to the end of entries list if draft game', () => {
      const state = Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
          tally: Map({
            [INITIAL_ENTRIES_LIST[0]]: 4,
            [INITIAL_ENTRIES_LIST[1]]: 4
          })
        }),
        entries: List(INITIAL_ENTRIES_LIST.slice(2))
      });
      const nextState = next(state);
      const newList = [...INITIAL_ENTRIES_LIST.slice(2), ...INITIAL_ENTRIES_LIST.slice(0, 2)];
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List(newList.slice(0, 2))
        }),
        entries: List(newList.slice(2))
      }));
    });

    it('Set winner if there is only one entrie', () => {
      const state = Map({
        vote: Map({
          pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
          tally: Map({
            [INITIAL_ENTRIES_LIST[0]]: 2,
            [INITIAL_ENTRIES_LIST[1]]: 1
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: INITIAL_ENTRIES_LIST[0]
      }));
    });
  });

  describe('Voting', () => {
    it('Create result of voting', () => {
      const state = Map({
        pair: List(INITIAL_ENTRIES_LIST.slice(0, 2))
      });
      const nextState = vote(state, INITIAL_ENTRIES_LIST[0]);
      expect(nextState).to.equal(Map({
        pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
        tally: Map({
          [INITIAL_ENTRIES_LIST[0]]: 1
        })
      }));
    });

    it('Update exist result of voting', () => {
      const state = Map({
        pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
        tally: Map({
          [INITIAL_ENTRIES_LIST[0]]: 2,
          [INITIAL_ENTRIES_LIST[1]]: 3
        })
      });
      const nextState = vote(state, INITIAL_ENTRIES_LIST[1]);
      expect(nextState).to.equal(Map({
        pair: List(INITIAL_ENTRIES_LIST.slice(0, 2)),
        tally: Map({
          [INITIAL_ENTRIES_LIST[0]]: 2,
          [INITIAL_ENTRIES_LIST[1]]: 4
        })
      }));
    });
  });
});
