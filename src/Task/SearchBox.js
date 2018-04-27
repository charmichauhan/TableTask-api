import React from 'react';
import { FormControl } from 'react-bootstrap';

class SearchBox extends React.Component{
   
    render(){
        const { searchValue, onSearchChange} = this.props;

        return(
            <div>
                <div className="search">
                    <FormControl placeholder="Search Here..." onChange={(e)=>onSearchChange(e.target.value)} value={searchValue} autoFocus/>
                </div>
           </div>
        )
    }
}

export default SearchBox;
