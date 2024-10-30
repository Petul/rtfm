const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3000

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'youruser',
  host: 'localhost',
  database: 'rtfmdb',
  password: 'yourpassword',
  port: 5432,
})

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pages', async (req, res) => {
  try {
    console.log("getting pages")
    const result = await pool.query('SELECT id, name, description FROM pages ORDER BY id ASC')
    console.log(result)
    res.json(result.rows)
  }
  catch (err) {
    console.log(err)
    res.status(200)
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
