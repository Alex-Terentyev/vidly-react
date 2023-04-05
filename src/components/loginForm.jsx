import React, {Component} from 'react';
import Form from './common/form';
import auth from '../services/authService';

const Joi = require('joi-browser');

class LoginForm extends Form {
    state = {
        data:{
            username: "",
            password: ""
        },
        errors:{}
    }

    // username = React.createRef();

    schema = {
        username: 
            Joi.string()
            .required()
            .label('Username'),
        password: 
            Joi.string()
            .required()
            .label('Password')
    };


    
    doSubmit = async () =>{
        try{
            const { data } = this.state;
            await auth.logIn(data.username, data.password);
            window.location = '/';
        }
        catch(ex){
            if (ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
                console.log(errors);
            }
        }
        
    }

    render() { 
        console.log(this.props.location);

        return (
            <div>
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Usename")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}
 


 
export default LoginForm;