import ListContainer from "./ListContainer"
import TaskForm from "./TaskForm"
import React from 'react'
import moment from 'moment'
import uuid from "node-uuid";
import { GlobalContext, GlobalDispatchContext } from "../../ContextStore/ContextAPI";
import { toaster, toastError, toastSuccess } from "../../Components/Toast";
import { createTodos } from "../../Services/UserServices";


const DashBoard = () => {

  const [todos, setTodos] = React.useState([])
  const [mode, setMode] = React.useState('')
  const [data, setData] = React.useState({ name: '', date: moment(), status: '1' })
  const { loginState } = React.useContext(GlobalContext)
  const dispatch = React.useContext(GlobalDispatchContext)
  const handleSubmit = body => {
    let payload = {
      ...body,
      id: body.id || uuid.v1(),
      date: moment(body.date).valueOf()
    }
    let temp = [...todos]

    if (body.id) {
      const index = temp.findIndex(el => el.id === body.id)
      temp[index] = payload
    } else {
      temp.push(payload)
    }
    const id = toaster.loading(`${body.id ? 'Updating' : 'Adding'} Task...`)
    createTodos({ id: loginState.userDetails.id, todos: temp }).then(res => {
      console.log(res);
      toastSuccess(id, `Task ${body.id ? 'Updated' : 'Added'} 👌`)
      dispatch({ type: 'updateTodo', payload: res })
      // setTodos(res)
    }).catch(e => toastError(id, e?.response?.data + '🤯'))

  }
  const handleEdit = (body) => {
    console.log(body)
    setMode('edit')
    setData({ ...body })
  }
  const handleRemove = e => {
    const temp = [...todos]
    temp.find(el => el.id === e.target.dataset.id).isDeleted = true;
    const id = toaster.loading("Deleting Task...")
    createTodos({ id: loginState.userDetails.id, todos: temp }).then(res => {
      console.log(res);
      toastSuccess(id, `Task Deleted 👌`)
      dispatch({ type: 'updateTodo', payload: res })
      // setTodos(res)
    }).catch(e => toastError(id, e?.response?.data + '🤯'))
  }
  const handleComplete = e => {
    const temp = [...todos]
    temp.find(el => el.id === e.target.dataset.id).status = '3'
    // setTodos(temp)
    const id = toaster.loading("Completing Task...")
    createTodos({ id: loginState.userDetails.id, todos: temp }).then(res => {
      console.log(res);
      toastSuccess(id, `Task Updated 👌`)
      dispatch({ type: 'updateTodo', payload: res })
      // setTodos(res)
    }).catch(e => toastError(id, e?.response?.data + '🤯'))
  }
  React.useEffect(() => {
    setTodos(loginState.userDetails.todos)
  }, [loginState.userDetails.todos])
  return <div>
    {mode ? <TaskForm todo={data} setMode={setMode} handleSubmit={handleSubmit} /> : <button className='button mt-3' onClick={() => { setMode('create'); setData({ name: '', date: moment(), status: '1' }) }}>Create Task</button>}

    <ListContainer todos={todos} handleEdit={handleEdit} handleRemove={handleRemove} handleComplete={handleComplete} />
  </div>
}

export default DashBoard
