
import express from 'express';
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  // server.get('/a', (req, res) => {
  //   console.log('express', req.path);
  //   return app.render(req, res, '/a', req.query)
  // })

  // server.get('/b', (req, res) => {
  //   return app.render(req, res, '/b', req.query)
  // })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
