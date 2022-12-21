require('dotenv').config()

import App from './App';
import RouteBuilder from './routes/Routes.builder';

const routes = new RouteBuilder().getModules();
const app = new App(routes);

app.start();
