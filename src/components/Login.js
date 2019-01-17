import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsLogged } from '../actions/click';
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            loggin: true
        }
    }

    checkLogin = () => {
        axios.get('http://localhost:3004/users')
            .then(response => {
                return response.data
            })
            .then(data => {
                data.forEach(value => {
                    if(value.username === this.state.username && value.password === this.state.password){
                        this.props.userIsLogged(true)
                        this.props.close()
                    }
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    checkConfirmation = () => {
        if(this.state.password === this.state.confirm && this.state.password.length !== 0){
            return false
        }
        return true;
    }

    createAccount = () => {
        axios.post('http://localhost:3004/users', {
            "username": this.state.username,
            "password": this.state.password
        })
    }

    render(){
        if(this.state.loggin){
            return(
                <div className="modalLogin">
                    <input 
                        type="text"
                        placeholder="username"
                        value={this.state.username}
                        onChange={e => this.setState({username: e.target.value})}
                    /><br />
                    <input
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                    /><br /><br />
                    <button onClick={() => this.checkLogin()}>Login</button>
                    <p onClick={() => this.setState({loggin: false})}>Criar Conta</p>
                </div>
            );
        }else{
            return(
                <div className="modalLogin">
                    <input 
                        type="text"
                        placeholder="username"
                        value={this.state.username}
                        onChange={e => this.setState({username: e.target.value})}
                    /><br />
                    <input
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                    /><br />
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={this.state.confirm}
                        onChange={e => this.setState({confirm: e.target.value})}
                    /><br /><br />
                    <button onClick={() => this.createAccount()} disabled={this.checkConfirmation()}>Create Account</button>
                    <p onClick={() => this.setState({loggin: true})}>Voltar</p>
                </div>
            );   
        }
    }
}

const mapStateToProps = (state) => {
    return {
        opened: state.navIsOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userIsLogged: (bool) => dispatch(userIsLogged(bool))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);