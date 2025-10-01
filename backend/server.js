const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/tasks', taskRoutes);
const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;
// MongoDB connection
mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ✅ Export both app and server
let server;
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { app, server };
