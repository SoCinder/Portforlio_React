require('dotenv').config();
const express = require('express');
const helmet= require('helmet');
const cors= require('cors');
const morgan= require('morgan');
const rateLimit= require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler= require('./middlewares/errorHandler');

const authRoutes= require('./routes/auth.routes');
const userRoutes= require('./routes/user.routes');
const contactRoutes= require('./routes/contact.routes');
const projectRoutes= require('./routes/project.routes');
const educationRoutes = require('./routes/education.routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
  })
);

app.get('/', (req, res) => {
  res.status(200).json({
    message: ' Welcome to Portfolio API!',
    endpoints: [
      '/api/auth',
      '/api/users',
      '/api/contacts',
      '/api/projects',
      '/api/education'
    ],
    status: 'API is live and connected'
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/education', educationRoutes);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
