'use babel';

import choo from 'choo';
import {models} from './app/models';
import routes from './app/routes';

const app = choo();

app.model(models);
app.router(routes);

export default app;
