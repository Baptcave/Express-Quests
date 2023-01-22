const database = require('./database');

const getMovies = (req, res) => {
  database
    .query('SELECT * FROM movies')
    .then(([movies]) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Could not retrieve data from database');
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('SELECT * FROM movies WHERE id = ?', [id])
    .then(([movies, ...rest]) => {
        if (movies[0]) {
          res.status(200).json(movies[0]);
        } else {
          res.status(404).send('Could not find movie')
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Could not retrieve data from database');
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
