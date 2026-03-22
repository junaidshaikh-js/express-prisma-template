import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '#/routes/index.ts';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express-Prisma API template!' });
});

app.use('/api', routes);

export default app;
