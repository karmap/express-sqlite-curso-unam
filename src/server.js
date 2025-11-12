import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import catalogRoutes from './routes/catalog.routes.js';

// TODO - Move API key to environment variable
const API_KEY = '12345abcde';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

function verifyApiKey(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const [, key] = req.headers.authorization.split(' ');
  if (key && key === API_KEY) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('App con Express y SQLite!');
});

app.use('/api/catalog', verifyApiKey, catalogRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});