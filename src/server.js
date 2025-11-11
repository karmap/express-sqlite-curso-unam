import express from 'express';
import cors from 'cors';
import catalogRoutes from './routes/catalog.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express y SQLite!');
});

app.use('/api/catalog', catalogRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});