const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo")

    .then(() => { console.log("connected to DB") })
    .catch(console.error)

const Todo = require('./Models/todo')
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})


app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    todo.save();

    res.json(todo);
})


app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result)
})

app.put('/todo/complete/:id',async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.complete = ! todo.complete;
    todo.save()
    res.json(todo)

})
app.listen(5174, () => console.log("Server started"))