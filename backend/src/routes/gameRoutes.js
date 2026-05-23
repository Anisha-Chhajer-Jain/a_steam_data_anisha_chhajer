const express = require('express');
const {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/gameController');

const router = express.Router();

router
  .route('/')
  .get(getGames)
  .post(createGame);

router
  .route('/:appid')
  .get(getGame)
  .patch(updateGame)
  .delete(deleteGame);

module.exports = router;
