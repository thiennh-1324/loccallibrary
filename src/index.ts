import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { AppDataSource } from '@/config/data-source'
import route from '@/routes'

import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'
import { namespaces } from '@/utils/get-namespace-locales'

const app = express()
dotenv.config()

const port = process.env.PORT || 3000

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'vi'],
    backend: {
      loadPath: path.join(__dirname, 'locales/{{ns}}/{{lng}}.json')
    },
    ns: namespaces,
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: ['cookie']
    }
  })

app.use(middleware.handle(i18next))

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/', route)

// ConnectDb
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection successfully')
  })
  .catch((err) => {
    console.error('Error during Datasource initialization: ', err)
  })

app.listen(port, () => {
  console.log(`Server node listening on http://localhost:${port}`)
})
