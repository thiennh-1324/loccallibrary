import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server node listening on http://localhost:${port}`)
})
