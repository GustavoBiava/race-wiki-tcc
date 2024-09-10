import app from '../src/app';
import { config } from 'dotenv';

config();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
