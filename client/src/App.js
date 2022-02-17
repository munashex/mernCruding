import react , {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'


const App = () => {
const [name, setName] = useState('');
const [age, setAge] = useState('');
const [user, setUser] = useState([]);
const [newName, setNewName] = useState('')


const handleSubmit = (e) => {
  e.preventDefault()

  axios.post('http://localhost:3004/post', {
     name: name,
    age: age
  })

  alert("submitted")
}


useEffect(() => {
axios.get('http://localhost:3004/users')
.then(res => {
  setUser(res.data)
})
},[])

const handleDelete = (id) => {
  axios.delete(`http://localhost:3004/delete/${id}`)
}



const handleUpdate = (id) => {
  axios.put('http://localhost:3004/update',{
    id: id,
    newName: newName
  })
}


  return (
    <div className='App'>
    <form onSubmit={handleSubmit}>
<input
placeholder='name'
onChange={(e) => setName(e.target.value)}
/>
<br/>
<input
placeholder='age'
onChange={(e) => setAge(e.target.value)}
/>
<br/>
<button type="submit">add</button>
</form>
<div className='request'>
  {
user && user.map((item, index) => {
  return (
    <div key={index}>
<h4>{item.name}</h4>
<br/>
<pre>{item.age}</pre>
<br/>
<input placeholder="update name"
onChange={(e) => setNewName(e.target.value)}
/>
<button onClick={() => handleUpdate(item._id)}>update</button>
<br/>
<button onClick={() => handleDelete(item._id)}>Delete</button>
<hr/>
      </div>
  )
})
  }
</div>
    </div>
  )
}

export default App;
