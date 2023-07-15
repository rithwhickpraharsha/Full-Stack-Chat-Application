import React from 'react';
import {Dialog,Box,styled} from '@mui/material';
import Menu from './menu/menu'; 
import EmptyChat from './Chat/EmptyChat';
import ChatBox from './Chat/ChatBox';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
const Component = styled(Box)`
  display : flex;

`
const LeftComponent = styled(Box)`
min-width : 450px;

`
const RightComponent = styled(Box)`
padding : 0 0;


width:73%;
height : 100%;
border-left : 5px solid black;
font:30px bold ;


`
const dialogstyle ={
    height : '95%',
    width : '100%',
    maxWidth:'100%',
    maxHeight:'100%',
}



const ChatDialog = () => {


  const {person = {}} = useContext(AccountContext);


   return(
    <Dialog open ={true} PaperProps={ {sx : dialogstyle}} maxWidth={'md'}>
      <Component>
        <LeftComponent>
          
          <Menu /> 
        </LeftComponent>
        <RightComponent>
          {Object.keys(person).length ? <ChatBox/> : <EmptyChat />}
        </RightComponent>
      </Component>
    


   </Dialog>
   )

 

}
export default ChatDialog;
