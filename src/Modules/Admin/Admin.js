

import React from 'react'
import { Modal } from 'react-bootstrap'
import { toaster, toastError, toastSuccess } from '../../Components/Toast'
import { deleteUser, listUsers } from '../../Services/AdminServices'
import ItemRow from '../Dashboard/ItemRow'

const Admin = () => {
  const [users, setUsers] = React.useState([])
  const [todos, setTodos] = React.useState([])
  const [show, setShow] = React.useState(false);
  const ref = React.useRef('')

  const getData = () => {
    console.log(ref.current.value)
    const id = toaster.loading("Getting ..")
    listUsers(ref.current.value)
      .then(res => {
        console.log(res);
        toastSuccess(id, 'Loaded')
        setUsers(res)
      }).catch(e => toastError(id, e.response.data + '🤯'))
  }
  const handleClose = () => {
    setShow(false)
    setTodos([])
  }
  const handleOpen = (data) => {
    setShow(true)
    setTodos(data)
  }
  const handleDelete = (data) => {
    const id = toaster.loading("Deleting User...")
    deleteUser(data).then(res => {
      toastSuccess(id, 'Deleted')
      getData()
    }).catch(e => toastError(id, e?.response?.data))

  }
  return <div className="table-container ht400 tableFixHead">
    <ModalDialog setShow={setShow} show={show} todos={todos} handleClose={handleClose} />
    <input ref={ref}></input><button type="button" onClick={getData}>Go</button>
    <table className="table is-hoverable " style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
      <thead>
        <tr className="has-background-link">
          <th className="has-text-light has-background-link">Count</th>
          <th className="has-text-light has-background-link" data-sort-by="date" >Name</th>
          <th className="has-text-light has-background-link" data-sort-by="name" >Email</th>
          <th className="has-text-light has-background-link" data-sort-by="status" >Password</th>
          <th className="has-text-light has-background-link"> ID</th>
        </tr>
      </thead>
      <tbody>
        {users.map((el, i) => {
          return <tr key={el.id} >
            <td> {i + 1} </td>
            <td onClick={() => handleOpen(el.todos)}>{el.name}</td>
            <td>{el.email}</td>
            <td>{el.password}</td>
            <td onClick={() => handleDelete(el.id)}> {el.id}</td>
          </tr>
        })}
      </tbody>
    </table></div>

}

const ModalDialog = ({ todos, show, handleClose }) => {



  return (
    <>

      <Modal show={show} onHide={handleClose} dialogClassName="modal2000" backdropClassName='modal20'>
        <Modal.Header closeButton>
          <Modal.Title>Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="table-container ht400 tableFixHead">
            <table className="table is-hoverable " style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
              <thead>
                <tr className="has-background-link">
                  <th className="has-text-light has-background-link">Count</th>
                  <th className="has-text-light has-background-link" data-sort-by="date" >Task</th>
                  <th className="has-text-light has-background-link" data-sort-by="name" >Date</th>
                  <th className="has-text-light has-background-link" data-sort-by="status" >Status</th>
                  <th className="has-text-light has-background-link"> Is Del</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((el, i) => {
                  return <ItemRow
                    key={el.id}
                    item={el}
                    count={i + 1}
                    isAdmin
                  />
                })}
              </tbody>
            </table></div>

        </Modal.Body>

      </Modal>
    </>
  );
}


export default Admin
