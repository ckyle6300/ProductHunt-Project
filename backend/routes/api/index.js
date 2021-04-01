const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const splashRouter = require('./splash');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/splash', splashRouter);

module.exports = router;