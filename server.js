import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running...');
});

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});