import React from "react";
import { useEffect,useState,useContext  } from "react";
import {addUser, getUsers,setActiveUsers} from '../../../service/Api';
import {Box,styled,Divider} from '@mui/material';
import { AccountContext } from "../../../context/AccountProvider";

//components import
import Conversation from './Conversation';


const Component = styled(Box)`
  height : 81vh;
  overflow:overlay; 
`
const Conversations = ({text}) =>{
    const [users,setUsers] = useState([]);
    const {account,socket,setActiveUsers} =useContext(AccountContext);
     
    useEffect(()=>{
        const fecthData = async() =>{
           let response = await getUsers();
           const filteredData=response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
           setUsers(filteredData);
        }
        fecthData(); 
    }, [text]); 


    useEffect(()=>{
     socket.current.emit('addUsers',account);
     socket.current.on("getUsers",users =>{
              setActiveUsers(users);

     })
    

    },[account])
    return (
        <Component>
            {
                 users.map(user => (
                    user.sub != account.sub && 
                    <>
                    <Conversation user = {user}/>
                    <Divider />
                    </>
                 ) )
            }


        </Component>
    )
}

export default Conversations;
