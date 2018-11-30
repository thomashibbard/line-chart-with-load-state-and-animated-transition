const express = require('express')
const axios = require('axios')
const cors = require('cors')

const { generateMockData } = require('./controllers')

const port = 8890

const app = express()
app.use(cors())

app.get('/api/data/:howMany', (request, response) => {
  const t = setTimeout(() => {
    response.json({ data: generateMockData(request.params.howMany) })
    clearTimeout(t)
  }, 3000)
})

app.listen(port, () => {
  console.log(`server listening@${port}`)
})
