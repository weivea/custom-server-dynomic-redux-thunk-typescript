import App from 'next/app'
import React from 'react'
import withRedux, {AppProps} from '../stores/with-redux-store'
import { Provider } from 'react-redux'
import { initStore } from '../stores/store';

export default withRedux(initStore)(
  class MyApp extends App<AppProps> {
    render() {
      const { Component, pageProps, store } = this.props;
      console.log('MyApp', this.props)
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      );
    }
  }
);


