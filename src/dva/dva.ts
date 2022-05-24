import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { setConfig } from 'stand-admin-base';
import {
  History,
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from 'history';
import { createApp, clearApp } from './app';

setConfig({
  getConnect: () => {
    return connect as any;
  },
});

let globalApp: any = null;

export function getDvaApp() {
  return globalApp;
}

export interface IAppOptions {
  history?: 'hash' | 'browser' | 'memory' | History;
}

function buildHistroy(origHistory: string | History): History {
  let history = origHistory;

  if (typeof origHistory === 'string') {
    switch (origHistory) {
      case 'memory':
        history = createMemoryHistory();

      case 'browser':
        history = createBrowserHistory();
        break;

      case 'hash':
        history = createHashHistory();
        break;

      default:
        throw new Error(`histroy could only be 'browser', 'hash', 'memory'`);
    }
  }

  return history as History;
}

export function createGlobalApp(props: IAppOptions = {}) {
  if (globalApp) {
    console.warn(
      'DvaContainer is singleton, multiple DvaContainer will cause problems!!',
    );
    // return globalApp;
  }

  const { history: origHistory = 'browser' } = props;

  const history = buildHistroy(origHistory);

  globalApp = createApp({ history });

  setConfig({
    getHistory: () => {
      return history;
    },
    getDvaApp,
  });

  return globalApp;
}

function clearDvaApp(app: any) {
  if (!app) {
    return;
  }

  if (app !== globalApp) {
    console.warn('Seemed muliple dva app exists!');
  }

  clearApp(app);

  try {
    // 释放 app，for gc
    // immer 场景 app 是 read-only 的，这里 try catch 一下
    app = null;
  } catch (e) {
    console.error(e);
  }
}

export interface IDvaContainerProps {
  appOptions?: IAppOptions;
  children?: React.ReactNode;
}

export const DvaContainer = (props: IDvaContainerProps) => {
  const [app] = useState(() => {
    // if (globalApp) {
    //   throw new Error('DvaContainer is singleton!!');
    // }
    return createGlobalApp(props.appOptions);
  });

  useEffect(() => {
    return () => {
      clearDvaApp(app);
    };
  }, [app]);

  app.router(() => props.children);

  return app.start()();
};
