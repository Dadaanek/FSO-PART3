const express = require('express')
const app = express()

let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/info', (request, response) => {
    const arrLength = phonebook.length
    response.send(
            `<p>Phonebook has info for ${arrLength} people</p>
            <p>${Date().toString()}</p>`
        )
})

app.get('/api/persons/:id', (request, response) => {
    // console.log(request.params.id)
    const phone = phonebook.find(n => n.id === Number(request.params.id))
    if(phone) {
        response.json(phone)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const idNum = Number(request.params.id)
    phonebook = phonebook.filter(num => num.id !== idNum)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)