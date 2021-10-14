const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(cors());

// DATABASE CONNECTION
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {})
  .then(() => {
    console.log('Database connected successfully...');
  })
  .catch((err) => {
    console.log(err);
  });

// ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/email', emailRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at port ${port}....`);
});
