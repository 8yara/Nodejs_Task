const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const { username,email, password } = req.body;
  const url = 'mongodb+srv://yara:1234@ecommerce-itworx.egpyglu.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'Ecommerce-Itworx';

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const user = { username,email, password };
      const results = await db.collection('users').insertOne(user);
      debug(results);
      console.log(results.ops)
      req.login(results.ops[0], () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );
authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
