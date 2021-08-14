const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

require('./db/mongoose')
const userRouter = require('./routers/user')
const artifactRouter = require('./routers/artifact')

const app = express()
app.use(cors())
// HTTP security
app.use(helmet())

// Rate Limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP please try again in an hour!'
})

app.use(limiter)
app.use(express.json())

// Sanitization
app.use(mongoSanitize())
app.use(xss())

// Prevent param pollution
app.use(hpp())

//Routers
app.use(userRouter)
app.use(artifactRouter)

module.exports = app