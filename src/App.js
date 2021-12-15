import { useState, useEffect } from 'react';
import List from './List'
import Alert from './Alert'


import './App.css';




const App = () => {

const [name, setName] = useState('')
const [list, setList] = useState([])
const [isEditing , setIsEditing] = useState(false)
const [editId, setEditId] = useState(null)
const [alert, setAlert] = useState({ show: false, msg: '', type: '' })


  return (
    <section className='section-center'>
      
      <h3>Grocery Bud</h3>
      <form className='grocery-form' >
      <Alert />
      <div className='form-control'>
        <input type='text' name={name}  className='grocery' placeholder='e.g. eggs' value={name} onChange={(e) => setName(e.target.value) } />
        <button type='submit' className='submit-btn'>{isEditing? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      <List />
    </section>
  );
}

export default App;
