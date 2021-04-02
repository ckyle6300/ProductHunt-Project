const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const splashRouter = require('./splash');
const profileRouter = require('./profile');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/splash', splashRouter);

router.use('/profile', profileRouter)

module.exports = router;