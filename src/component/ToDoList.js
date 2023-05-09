import * as React from 'react';
import { TodosContext } from '../context/TodosContext';
import { Table } from 'react-bootstrap';

const ToDoList = () => {
    const {state, dispatch} = React.useContext(TodosContext);

    const handleDelete = (todo) => {
        dispatch({ type: 'delete', payload: todo });
    }
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To Do</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {state.todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.text}</td>
                            <td>Edit</td>
                            <td onClick={() => handleDelete(todo)}>
                                Delete
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ToDoList;