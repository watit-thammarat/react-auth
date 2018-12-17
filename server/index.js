const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();
const PORT = 3090;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

mongoose
  .connect(
    'mongodb://localhost/auth',
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
