import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

import development from './development';
import production from './production';
import test from './test';

export default { development, production, test }[process.env.NODE_ENV || 'development'] as typeof development;
