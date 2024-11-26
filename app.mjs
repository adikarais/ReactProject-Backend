import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import CategoryRoutes from './routes/CategoryRoutes.mjs'


const app = express()
const PORT = 5000

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
  res.send(`<h1>Hello world</h1>`)
})

// Wrapping routing dg app.use()
app.use('/api/v1/categories', CategoryRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} http://localhost:${PORT}/`)
})