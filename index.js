const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/api/persons', (request, response) => {
	response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = phonebook.find(p => p.id === id)

	if (person) {
		response.json(person)
	} else {
		response.statusMessage = "Person not found"
		response.status(404).end()
	}
})

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p>`)
})

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (phonebook.some(p => p.id === id));
  return id;
};

app.post('/api/persons', (request, response) => {
	const body = request.body

	console.log(body)

	if (!body.name || !body.number) {
		return response.status(400).json({ error: 'Bad request'})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	}

	phonebook = phonebook.concat(person)

	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	phonebook = phonebook.filter(p => p.id !== id)

	response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})