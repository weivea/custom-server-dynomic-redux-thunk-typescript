
import {Dispatch, Action} from 'redux';

// 接口类型定义
export interface  CountState {
  lastUpdate: number
  light: boolean
  count: number
}

export enum ActionTypes  {
  TICK= 'TICK',
  INCREMENT= 'INCREMENT',
  DECREMENT= 'DECREMENT',
  RESET= 'RESET',
}

export interface PureAction extends Action<string> {
}

export interface TickAction extends Action<string> {
  light:boolean,
  ts:number
}
export  type CounterAction = PureAction | TickAction;

// 代码逻辑

const defaultCountState:CountState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
}

// REDUCERS
export const countReducer = (state = Object.assign({},defaultCountState), action:CounterAction) => {
  // console.log(state);
  switch (action.type) {
    case actionTypes.TICK:
      const tickAction = action as TickAction;
      return Object.assign({}, state, {
        lastUpdate: tickAction.ts,
        light: !!tickAction.light,
      })
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1,
      })
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1,
      })
    case actionTypes.RESET:
      return Object.assign({}, state, {
        count: defaultCountState.count,
      })
    default:
      return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer:boolean) => (dispatch:Dispatch) => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = (dispatch:Dispatch) => {
  return setInterval(() => {
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() })
  }, 1000)
}

export const incrementCount = () => {
  return { type: actionTypes.INCREMENT }
}

export const decrementCount = () => {
  return { type: actionTypes.DECREMENT }
}

export const resetCount = () => {
  return { type: actionTypes.RESET }
}