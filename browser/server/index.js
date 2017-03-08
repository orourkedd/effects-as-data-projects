const express = require('express')
const app = express()
const { get } = require('simple-protocol-http')

app.get('/users/:username/repos', function (req, res, next) {
  get(`https://api.github.com/users/${req.params.username}/repos`).then((r) => {
    res.send(r)
  })
  .catch((e) => {
    res.send(e)
  })
})

app.use(express.static('build'))

app.listen(3000, function () {
  console.log('App listening on port 3000')
})
