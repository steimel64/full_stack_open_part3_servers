const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'name must be 3 characters long'],
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minLength: [8, 'Phone number must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        return /^\d{2}\d?-\d{5,}$/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number! The phone number must be in one of this format: xx-xxxxxx or xxx-xxxxx`,
    },
    required: [true, 'Phone number is required'],
  },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phonebookSchema)