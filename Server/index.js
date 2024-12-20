const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const TodoModel = require('./Models/TODO')
dotenv.config()
app.use(express.json())
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URL;
const FREND = process.env.FREND;


const allowedOrigins = [
    FREND, // Local development
    'https://book-store-zeta-sable.vercel.app',// Production frontend
  ];
  
  // CORS middleware
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Deny the request
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  }));


mongoose.connect(URI).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:'));



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