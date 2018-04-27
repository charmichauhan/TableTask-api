import React, { Component } from 'react';
import PartnerForm from './Form';
import TableTask from './TableTask';
import RestAPI from '../rest.api';
import debounce from 'lodash.debounce';

const defaultEmail = {
  name: ''
}
const defaultAddress = {
  address: {
    fullName: ''
  }
}
const defaultData = {
    id: 0,
    name: '',
    fullName: '',
    fixedPhone: '',
    emailAddress: {...defaultEmail},
    team: null,  
    companySet: null,
    language: null,
    partnerCategory: null,
    partnerAddressList: {...defaultAddress},
    isCustomer: true,
}

class App extends Component {
 
  constructor(props) {
    super(props);
      this.state = {
        baseURL: 'com.axelor.apps.base.db.Partner',
        formData: {...defaultData},
        customers: [],
        teamArray: [],
        companyArray: [],
        languageArray: [],
        categoryArray: [],
        addressArray: [],
        searchValue: '',
        limit: 10,
        offset: 0,
        total: 0,
        message: '',
        sortBy: '',
        sortDir: '',
        inProgress: false,
        errorMessage: {
          name:'',
          fullName:'',
          fixedPhone:'',
          emailAddress:''
        }
    }
    this.restAPI = new RestAPI();
    this.delayGetAllData = debounce(this.getAllData, 500);
  }

  getData() {
    const {baseURL} = this.state;
    this.restAPI.fetch(baseURL, 11)
    .then(res => res.json())
    .then(result => {
      this.setState((prevState) => {
        return {customers: result.data[0]}
      });
    });
  }

  getAllData() {
    const {baseURL, offset, searchValue, limit, sortBy} = this.state;
    let options = {
      limit,
      offset,
      field: {
        fields: ["name", "fullName", "fixedPhone", "emailAddress", "team", "companySet", "language", "partnerCategory", "partnerAddressList"]
      },
    };
    if (searchValue) {
      options.data = {
        criteria: [
            { fieldName:"name", operator: 'like', value: searchValue },
            { fieldName:"fullName", operator: 'like', value: searchValue },
            { fieldName:"fixedPhone", operator: 'like', value: searchValue },
            { fieldName:"emailAddress", operator: 'like', value: searchValue },
            { fieldName:"team", operator: 'like', value: searchValue },    
            { fieldName:"companySet", operator: 'like', value: searchValue },  
            { fieldName:"language", operator: 'like', value: searchValue },
            { fieldName:"partnerCategory", operator: 'like', value: searchValue }, 
            { fieldName:"partnerAddressList", operator: 'like', value: searchValue },                                                                                                                               
        ],
        operator: 'or',
      };
    }
    if(sortBy){
      options.sortBy = [
          sortBy
      ]
    }
    this.setState({inProgress: true});
    this.restAPI.search(baseURL, {...options})
    .then((res) => res.json())
    .then((result) => 
      this.setState({
        customers: result.data, total: result.total, inProgress: false 
    }));
    console.log('resultgetData', this.state);
  }

  getTeamData() {
    const { teamArray } = this.state;
    this.restAPI.search('com.axelor.team.db.Team', teamArray)
    .then((res)=> res.json())
    .then((result)=> {
      this.setState((prevState) => {
        return {teamArray: result.data}
      });
    })
  }

  getCompanyData() {
    const { companyArray} = this.state;    
    this.restAPI.search('com.axelor.apps.base.db.Company', companyArray)
    .then((res)=> res.json())
    .then((result)=> {
      this.setState((prevState) => {
        return {companyArray: result.data}
      });
    })
  }

  getLanguage() {
    const { languageArray} = this.state;    
    this.restAPI.search('com.axelor.apps.base.db.Language', languageArray)
    .then((res)=> res.json())
    .then((result)=> {
      this.setState((prevState) => {
        return {languageArray: result.data}
      });
    })
  }

  getCategory() {
    const { categoryArray } = this.state;    
    this.restAPI.search('com.axelor.apps.base.db.PartnerCategory', categoryArray)
    .then((res)=> res.json())
    .then((result)=> {
      this.setState((prevState) => {
        return {categoryArray: result.data}
      });
    })
  }

  getAddress() {
    const { addressArray} = this.state;    
    this.restAPI.search('com.axelor.apps.base.db.PartnerAddress', addressArray)
    .then((res)=> res.json())
    .then((result)=> {
      console.log('resultaddress', result.data);
      this.setState((prevState) => {
        return {addressArray: result.data}
      });
    })
  }

  componentDidMount() {
    this.setState({ inProgress: true });
    this.restAPI.login('admin', 'admin')
      .then(() => this.getAllData())
      .then(()=>this.getTeamData())
      .then(()=>this.getCompanyData())
      .then(()=>this.getLanguage())
      .then(()=>this.getCategory())
      .then(()=>this.getAddress())
  }

  checkFormField(key, value) {
    let {errorMessage} = this.state;
    switch (key) {
      case 'name':
        let nameValid = value.match(/^[a-zA-Z]+$/);
        errorMessage.name = !value || !nameValid || value.length < 2 ? 'Please enter valid name' : ''
        break;
      case 'fullName':
        let fullNameValid = value.match(/^[a-zA-Z]+$/);
        errorMessage.fullName = !value || !fullNameValid || value.length < 2 ? 'Please enter valid fullname' : ''
        break;
      case 'fixedPhone':
        let fixedPhoneValid = value.match(/^[0-9].+$/);
        errorMessage.fixedPhone = !value || !fixedPhoneValid || value.length > 9 || value.length > 14 ? 'Please enter valid phone number' : ''        
        break;
      case 'emailAddress':
        let emailValid = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value);
        errorMessage.emailAddress = !value || !emailValid ? 'Please enter valid email' : ''
        break;
      default:
        break;
    }
    this.setState({errorMessage});
    return errorMessage;
  }

  formIsValid() {
    let {formData, errorMessage} = this.state;
    errorMessage = this.checkFormField('name', formData.name);
    errorMessage = this.checkFormField('fullName', formData.fullName);
    errorMessage = this.checkFormField('fixedPhone', formData.fixedPhone);
    errorMessage = this.checkFormField('emailAddress', formData.emailAddress);
    this.setState({ errorMessage });
    return Object.keys(errorMessage).every(x => !errorMessage[x]);
  }

  onChange(key, value) {
    const {formData} = this.state;
    formData[key] = value;
    console.log('formData', formData);
    console.log('address==', formData.partnerAddressList.address.fullName);
    this.setState({formData}, ()=>this.checkFormField(key, value));
  }

  onSearchChange(value){
    this.setState({ searchValue: value, offset: 0}, () => this.delayGetAllData());
  }
  
  handlePrevPage() {
    const {offset, limit } = this.state;
    const newOffset = Math.floor(offset - limit);
    this.setState({ offset: newOffset}, () => this.getAllData());
  }

  handleNextPage() {
    const { offset, limit } = this.state;
    const newOffset = Math.floor(offset + limit);
    this.setState({ offset: newOffset}, () => this.getAllData());
  }

  findIndex(id) {
    const {customers} = this.state;
    return customers.findIndex(i => i.id === id );
  }
     
  onEdit(id) {
    const {customers} = this.state;
    const findIndex = this.findIndex(id);
    this.setState({ formData: {...customers[findIndex]} });
  }

  onDelete(id) {
    debugger;
    const {baseURL, customers, total} = this.state;
    this.setState({inProgress: true});
    const findIndex = this.findIndex(id);
    this.restAPI.delete(baseURL, id)
    .then(res => res.json())
    .then(result => {
      customers.splice(findIndex, 1);
      this.setState(()=>{
        return {customers: [...customers], message: 'Record deleted successfully!!', total: total-1, inProgress: false }});
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {customers, formData, baseURL, total} = this.state;
    if (this.formIsValid()) {
      this.setState({inProgress: true}); 
      if(formData.id){
        //edit
        const formIndex = this.findIndex(formData.id);
        customers[formIndex] = formData;
        this.restAPI.update(baseURL, customers[formIndex], formData.id)
        .then(res => res.json())
        .then(result => {
          this.setState({
            customers: [...customers], formData: {...defaultData}, message: 'Record updated successfully!!', inProgress: false 
          });
        });
      }  
      else{ 
        //add
        this.restAPI.add(baseURL, formData)
        .then(res => res.json())
        .then(result => {
          this.setState({
            customers: [result.data[0], ...customers], formData: {...defaultData}, total: total+1, message: 'Record submitted successfully!!', inProgress: false 
          });
        });
      }
    }
  } 
  
  resetForm () {
    this.setState({formData: defaultData})
  }

  sortData(key) {
    let {sortBy} = this.state;
    if(sortBy === key){
      this.setState({sortDir: 'DESC', sortBy: '-'+key}, ()=> this.getAllData());
    }
    else {
      this.setState({sortDir: 'ASC', sortBy: key}, ()=> this.getAllData())
    }
  }

  render() {
    const {formData, customers, searchValue, message, offset, total, sortBy, sortDir, inProgress, errorMessage, teamArray, 
      companyArray, languageArray, categoryArray, addressArray} = this.state;

    return (
      <div>
          <PartnerForm 
            formData={formData}
            errorMessage = {errorMessage}
            teamArray={teamArray}
            companyArray={companyArray}
            languageArray={languageArray}
            categoryArray={categoryArray}
            addressArray={addressArray}
            onChange={(key, value)=>this.onChange(key, value)}
            onSubmit={(e)=>this.onSubmit(e)}
            resetForm={()=>this.resetForm()}
          />
          <TableTask 
            customers={customers}
            searchValue={searchValue}
            message={message}
            offset={offset}
            total={total}
            sortBy={sortBy}
            sortDir={sortDir}
            inProgress={inProgress}
            handlePrevPage={()=>this.handlePrevPage()}
            handleNextPage={()=>this.handleNextPage()}
            onSearchChange={(value)=>this.onSearchChange(value)} 
            onDelete={(id)=>this.onDelete(id)}
            onEdit={(id)=>this.onEdit(id)}
            sortData={(key)=>this.sortData(key)}
          />
      </div>
    );
  }
}

export default App;
