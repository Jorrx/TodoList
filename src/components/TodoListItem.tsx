import React, { FC, memo, useCallback, useState } from 'react'
import { ITodo } from '../types/TodoTypes'
import { Button, Checkbox, FormControlLabel, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import './Todo.css'

import UpdateIcon from '@mui/icons-material/Update';
import TodoItemMenu from './TodoItemMenu';
import { setSyntheticLeadingComments } from 'typescript';


interface TodoItem {
    todoItem: ITodo;
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}


const TodoListItem: FC<TodoItem> = memo(({ todoItem, setTodos, todos }) => {

    const [editedItem, setEditedItem] = useState<ITodo | null>(null)

    const onConfirmEdit = () => {

        if (!editedItem?.text.trim().length) {
            alert('Input field must be filled out');
            return;
        }

        setTodos(prev => prev.map(todo =>
            todo.id === editedItem.id ? { ...todo, text: editedItem.text } : { ...todo }
        ))

        setEditedItem(null)
    }

    const onEdit = useCallback(() => {
        setEditedItem({ ...todoItem })
    }, [onConfirmEdit])

    const onRemove = useCallback(() => {
        setTodos(prev => prev.filter(el => el.id !== todoItem.id))
    }, [todos])


    return (
        <div className='todo__list__Item' >
            {
                editedItem
                    ?
                    <form onSubmit={onConfirmEdit} style={{ width: '100%', display: 'flex' }} >
                        <TextField sx={{ width: '100%' }} value={editedItem.text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEditedItem({
                                ...editedItem,
                                text: e.target.value
                            });
                        }} />
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{
                                background: '#1D7EAF',
                                height: '55px',
                                width: '55px'
                            }}

                        >
                            <UpdateIcon fontSize='large' sx={{ color: 'white' }} />
                        </Button>
                    </form>
                    :
                    <>
                        <FormControlLabel sx={{ width: '100%', padding: '9px' }} control={<Checkbox onChange={() => {
                            setTodos(todos.map(todo =>
                                todo.id === todoItem.id
                                    ?
                                    { ...todoItem, complited: !todoItem.complited }
                                    : todo
                            ))
                        }} checked={todoItem.complited} />} label={todoItem.text} style={{ textDecoration: todoItem.complited ? 'line-through' : 'none' }} />
                        <TodoItemMenu onEdit={onEdit} onRemove={onRemove} />
                    </>

            }
        </div>
    )

})

export default TodoListItem

