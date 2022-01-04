import { useState, useEffect} from 'react';
import List from './List'
import Alert from './Alert'

import './App.css';


const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
  return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }
}

const App = () => {

const [name, setName] = useState('')
const [list, setList] = useState(getLocalStorage())
const [isEditing , setIsEditing] = useState(false)
const [editId, setEditId] = useState(null)
const [alert, setAlert] = useState({ show: false, type: '', msg: '' })

const handleSubmit = (e) => {
  e.preventDefault()
if (!name){
  showAlert(true, 'danger', 'Please enter an item' )
}
else if (name && isEditing){
setList(list.map((item) => {
  if(item.id === editId){
    return { ...item, title: name }
  }
  return item
}))
setName('')
setEditId(null)
setIsEditing(false)
showAlert(true, 'success', 'value changed');
}else{
  showAlert(true, 'success', 'item added to list')
  const newItem = { id: new Date().getTime().toString(), title: name }
  setList([...list, newItem])
  setName('')
}
}
const showAlert = (show = false, type = '', msg = '') => {
  setAlert({ show, type, msg });
};

const removeItem = (id) => {
  showAlert(true, 'danger', 'item removed')
  setList(list.filter((item) => item.id !== id))
  
}

const editItem = (id) => {
 const specificItem = list.find((item) => item.id === id )
 setIsEditing(true)
 setEditId(id)
 setName(specificItem.title)
}

const clearItem = () => {
  showAlert(true, 'danger', 'Empty Item')
  setList([])
}


useEffect(() => {
  localStorage.setItem('list', JSON.stringify(list)) 
}, [list])


  return (
    <section className='section-center'>
      
      <form className='grocery-form' onSubmit={handleSubmit}>
      <h3>Grocery Bud</h3>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
     
      <div className='form-control'>
        <input 
            type='text' 
            className='grocery' 
            placeholder='e.g. eggs' 
            value={name} 
            onChange={(e) => setName(e.target.value) } 
        />
        <button 
            type='submit' 
            className='submit-btn'>{isEditing? 'Edit' : 'Submit'}
        </button>
        </div>
      </form>
      {list.length > 0 &&    (
        <div className='grocery-container'>
             <List items={list} removeItem={removeItem} editItem={editItem} />
             <button className='clear-btn' onClick={clearItem}>Clear items</button>
        </div>
    
        )}
   
    </section>
  );
}

export default App;
