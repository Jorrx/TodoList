import React, { useCallback, useMemo, useState } from 'react'
import { ITodo } from './types/TodoTypes'
import TodoList from './components/TodoLIst'
import { Button, TextField, Typography } from '@mui/material'
import './App.css'
import logo from './components/assets/logo.png'

const App = () => {

  const [value, setValue] = useState('')
  const [todos, setTodos] = useState<ITodo[]>([])


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onAdd = () => {

    if (!value.trim().length) {
      return alert('Input field must be filled out')
    }

    const todoForAdd: ITodo = {
      id: Date.now(),
      text: value,
      complited: false,
    }

    setTodos([...todos, { ...todoForAdd }])
    setValue('')
  }

  const memoizedTodos = useMemo(() => {
    return todos
  }, [todos])

  return (
    <div className='App'>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="" width={'50px'} />
          <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#1D7EAF' }}> To Do List</Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <TextField
            sx={{ width: '100%' }}
            label="Add Todo List"
            value={value}
            onChange={onChange}
          />
          <Button
            variant="contained"
            href="#1D7EAF" sx={{
              background: '#1D7EAF',
              height: '55px',
              width: '55px',
            }}
            onClick={onAdd}>+</Button>
        </div>
        <TodoList todos={memoizedTodos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default App

