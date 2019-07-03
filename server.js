if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express        = require('express')
const mongoose       = require('mongoose')
const application    = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser     = require('body-parser')
const indexRouter    = require('./routes/index')

const authorRouter   = require('./routes/authors')

application.set('view engine', 'ejs')
application.set('views', __dirname + '/views')
application.set('layouts', 'layouts/layouts')
application.use(expressLayouts)
application.use(express.static('public'))
application.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log('Connect to Mongoose'))

application.use('/', indexRouter)
application.use('/authors', authorRouter)

application.listen(process.env.PORT || 3000)
