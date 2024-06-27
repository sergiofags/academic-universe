const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.js');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
