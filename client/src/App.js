import React from 'react';


import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';

function App() {
   const clientId = '660427984320-up8nfkime2ijdkmcoug45udq5hqn8r2a.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId = {clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
