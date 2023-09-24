require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.static('build'))

app.use(express.json())
const Person = require('./models/person')


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body

  const query = { 'name': person.name }

  const name_check = person.name === null || person.name.trim() === ''
  const number_check = person.number === null || person.number.trim() === ''
  const duplicate_check = Person.find({ query }).count() > 0 ? true : false

  if (name_check || number_check || duplicate_check) {
    response.status(404).send({ error: 'name must be unique' })
  } else {
    const new_person = new Person({
      name: person.name,
      number: person.number
    })

    new_person.save().then(savedPerson => {
      response.json(savedPerson)

      app.use(morgan(':method :url :status :response-time ms :body'))
      morgan.token('body', (request) => JSON.stringify(request.body))
    })
      .catch(error => next(error))
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))


})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`<div>
            <p>Phonebook has info for ${count} people</p>
            <p>${Date(0)}</p>
        </div>`)
    })
    .catch(error => next(error))
}

)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// 3.1 complete 9/18
// 3.2 complete 9/18
// 3.3 complete 9/18
// 3.4 complete 9/18
// 3.5 complete 9/18
// 3.6 complete 9/18
// 3.7 complete 9/18
// 3.8 complete 9/18
// 3.9 complete 9/19
// 3.10 complete 9/19
// 3.11 complete 9/19
// 3.12 complete 9/24
// 3.13 complete 9/24
// 3.14 complete 9/24
// 3.15 complete 9/24
// 3.16 complete 9/24
// 3.17 complete 9/24
// 3.18 complete 9/24
// 8 hrs up to this point