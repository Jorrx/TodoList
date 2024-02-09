import React, { FC, memo, useCallback, useMemo } from 'react'
import { ITodo } from '../types/TodoTypes'
import TodoListItem from './TodoListItem'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore, } from '@mui/icons-material';
import { Collapse, List } from '@mui/material';
import './Todo.css'


interface ITodoList {
    todos: ITodo[],
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
}
const TodoList: FC<ITodoList> = memo(({ todos, setTodos }) => {
    console.log('ITodoList')
    const [open, setOpen] = React.useState(true);

    
    const [complitedTodos, notCompletedTodos] = useMemo(() => {
        
        const complitedTodos: ITodo[] = [];
        const notComplitedTodos: ITodo[] = [];
        todos.forEach(todo => {
            if (todo.complited) {
                complitedTodos.push(todo);
            } else {
                notComplitedTodos.push(todo);
            }
        });
        return [complitedTodos, notComplitedTodos];
    }, [todos])

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            {!todos.length
                ?
                <p className='Todo_info_text'>No Tasks</p>
                :
                <div>
                    <>
                        {complitedTodos.map(todo => {
                            return <TodoListItem
                                key={todo.id}
                                todos={todos}
                                todoItem={todo}
                                setTodos={setTodos} />
                        })}
                    </>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="complited" sx={{ flex: 'initial' }} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <>
                                {notCompletedTodos.length ? notCompletedTodos.map(todo => {
                                    return <TodoListItem
                                        key={todo.id}
                                        todos={todos}
                                        todoItem={todo}
                                        setTodos={setTodos} />
                                }) : <p className='Todo_info_text'>No completed tasks</p>}

                            </>
                        </List>
                    </Collapse>
                </div>
            }
        </div>

    )

})

export default TodoList