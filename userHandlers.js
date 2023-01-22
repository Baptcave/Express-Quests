const database = require('./database');

const getUsers = (req, res) => {
  database
    .query('SELECT * FROM users')
    .then(([users]) => {
        res.status(200).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Could not retrieve data from database');
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('SELECT * FROM users WHERE id = ?', [id])
    .then(([users]) => {
        if (users[0]) {
          res.status(200).json(users[0]);
        } else {
          res.status(404).send('User doesn\'t exist')
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Could not retrieve data from database');
    });
};

const postUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;

  database
    .query('INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)', [firstname, lastname, email, city, language])
    .then(([result]) => {
      res.location('/api/users/?', [result.insertId]).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error creating this user');
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
