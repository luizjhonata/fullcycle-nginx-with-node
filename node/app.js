const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');

  connection.query('DROP TABLE IF EXISTS people;', err => {
    if (err) {
      console.error('Error dropping table:', err);
      connection.end();
      return;
    }
  console.log('Table dropped if it existed');

    const createDb = `
      CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL);
    `;

    connection.query(createDb, (err) => {
      if (err) throw err;
      console.log('Table created or already exists');

      const sql = `
        INSERT INTO people (name) VALUES 
          ('Jhonata Luiz'), 
          ('Wesley Willians'), 
          ('Luiz Carlos')
        ON DUPLICATE KEY UPDATE name = VALUES(name);`;
      connection.query(sql, (err) => {
        if (err) throw err;
        console.log('Record inserted');

        // Now that the table is created and record is inserted, handle requests
        app.get('/', (req, res) => {
          connection.query('SELECT * FROM people', (err, results) => {
            if (err) throw err;

            const names = results.map(row => row.name).join('<br>');
            res.send(`<h1>Full Cycle Rocks!</h1><br><h2>- Lista de nomes cadastrada no banco de dados.</h2><br>${names}`);
          });
        });

        app.listen(port, () => {
          console.log(`Node.js server running on port ${port}`);
        });
      });
    });
  });
});

process.on('exit', () => {
  connection.end();
});
