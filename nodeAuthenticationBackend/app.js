const express = require('express');
const mongoose = require('mongoose');
const indexRoute = require('./routes/index');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api', indexRoute);



mongoose.connect('mongodb://localhost/node-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => console.log(error));