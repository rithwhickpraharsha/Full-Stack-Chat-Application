import React from 'react';
import { createContext,useState,useRef ,useEffect} from 'react';

import {io} from 'socket.io-client';


export const AccountContext = createContext(null);
//we face error here it could nt read props of null so we initialized to null if account is null

//takes initial values we given null

const AccountProvider = ({ children }) => {

    const [account, setAccount] = useState();
    const [person,setPerson] =useState({});
    const [activeUsers,setActiveUsers] = useState([]);
    const [newMessageFlag,setNewMessageFlag] = useState(false);
    const socket = useRef();
    useEffect(()=>{
     socket.current = io('ws://localhost:9000')
    },[])

   return (
    //account and set account are for saving account information
    <AccountContext.Provider value ={{
      account,
      setAccount,
      person,
      setPerson,
      socket,
      activeUsers,
      setActiveUsers,
      newMessageFlag,
      setNewMessageFlag
    }}>
          {children}

    </AccountContext.Provider>




   )





}

export default AccountProvider;
