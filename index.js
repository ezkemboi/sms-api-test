import express from "express"
import bodyParser from 'body-parser'
import { sequelize, Question } from './db.js'

const app = express()
const port = 3000

// Set up body parsers
app.use(bodyParser.json());
// Extend url parser urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.findAll()
    res.status(200).send(questions)
  } catch(error) {
    res.status(500).send({
      error: true,
      message: "Internal error server"
    })
  }
})

app.post('/questions', async (req, res) => {
  const { question, choices } = req.body
  // validations 
  if(!question || question.length < 5) {
    res.status(400).send({
      error: true,
      message: "Question is needed or length less than 5"
    })
  }
  
  if(!Array.isArray(choices) || choices.length <= 0) {
    res.status(400).send({
      error: true,
      message: "Choices is needed"
    })
  }

  try {
    const response = await Question.create({ question, choices })
    res.status(201).send(response)
  } catch(error) {
    res.status(500).send({
      error: true,
      message: "Internal error server"
    })
  }
})

app.listen(port, async() => {
  console.log(`App running on port ${port}`)
  try {
    await sequelize.authenticate();
    await Question.sync()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
