const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.static('build'))

app.use(express.json())
// prevent errors 
const body = ""


let persons = [
  {
    "id": 1,
    "name": "Elon Musk",
    "number": "124-2142-144"
  },
  {
    "id": 2,
    "name": "Jeff Bezos",
    "number": "124-3213-4124"
  },
  {
    "id": 3,
    "name": "Jotaro Kujo",
    "number": "154-2124-4212"
  },
  {
    "id": 4,
    "name": "Dio Brando",
    "number": "124-4214-7543"
  }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.post('/api/persons', (request, response) => {
    //const maxId = persons.length > 0
    //? Math.max(...persons.map(n => n.id)) 
    // : 0
    // Implemented with math.random cause the exercise asked but better to increment. 
    const randomId = parseInt(Math.random()*1000);
    const person = request.body

    const name_check = person.name === null || person.name.trim() === ""
    const number_check = person.number === null || person.number.trim() === ""
    const duplicate_check = persons.some(p => p.name == person.name)


    if (name_check || number_check || duplicate_check) {
        response.status(404).send({error: 'name must be unique'})

      } else {
        person.id = randomId
        persons = persons.concat(person)
        response.json(person)
        
        app.use(morgan(':method :url :status :response-time ms :body'))
        morgan.token('body', (request, response) => JSON.stringify(request.body))
      }
        

  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

app.get('/info', (request, response) => {
    const requestTime = Date(0)
    const output = `Phone has info for ${persons.length} people <br><br/> ${requestTime}`
    response.send(output)
    console.log(requestTime)
}
)

const PORT = process.env.PORT || 3001
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
  // 4 hrs up to this point