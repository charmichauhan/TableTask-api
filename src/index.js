import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Task/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
,
 document.getElementById('root'));