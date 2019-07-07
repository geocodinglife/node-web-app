const  express = require('express')
const router   = express.Router()
const Author   = require('../models/author')

// All authors routes
router.get('/', async (request, respond) => {
  let searchOptions = {}
  if (request.query.name != null && request.query.name !== '') {
    searchOptions.name = new RegExp(request.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    respond.render('authors/index', { authors: authors, searchOptions: request.query  })
  } catch (error) {
    respond.redirect('/')
  }
})

//New author
router.get('/new', (request, respond) => {
  respond.render('authors/new', { author: new Author() })
})

// Create authors route
router.post('/', async (request, respond) => {
  const author = new Author({
    name: request.body.name
  })

  try {
    const newAuthor = await author.save()  
    // respond.redirect(`authors/${newAuthor.id`)
    respond.redirect(`authors`)
  } catch (error) {
    respond.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})

module.exports = router