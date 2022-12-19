import express  from 'express'
import cors from 'cors'
import camelizedKeys from './middlewares/humps.js'
import onRequest from './middlewares/on-request.js'

const app = express()

app.use(express.urlencoded({extended: true}))
// app.use(express.json())
app.use(cors())
app.use(camelizedKeys())
app.use(onRequest())

export default app