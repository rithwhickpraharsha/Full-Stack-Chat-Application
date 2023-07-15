import React from "react";
import {Search as SearchIcon } from '@mui/icons-material';

import {InputBase,Box,styled} from '@mui/material';

const Component = styled(Box)`
background : #fff;
height :45px;
margin-top :60px;
bordor-bottom : 1px solid #F2F2F2;

`
const Comp2 = styled(Box)`
display:flex;
`
const Barcol=styled(Box)`
background-color:grey;
`

const Search = ({setText}) => {

  return (
      <Component>
            <Comp2>
                <Box>
                  <SearchIcon />
                </Box>
                <Barcol>
                <InputBase placeholder="Search or Start new chat"
                 onChange={(e)=>setText(e.target.value)}
                />
                </Barcol>



            </Comp2>


      </Component>



  )


}
export default Search;