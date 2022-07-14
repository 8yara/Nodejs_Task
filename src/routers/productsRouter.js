const express = require('express');

const { MongoClient, ObjectId } = require('mongodb');
const debug=require('debug')('app:productsRouter');

const productsRouter = express.Router();

const products=require('../data/products.json');

productsRouter.route('/').get((req,res)=>{
  const url = 'mongodb+srv://yara:1234@ecommerce-itworx.egpyglu.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'Ecommerce-Itworx';
    (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongo DB');
    
          const db = client.db(dbName);
    
          const products = await db.collection('products').find().toArray();
          res.render('products',{
            products,
          })
      
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      })();

});

productsRouter.route('/:id').get((req,res)=>{
  const id=req.params.id;
  const url = 'mongodb+srv://yara:1234@ecommerce-itworx.egpyglu.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'Ecommerce-Itworx';
  (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
  
        const product = await db.collection('products').findOne({_id: new ObjectId(id)})
        res.render('product',{
          product,
         })
    
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();

});

module.exports = productsRouter;
