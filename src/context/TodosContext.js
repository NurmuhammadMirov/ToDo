import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TodosContext = React.createContext();

const todosInitialState = {
    todos:[]
};

const todosReducer = (state, action) => {
    switch(action.type) {
        case 'get':
            return {...state, todos: action.payload}
        case 'add':
            const newToDo = {id: uuidv4(), text: action.payload};
            // add new todo onto array
            const addedToDos = [...state.todos, newToDo];
            // spread our state and assign todos
            return {...state, todos: addedToDos}
        case 'delete':
            const filteredTodoState = state.todos.filter(todo => todo.id !== action.payload.id);
            return {...state, todos: filteredTodoState}
        case 'edit':
            const updatedToDo = { ...action.payload }
            const updatedToDoIndex = state.todos.findIndex(t => t.id === action.payload.id);
            const updatedToDos = [
                ...state.todos.slice(0,updatedToDoIndex),
                updatedToDo,
                ...state.todos.slice(updatedToDoIndex + 1)
            ];

            return {...state, todos: updatedToDos}
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