import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { navIsOpen, userIsLogged } from '../actions/click';
import { CSSTransition, transit } from 'react-css-transition'
import Modal from 'react-modal'
import Login from './Login'

library.add(faBars, faTimes, faUser, faShoppingCart)

Modal.setAppElement('#root')

CSSTransition.childContextTypes = {
    // this can be empty
}   

class Header extends Component {
    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
        }
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    clickUserIcon = () => {
        if(this.props.isLogged){
            console.log('LOGADO')
        }else{
            this.setState({modalIsOpen: !this.state.modalIsOpen})
        }
    }

    render(){
        return(
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Example Modal"
                >
                    <FontAwesomeIcon icon="times" onClick={() => this.setState({modalIsOpen: false})} />
                    <Login close={this.closeModal} />
                </Modal>
                <CSSTransition
                    defaultStyle={{ transform: "translate(0, 0)" }}
                    enterStyle={{ transform: transit("translate(50%, 0)", 500, "ease-in-out") }}
                    leaveStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
                    activeStyle={{ transform: "translate(50%, 0)" }}
                    active={this.props.opened}
                    className="header"
                >
                    <div>
                        <div className="left" onClick={() => this.props.isOpened(!this.props.opened)}>
                            <FontAwesomeIcon icon={!this.props.opened ? "bars" : "times"} />
                        </div>
                        <h3>Buyt</h3>
                        <div className="right" >
                            <FontAwesomeIcon className="shoppingCart" icon="shopping-cart" />
                            <FontAwesomeIcon className="user" icon="user" onClick={() => this.clickUserIcon()} />
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        opened: state.navIsOpen,
        isLogged: state.userIsLogged
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isOpened: (bool) => dispatch(navIsOpen(bool)),
        userIsLogged: (bool) => dispatch(userIsLogged(bool))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);