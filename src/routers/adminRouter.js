const express = require('express');
const { MongoClient } = require('mongodb');
const debug=require('debug')('app:adminRouter');
const products=require('../data/products.json');

const adminRouter=express.Router();

adminRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://yara:1234@ecommerce-itworx.egpyglu.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'Ecommerce-Itworx';
    (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongo DB');
    
          const db = client.db(dbName);
    
          const response = await db.collection('products').insertMany(products);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      })();
    });
    
    module.exports = adminRouter;
    