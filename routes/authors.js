const  express = require('express')
const router = express.Router()
const Author = require('../models/author')
// All authors routes
router.get('/', (request, respond) => {
  respond.render('authors/index')
})

//New author
router.get('/new', (request, respond) => {
  respond.render('authors/new', { author: new Author()})
})

// Create authors route
router.post('/', (request, respond) => {
  const author = new Author({
    name: request.body.name
  })
  author.save((error, newAuthor) => {
    if (error) {
      respond.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    } else {
      // respond.redirect(`authors/${newAuthor.id`)
      respond.redirect(`authors`)
    }
  })
})

module.exports = router