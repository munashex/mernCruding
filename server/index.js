const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./model/user');
const user = require('./model/user');



app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost/my', () => console.log('connected database'));

app.get('/users', async(req, res) => {

 userModel.find({}, (error, result) => {
     if(error) {
         res.send(error)
     }
     res.send(result)
 })
})


app.post('/post', async(req, res) => {
    const {name, age} = req.body;

    const user = new userModel({
        name: name,
        age: age
    })
    try{
const savedUser = await user.save();
console.log(savedUser)
    }catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
   await userModel.findByIdAndRemove(id).exec()
})


app.put('/update', async(req, res) => {
   const {newName, id} = req.body;

   try{
      userModel.findById(id, (err, updatedName) => {
          updatedName.name = newName;
          updatedName.save()
      })
   }catch(err){
       res.send(err)
   }
})


app.listen(3004, () => console.log('server is running on port 3004'))