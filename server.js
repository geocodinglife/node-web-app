if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const application = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

application.set('view engine', 'ejs')
application.set('views', __dirname + '/views')
application.set('layouts', 'layouts/layouts')
application.use(expressLayouts)
application.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log('Connect to Mongoose'))

application.use('/', indexRouter)

application.listen(process.env.PORT || 3000)
