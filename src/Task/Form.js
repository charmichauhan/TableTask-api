import React from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Card } from 'material-ui';
import  Select from 'react-select';
import 'react-select/dist/react-select.css';

class PartnerForm extends React.Component{

    render() {
        const {formData, onChange, onSubmit, errorMessage, resetForm, teamArray, companyArray, languageArray, categoryArray, addressArray} = this.props;
        
        return(
            <div style={{padding:"50px"}}>
                <Card style={{padding:"50px"}}>
                    <Form onSubmit={(e)=>onSubmit(e)}>

                        <FormGroup>
                            <ControlLabel> Name: </ControlLabel>
                            <div className={errorMessage.name && errorMessage.name.length > 0 ? 'error' : ''}>
                                <FormControl type="text" onChange={(e)=>onChange('name', e.target.value)} value={formData.name} autoFocus />
                            </div>
                            {errorMessage.name && errorMessage.name.length > 0 ? <span style={{color: 'red'}}>{errorMessage.name}</span> : "" }
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Fullname: </ControlLabel>
                            <div className={errorMessage.fullName && errorMessage.fullName.length > 0 ? 'error' : ''}>
                                <FormControl type="text" onChange={(e)=>onChange('fullName', e.target.value)} value={formData.fullName}/>
                            </div>
                            {errorMessage.fullName && errorMessage.fullName.length > 0 ? <span style={{color: 'red'}}>{errorMessage.fullName}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Phone Number: </ControlLabel>
                            <div className={errorMessage.fixedPhone && errorMessage.fixedPhone.length > 0 ? 'error' : ''}>
                                <FormControl type="text" onChange={(e)=>onChange('fixedPhone', e.target.value)} value={formData.fixedPhone}/>
                            </div>
                            {errorMessage.fixedPhone && errorMessage.fixedPhone.length > 0 ? <span style={{color: 'red'}}>{errorMessage.fixedPhone}</span> : "" }
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Email Address: </ControlLabel>
                            <div className={errorMessage.emailAddress && errorMessage.emailAddress.length > 0 ? 'error' : ''}>
                                <FormControl type="text" onChange={(e)=>onChange('emailAddress', e.target.value)} value={formData.emailAddress.name} />
                            </div>
                            {errorMessage.emailAddress && errorMessage.emailAddress.length > 0 ? <span style={{color: 'red'}}>{errorMessage.emailAddress}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Team: </ControlLabel>
                        <Select
                            valueKey='id'                            
                            labelKey='name'
                            options={teamArray}
                            onChange={(e)=>onChange('team', e)}
                            value={formData.team}
                        />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Companies associated to: </ControlLabel>
                        <Select
                            valueKey='id'                            
                            labelKey='name'
                            options={companyArray}
                            onChange={(e)=>onChange('companySet', e)}
                            value={formData.companySet}
                            multi={true}
                            removeSelected={false}
                        />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Language: </ControlLabel>
                        <Select
                            valueKey='id'                            
                            labelKey='name'
                            options={languageArray}
                            onChange={(e)=>onChange('language', e)}
                            value={formData.language}
                        />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Category: </ControlLabel>
                        <Select
                            valueKey='id'                            
                            labelKey='name'
                            options={categoryArray}
                            onChange={(e)=>onChange('partnerCategory', e)}
                            value={formData.partnerCategory}
                        />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel> Address: </ControlLabel>
                        <Select
                            valueKey='id'                            
                            labelKey='name'
                            options={addressArray}
                            onChange={(e)=>onChange('partnerAddressList', e)}
                            value={formData.partnerAddressList.address.fullName}
                        />
                        </FormGroup>

                        <br/><br/>
                        <Button 
                            // disabled =  {
                                            // formData.name.length < 2 || formData.fullName.length < 2 || formData.fixedPhone.length < 9
                                            // || formData.name === "" || formData.fullName === "" || formData.fixedPhone === "" 
                                            // || formData.emailAddress.name === "" || !new RegExp(/^\d+$/).test(formData.fixedPhone)
                                        // }
                            bsStyle="success" 
                            type="submit" 
                        > Submit
                        </Button>
                        <Button style={{marginLeft:"10px"}} onClick={resetForm}>Reset</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default PartnerForm;