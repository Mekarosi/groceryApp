import { useState, useEffect } from 'react';
import List from './List'
import Alert from './Alert'


import './App.css';




const App = () => {

const [name, setName] = useState('')
const [list, setList] = useState([])
const [isEditing , setIsEditing] = useState(false)
const [editId, setEditId] = useState(null)
const [alert, setAlert] = useState({ show: false, type: '', msg: '' })

const handleSubmit = (e) => {
  e.preventDefault()
if(!name){
  showAlert(true, 'danger', 'Please enter an item' )
}
else if(name && isEditing){

}else{
  const newItem = { id: new Date().getTime().toString(), title: name }
  setList([...list, newItem])
  showAlert(true, 'success', 'item added')
  setName('')
}
}
const showAlert = (show = false, type = '', msg = '') => {
  setAlert({ show, type, msg });
};

const removeItem = () => {
  console.log('item removed')
}

const editItem = () => {
  console.log('item edited')
}

const clearItem = () => {
  showAlert(true, 'danger', 'Empty Item')
  setList([])
}





  return (
    <section className='section-center'>
      <h3>Grocery Bud</h3>
      <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && (<Alert {...alert} removeAlert={showAlert} list={list}/>)}
      <div className='form-control'>
        <input 
            type='text' 
            name={name}  
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
             <List items={list} removeItem={removeItem} editItem={editItem}/>
             <button className='clear-btn' onClick={clearItem}>Clear item</button>
        </div>
    
        )}
   
    </section>
  );
}

export default App;
