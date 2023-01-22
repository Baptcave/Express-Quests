const { query } = require('./database');
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

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query('INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)', [title, director, year, color, duration])
    .then(([result]) => {
      res.location('/api/movies/?', [result.insertId]).sendStatus(201)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not save movie');
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
