import express from 'express';
import diagnosesRouter from './src/routes/diagnoses';
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
