import { env } from './config/env.js';
import app from './app.js';

app.listen(env.PORT, () => console.log(`server is runnings on port ${env.PORT}`));
