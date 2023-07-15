
import React, { Component } from 'react';
 import { useContext } from 'react';
import LoginDialog from "./account/LoginDialog"
import { AppBar , Toolbar , styled ,Box } from '@mui/material';
 import { AccountContext } from '../context/AccountProvider';
import  ChatDialog from './chat/ChatDialog'
const LoginHeader = styled(AppBar)`
 height :125px;
 background-color:blue;

`
const Header = styled(AppBar)`
 height :125px;
 background-color:Red;

`

const Messenger = () => {

    const { account } = useContext(AccountContext);
   return (
      
      <Box>
            {
                  (account) ? 
                  <>
                   <Header>
                    <Toolbar>

                    </Toolbar>
                  </Header>
                  <ChatDialog />
                  </>
                  :
                  <>   
                        <LoginHeader>
                              <Toolbar>

                              </Toolbar>
                        </LoginHeader>
                        <LoginDialog />
                  </>
            
            }
      </Box>       
           
         
         
        
         
   )




}

export default Messenger;