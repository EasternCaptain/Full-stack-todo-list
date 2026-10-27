import { legacy_createStore as createStore } from 'redux' 

const initialState = { toDoList: [] } 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD": 
            return {
                ...state, 
                toDoList: [...state.toDoList, action.payload]
            }
        case "DELETE": 
            return {
                ...state, 
                toDoList: state.toDoList.filter((item, index) => index !== action.payload)
            }
        default: 
            return state; 
    }
} 

const store = createStore(reducer) 

export default store; 