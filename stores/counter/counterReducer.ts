
import {Dispatch, Action} from 'redux';
import {ActionTypes} from 'stores/const';
// 接口类型定义
export interface  CountState {
  lastUpdate: number
  light: boolean
  count: number
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

// REDUCERS
export const countReducer = (state = Object.assign({},defaultCountState), action:CounterAction) => {
  // console.log(state);
  switch (action.type) {
    case ActionTypes.TICK:
      const tickAction = action as TickAction;
      return Object.assign({}, state, {
        lastUpdate: tickAction.ts,
        light: !!tickAction.light,
      })
    case ActionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1,
      })
    case ActionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1,
      })
    case ActionTypes.RESET:
      return Object.assign({}, state, {
        count: defaultCountState.count,
      })
    default:
      return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer:boolean) => (dispatch:Dispatch) => {
  return dispatch({ type: ActionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = (dispatch:Dispatch) => {
  return setInterval(() => {
    dispatch({ type: ActionTypes.TICK, light: true, ts: Date.now() })
  }, 1000)
}

export const incrementCount = () => {
  return { type: ActionTypes.INCREMENT }
}

export const decrementCount = () => {
  return { type: ActionTypes.DECREMENT }
}

export const resetCount = () => {
  return { type: ActionTypes.RESET }
}