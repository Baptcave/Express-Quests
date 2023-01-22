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

module.exports = {
  getUsers,
  getUserById,
};
