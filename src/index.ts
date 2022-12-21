require('dotenv').config();

import App from './App';
import RouteBuilder from './routes/Routes.builder';
import ModelsBuilder from './models/Models.builder';
import { ModelCtor } from 'sequelize-typescript';

const routes = new RouteBuilder().getModules();
const models = new ModelsBuilder().getModules() as unknown as Array<ModelCtor>;

const app = new App(routes, models);

app.start();
