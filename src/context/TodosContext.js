import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TodosContext = React.createContext();

const todosInitialState = {
    todos:[
        {id: 1, text: "finishing writing hooks chapter"},
        {id: 2, text: "attend chess session"},
        {id: 3, text: "read book"},
    ]
};

const todosReducer = (state, action) => {
    switch(action.type) {
        case 'add':
            const newToDo = {id: uuidv4(), text: action.payload};
            // add new todo onto array
            const addedToDos = [...state.todos, newToDo];
            // spread our state and assign todos
            return {...state, todos: addedToDos}
        case 'delete':
            const filteredTodoState = state.todos.filter(todo => todo.id !== action.payload.id);
            return {...state, todos: filteredTodoState}
        default:
            return todosInitialState;
    }
}

export const TodosContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(todosReducer, todosInitialState);
    return (
        <TodosContext.Provider value={{ state, dispatch }}>
            {children}
        </TodosContext.Provider>
    )
}