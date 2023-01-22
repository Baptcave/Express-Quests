const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

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
    .then(([movies]) => {
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
