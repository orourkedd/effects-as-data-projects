const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { buildRoutes } = require('./build-routes')
const functions = buildRoutes()

app.use(bodyParser.json())

//  Register your routes similar to how you normally do.
//  All of these functions are in the `functions` folder.
app.get('/', functions.helloWorld)
app.get('/content', functions.readContent)
app.put('/content', functions.writeContent)
app.get('/zen', functions.zen)

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`App listening on port ${port}!`)
})
