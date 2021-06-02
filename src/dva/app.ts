import dva from 'dva';
// @ts-ignore
import createLoading from 'dva-loading';
import { History } from 'history';

export function createApp(options: { history?: History } = {}) {
  const app = dva({
    ...(options || {}),
  });

  app.use(createLoading());

  return app;
}

export function clearApp(app: any) {
  if (!app) {
    return;
  }

  app._models.forEach((model: any) => {
    app.unmodel(model.namespace);
  });
  app._models = [];
}
