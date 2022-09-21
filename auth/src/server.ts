import express from 'express';
import routes from './routes/index';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// add cors!

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

export default app;