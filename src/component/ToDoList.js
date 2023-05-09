import * as React from 'react';
import { TodosContext } from '../context/TodosContext';
import { Table, Form, Stack, Button } from 'react-bootstrap';

const ToDoList = () => {
    const {state, dispatch} = React.useContext(TodosContext);
    const [todoText, setTodoText] = React.useState("");

    const handleDelete = (todo) => {
        dispatch({ type: 'delete', payload: todo });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'add', payload: todoText })
        setTodoText(""); // to clear field after adding
    }
    return (
        <div style={{ flexBasis: '600px' }}>
            <Form onSubmit={handleSubmit}>
                <Stack direction="horizontal" gap={2} className='mb-2'>
                    <Form.Group controlId='formBasicEmail' className="me-auto w-100">
                        <Form.Control
                            className="me-auto"
                            type='text'
                            placeholder='Enter To Do'
                            onChange={(e) => setTodoText(e.target.value)}
                            value={todoText}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Add</Button>
                </Stack>
            </Form>
            {state.todos.length == 0 ? null : (
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
            )}
        </div>
    )
}

export default ToDoList;