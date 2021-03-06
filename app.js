const path = require('path');
const express = require('express');

const products=require('./src/data/products.json');
const PORT = process.env.PORT || 3000;
const app = express();
const productsRouter=require('./src/routers/productsRouter');
const adminRouter=require('./src/routers/adminRouter');
const authRouter=require('./src/routers/authRouters');
const morgan = require('morgan');
const passport=require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: 'apple' }));


require('./src/config/passport.js')(app);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products',productsRouter);
app.use('/admin',adminRouter);
app.use('/auth', authRouter);

app.get('/home', (req, res) => {
    res.render('index',{title:"ECommerce"});
  });
  
app.listen(PORT, () => {
  console.log(`connected on port `+PORT)
  });
  