import React from 'react';
import Form from './common/form';
import * as userService from '../services/userService';
import withRouter from './common/withRouter';
import auth from '../services/authService';

const Joi = require('joi-browser');

class RegistrationForm extends Form {
    state = { 
        data: {
            email: "",
            password: "",
            name: ""
        },

        errors:{}
     } 

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label('Email'),
        password: Joi.string()
            .required()
            .min(8)
            .label('Password'),
        name: Joi.string()
            .required()
            .label('Name')
    }



    doSubmit = async () =>{
        try{
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';

        }
        catch(ex){
            if (ex.response && ex.response.status === 400){
                const errors = {...this.state.errors}
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() { 
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('email', 'Email')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderButton('Register')}
            </form>
        );
    }
}
 
export default withRouter(RegistrationForm);