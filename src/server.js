import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import catalogRoutes from './routes/catalog.routes.js';
import verifyApiKey from './middlewares/verifyApiKey.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

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