import React from 'react';
import { Button, Table} from 'react-bootstrap';
import SearchBox from './SearchBox';
import {Card} from 'material-ui';

class TableTask extends React.Component{

    render() {
        
        const { customers, message, total, offset, searchValue, onSearchChange, onDelete, onEdit, handlePrevPage, handleNextPage, 
                sortData, sortBy, sortDir, inProgress } = this.props;
        let sortDirArrow = "";
        if (sortDir !== null) {
            sortDirArrow = sortDir === 'DESC' ? ' ↓ ' : ' ↑ ';
        }

        return(
            <div style={{ padding: "50px"}}>
                <h4 style={{color:'green'}}>{message}</h4>
                {inProgress ? <img style={{ paddingLeft: "30%"}} alt="Loading..." src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> :
                
                <Card style={{ padding: "50px"}}> 
                    <div style={{float: 'left'}}>
                        <SearchBox
                            searchValue={searchValue}
                            onSearchChange={onSearchChange}
                        />
                    </div>
                    <div style={{float: 'right'}}> 
                        {offset+1 + ' to ' + (offset+10 <= total ? offset+10 : total ) + ' of ' + total + ' '}
                        <i  onClick={handlePrevPage} 
                            style={{paddingRight: '25px'}}
                            className = {offset === 0 ? "disabled" : "fa fa-chevron-left" }
                        />
                        <i  onClick={handleNextPage} 
                            className = {offset+10 >= total ? "disabled" : "fa fa-chevron-right" }
                        />
                    </div>
                    <br/> <br/> <br/>
                        {customers && customers.length > 0 
                            ?
                            <Table bordered hover>
                                <thead>
                                <tr>
                                    <th onClick={()=>sortData('id')}> 
                                        {'ID' + (sortBy === 'id' || sortBy === '-id' ? sortDirArrow : '')} 
                                    </th>
                                    <th onClick={()=>sortData('name')}> 
                                        {'Name' + (sortBy === 'name' || sortBy === '-name' ? sortDirArrow : '')} 
                                    </th>
                                    <th onClick={()=>sortData('fullName')}> 
                                        {'Full Name' + (sortBy === 'fullName' || sortBy === '-fullName' ? sortDirArrow : '')} 
                                    </th>
                                    <th onClick={()=>sortData('fixedPhone')}> 
                                        {'Phone Number' + (sortBy === 'fixedPhone' || sortBy === '-fixedPhone' ? sortDirArrow : '')} 
                                    </th>
                                    <th onClick={()=>sortData('emailAddress')}> 
                                        {'Email Address' + (sortBy === 'emailAddress' || sortBy === '-emailAddress' ? sortDirArrow : '')}
                                    </th>
                                    <th onClick={()=>sortData('team')}> 
                                        {'Team' + (sortBy === 'team' || sortBy === '-team' ? sortDirArrow : '')}
                                    </th>
                                    <th onClick={()=>sortData('companySet')}> 
                                        {'CompanySet' + (sortBy === 'companySet' || sortBy === '-companySet' ? sortDirArrow : '')}
                                    </th>
                                    <th onClick={()=>sortData('language')}> 
                                        {'Language' + (sortBy === 'language' || sortBy === '-language' ? sortDirArrow : '')}
                                    </th>
                                    <th onClick={()=>sortData('partnerCategory')}> 
                                        {'Category' + (sortBy === 'partnerCategory' || sortBy === '-partnerCategory' ? sortDirArrow : '')}
                                    </th>
                                    <th onClick={()=>sortData('partnerAddressList')}> 
                                        {'Address' + (sortBy === 'partnerAddressList' || sortBy === '-partnerAddressList' ? sortDirArrow : '')}
                                    </th>
                                    <th> Actions </th>
                                </tr>
                                </thead>
                                    <tbody>
                                        {customers.map((row) => ( 
                                            <tr key={row.id}>
                                                <td> {row.id} </td>
                                                <td> {row.name} </td>
                                                <td> {row.fullName} </td>
                                                <td> {row.fixedPhone} </td>
                                                <td> {row.emailAddress && row.emailAddress.name}</td>
                                                <td> {row.team && row.team.name} </td>
                                                <td> {row.companySet && row.companySet.name} </td>  
                                                <td> {row.language && row.language.name} </td>   
                                                <td> {row.partnerCategory && row.partnerCategory.name} </td>
                                                <td> {row.partnerAddressList.address && row.partnerAddressList.address.fullName} </td>                                                                                                                                           
                                                <td>
                                                    <Button bsStyle="primary" onClick={() => onEdit(row.id)}> Edit </Button>
                                                    <Button style={{margin:"2px"}} bsStyle="danger" onClick={() => onDelete(row.id)}>Delete</Button>
                                                </td>
                                            </tr> 
                                        ))}
                                    </tbody>
                            </Table>
                            : <h2 style={{color:'#007bff'}}>Sorry!! No records found...</h2>
                        }
                    <br/>
                </Card>
                }
            </div>
        )
    }
}

export default TableTask;