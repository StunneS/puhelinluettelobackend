const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use(express.json())

app.use(cors())

morgan.token('data', (req, res) => {
    return(
        JSON.stringify(req.body)
    )
})
let persons = [
    {
      "name": "Ada Lovelace",
      "number": "677-403922",
      "id": 1
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 2
    },
    {
      "name": "Kerry Bradshaw",
      "number": "099-384844",
      "id": 3
    },
    {
        "name": "Del Ete",
        "number": "099-366666",
        "id": 4
    }
  ]
app.post('/api/persons', (req, res) => {
    const person = req.body
    if(!person.name || !person.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    const found = persons.find( pers => pers.name === person.name)
    if(found) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    person.id = Math.floor(Math.random()*1000)
    persons = persons.concat(person)

    res.json(person)
})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people </p> <br /> ${new Date()}`)
        
})
app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(pers => pers.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(pers => pers.id != id)
    res.status(204).end()
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})