const express = require("express")
const bodyParser = require('body-parser')

const app = express()
const port = 3000

// Set up body parsers
app.use(bodyParser.json());
// Extend url parser urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

const data = [
  {
    "question": "Favourite programming language?",
    "published_at": "2015-08-05T08:40:51.620Z",
    "choices": [
      {
        "choice": "Swift",
        "votes": 2048
      }, 
      {
        "choice": "Python",
        "votes": 1024
      },
      {
        "choice": "Objective-C",
        "votes": 512
      },
      {
        "choice": "Ruby",
        "votes": 256
      }
    ]
  }
]

app.get('/questions', (req, res) => {
  res.send(data)
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

  res.send({
    "question": "Favourite programming language?",
    "published_at": "2015-08-05T08:40:51.620Z",
    "choices": [
      {
        "choice": "Swift",
        "votes": 0
      }, {
        "choice": "Python",
        "votes": 0
      }, {
        "choice": "Objective-C",
        "votes": 0
      }, {
        "choice": "Ruby",
        "votes": 0
      }
    ]
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})