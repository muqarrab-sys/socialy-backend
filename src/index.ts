import App from './App';
import RoutersBuilder from './routes/Routers.builder';
import ModelsBuilder from './models/Models.builder';
import { ModelCtor } from 'sequelize-typescript';
import 'reflect-metadata';

const routers = new RoutersBuilder().modules;
const models = new ModelsBuilder().modules as unknown as Array<ModelCtor>;

new App(routers, models).start();
