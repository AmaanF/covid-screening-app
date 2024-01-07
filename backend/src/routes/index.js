const express = require('express');
const authRouter = require('./auth');
const formRouter = require('./form');
const studentRouter = require('./student');
const teacherRouter = require('./teacher');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/form', formRouter);
router.use('/student', studentRouter);
router.use('/teacher', teacherRouter);

module.exports = router;
