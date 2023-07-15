import React from "react";
import {useContext } from "react";
import {AccountContext} from "../../../context/AccountProvider";
import {styled,Box} from '@mui/material';
import HeaderMenu from "./HeaderMenu";
const Component = styled(Box)`
height : 44px;

`
const Image = styled('img')({
    height : 40,
    width : 40,
})
const Header = () => {
    const { account } = useContext(AccountContext);
   return (
        <>
            <Component>
                <img src={account.picture} alt="dp" />
                <HeaderMenu />
            </Component>
         
         
        </>
   )


}
export default Header;
