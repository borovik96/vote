import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer, { setEntriesAction, voteAction, nextStepAction } from './reducer';

const testEntries = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];

describe('Reducer', () => {
  it('Handles SET_ENTRIES action', () => {
    const state = Map();
    const nextState = reducer(state, setEntriesAction(testEntries));

    expect(nextState).to.equal(fromJS({
      entries: testEntries
    }));
  });

  it('Handles VOTE action', () => {
    const state = fromJS({
      vote: {
        pair: testEntries
      },
      entries: []
    });
    const nextState = reducer(state, voteAction(testEntries[0]));

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: testEntries,
        tally: {
          [testEntries[0]]: 1
        }
      },
      entries: []
    }));
  });

  it('Handles NEXT_STEP action', () => {
    const state = fromJS({
      entries: testEntries
    });
    const nextState = reducer(state, nextStepAction());

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: testEntries.slice(0, 2)
      },
      entries: testEntries.slice(2)
    }));
  });

  it('State is undefined', () => {
    const nextState = reducer(undefined, setEntriesAction(testEntries));

    expect(nextState).to.equal(fromJS({
      entries: testEntries
    }));
  });

  it('Use "reduce" function', () => {
    const actions = [
      setEntriesAction(testEntries),
      nextStepAction(),
      voteAction(testEntries[0]),
      voteAction(testEntries[0]),
      voteAction(testEntries[1]),
      voteAction(testEntries[0]),
      nextStepAction()
    ];
    const finalState = actions.reduce(reducer, Map());
    expect(finalState).to.equal(fromJS({
      entries: [...testEntries.slice(4), testEntries[0]],
      vote: {
        pair: testEntries.slice(2, 4)
      }
    }));
  });
});
