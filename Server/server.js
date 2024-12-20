const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const TodoModel = require('./Models/TODO')

dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const mongoose = require('mongoose');

//const uri = 'mongodb+srv://yogeshcclab:ABYYABYY*y1@cluster0.fjlbgfj.mongodb.net/TODO?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));



// app.get('/get',(req,res) => {
//    TodoModel.find().then(result => res.json()).catch(err => res.json(err))
// })

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => {
            //console.log(result);
            res.json(result);
        })
        .catch(err => res.status(500).json(err));
});

app.post('/add',(req,res)=> {
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result => res.json(result)).catch(err => res.json(err))
})


app.put('/update/:id', (req,res) => 
    {
    const {id} = req.params;
    console.log(id);
    TodoModel.findById(id).then(result => 
        {
        
            if(!result){
                return res.status(404).json({"message":"Item not found"})
                        }
            const newDone = !result.done;
            TodoModel.findByIdAndUpdate({_id : id}, {done : newDone})
            .then(res => res.json(res))
            .catch(err => res.json(err))
        }
    ) 
})

app.delete('/delete/:id', (req,res) => {
    const{id} = req.params;
    //console.log(id);
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(res))
    .catch(err => res.json(err)
    )
})


app.listen( PORT, () => {console.log('Server is running at PORT 3001') })