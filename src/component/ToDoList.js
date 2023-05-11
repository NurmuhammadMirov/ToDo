import * as React from 'react';
import { TodosContext } from '../context/TodosContext';
import { Table, Form, Stack, Button } from 'react-bootstrap';
import useApi from '../hooks/useApi';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BiEdit, BiTrash } from 'react-icons/bi';

const styles = {
    tableOverflow: {
        height: '207px',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    addEditBtn: {
        background: '#FAC607',
        border: 0,
    }
}

const ToDoList = () => {
    const {state, dispatch} = React.useContext(TodosContext);
    const [todoText, setTodoText] = React.useState("");
    const [editMode, setEditMode] = React.useState(false);
    const [editTodo, setEditTodo] = React.useState(null);
    const buttonTitle = editMode ? "Edit" : "Add";

    const endpoint = "http://localhost:3000/todos/";
    const savedTodos = useApi(endpoint);

    React.useEffect(() => {
        dispatch({ type: 'get', payload: savedTodos })
    }, [savedTodos]); // dispatch whoever savedTodos changes

    const handleDelete = async (todo, state) => {
        await axios.delete(endpoint + todo.id);
        dispatch({ type: 'delete', payload: todo });
        setEditMode(false);
        setTodoText("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!todoText) return; // exit the function if input is empty
        if (editMode) {
            await axios.patch(endpoint+editTodo.id, {text: todoText});
            dispatch({ type: 'edit', payload: {...editTodo, text: todoText} });
            setEditMode(false);
            setTodoText(null);
        } else {
            const newTodo = {id: uuidv4(), text: todoText}
            await axios.post(endpoint, newTodo);
            dispatch({ type: 'add', payload: newTodo })
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
                    <Button style={styles.addEditBtn} type='submit'>
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
                                        <BiEdit size={20} color='orange' hover='red' />
                                    </td>
                                    <td onClick={() => handleDelete(todo, state)}>
                                        <BiTrash size={20} color='red' />
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