import { legacy_createStore as createStore } from 'redux' 

const initialState = { toDoList: [] } 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD": 
            return {
                ...state, 
                toDoList: action.payload
            }
        case "ADD": 
            return {
                ...state, 
                toDoList: [...state.toDoList, action.payload]
            }
        case "DELETE": 
            return {
                ...state, 
                toDoList: state.toDoList.filter((item) => item.id !== action.payload)
            } 
        case "COMPLETED": 
            return {
                ...state, 
                toDoList: state.toDoList.map((item) => item.id === action.payload ? {...item, completed: !item.completed }: item )
            }
        default: 
            return state; 
    }
} 

const store = createStore(reducer) 

export default store; 