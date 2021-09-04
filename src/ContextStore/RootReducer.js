import { ManageLocalStorage } from "../Utils/ManageLocalStorage"


const rootReducer = (state , action = {}) => {
    if(action.type==='logout'){
        return {...state,
            loginState: {
              userDetails: {},
              isLoggedIn: false,
            }
          }
    }
    if(action.type==='login'){
        return {...state,
            loginState: {
              userDetails: action.payload,
              isLoggedIn: true,
            }
          }
    }
    if(action.type==='updateTodo'){
        ManageLocalStorage.set('userDetails',{...state.loginState.userDetails,todos: action.payload})
        return {...state,
            loginState: {
              userDetails: {...state.loginState.userDetails,todos: action.payload},
              isLoggedIn: true,
            }
          }
    }
    return { ...state };
}
    export default rootReducer;