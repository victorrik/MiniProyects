import { actionsLocalUser } from '../utils/reduxConstants'

const defaultState = {};

const reducer = (state = defaultState, action) => {
  let newState = {...state};
  switch (action.type) { 
    case actionsLocalUser.saveData:
      state = action.data;
    return state;
    case actionsLocalUser.updateData:
      newState = {...newState,...action.newData}
      state = newState
      //state = {...newState,...action.newData}
    return state;
    case actionsLocalUser.emptyData:
      state = {}
    default:
    return state
  }
}
export default reducer;