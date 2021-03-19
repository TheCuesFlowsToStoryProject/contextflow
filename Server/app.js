const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const {PORT} = config;
// routes
const AnchorRoutes = require('./routes/anchor');
const AuthUserRoutes = require('./routes/auth-user');
const WordPhraseRoutes = require('./routes/word-phrase');
const ContextflowRoutes = require('./routes/contextflow');

const {MONGO_URI, MONGO_DB_NAME} = config;

const app = express();
app.use(cors());
app.use(express.json());
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/', AnchorRoutes);
app.use('/', AuthUserRoutes);
app.use('/', WordPhraseRoutes);
app.use('/', ContextflowRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
