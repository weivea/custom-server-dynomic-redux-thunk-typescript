import React, { useEffect } from 'react';
import {
  countReducer,
  CountState,
  // CounterAction,
  serverRenderClock,
  startClock
} from '../stores/counter/counterReducer';
import { useSelector, useDispatch } from 'react-redux';
import { NextPageWithRedux } from '../stores/with-redux-store';
import { reducerManager } from '../stores/store';
import Layout from 'pcomponents/Layout';
import Clock from '../pcomponents/clock';
import Counter from '../pcomponents/counter';
import { StoreNamespace } from '../stores/const';

// 类型接口定义
interface CounterPageProps {}

// 实际代码
reducerManager.add(StoreNamespace.counter, countReducer);

const Page: NextPageWithRedux<CounterPageProps> = () => {
  const namespaceKey = StoreNamespace.counter;
  const counter = useSelector<{ [namespaceKey]: CountState }, CountState>(
    state => state[namespaceKey]
  );
  const dispatch = useDispatch();
  const { lastUpdate, light } = counter;

  useEffect(() => {
    const timer = startClock(dispatch);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Layout title="counter">
      <div>
        <Clock lastUpdate={lastUpdate} light={light} />
        <Counter />
      </div>
    </Layout>
  );
};

Page.getInitialProps = async ({ isServer, store }) => {
  (store.dispatch as any)(serverRenderClock(isServer));

  return {};
};

export default Page;
