import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import store from './store'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-eaftho4knq7tvnsn.us.auth0.com"
      clientId="EIQUEWzEOwLHZ2rLh2bZaxR6nopnfdQf"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
    <NotificationContainer />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
