import * as React from 'react';
import { TodosContext } from '../context/TodosContext';
import { Table, Form, Stack, Button } from 'react-bootstrap';

const styles = {
    tableOverflow: {
        height: '207px',
        overflowY: 'auto',
        overflowX: 'hidden',
    }
}

const ToDoList = () => {
    const {state, dispatch} = React.useContext(TodosContext);
    const [todoText, setTodoText] = React.useState("");
    const [editMode, setEditMode] = React.useState(false);
    const [editTodo, setEditTodo] = React.useState(null);
    const buttonTitle = editMode ? "Edit" : "Add";

    const handleDelete = (todo, state) => {
        dispatch({ type: 'delete', payload: todo });
        setEditMode(false);
        setTodoText("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!todoText) return; // exit the function if input is empty
        if (editMode) {
            dispatch({ type: 'edit', payload: {...editTodo, text: todoText} });
            setEditMode(false);
            setTodoText(null);
        } else {
            dispatch({ type: 'add', payload: todoText })
        }
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
                    <Button variant='primary' type='submit'>
                        {buttonTitle}
                    </Button>
                </Stack>
            </Form>
            {state.todos.length === 0 ? null : (
                <div style={styles.tableOverflow}>
                    <Table striped bordered hover className='mb-0'>
                        <thead>
                            <tr>
                                <th>To Do</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody style={styles.tbody}>
                            {state.todos.map(todo => (
                                <tr key={todo.id}>
                                    <td>{todo.text}</td>
                                    <td onClick={() => {
                                        setTodoText(todo.text)
                                        setEditMode(true)
                                        setEditTodo(todo)
                                    }}>
                                        Edit
                                    </td>
                                    <td onClick={() => handleDelete(todo, state)}>
                                        Delete
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default ToDoList;