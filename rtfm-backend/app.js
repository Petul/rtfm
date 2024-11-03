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

app.get('/pages', async (req, res) => {
  try {
    let limit;
    let offset;
    (req.query.limit !== undefined ? limit = req.query.limit : limit = null);
    (req.query.offset !== undefined ? offset = req.query.offset : offset = 0);

    const result = await pool.query('SELECT id, name, description FROM pages ORDER BY id ASC LIMIT $1 OFFSET $2', [limit, offset])
    res.json(result.rows)
  }
  catch (err) {
    console.log(err)
    res.status(200)
  }
})

app.get('/search', async (req, res) => {
  const query = req.query.q;
  let limit;
  (req.query.limit !== undefined ? limit = req.query.limit : limit = 10);
  try {
    const result = await pool.query(`
      SELECT id, name, section, description
      FROM pages
      WHERE name ILIKE '%' || $1 || '%'
      ORDER BY similarity(name, $1) DESC
      LIMIT $2`, [query, limit]);
      res.json(result);

  }
  catch(err) {
    console.log(err)
    res.status(200)
  }
});

app.listen(port, () => {
  console.log(`RTFM-backend listening on port ${port}`)
})

