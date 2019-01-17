import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { navIsOpen, userIsLogged, showCart} from '../actions/click';
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
            showAccount: false,
        }
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    clickUserIcon = () => {
        if(this.props.isLogged){
            this.setState({showAccount: !this.state.showAccount})
        }else{
            this.setState({modalIsOpen: !this.state.modalIsOpen})
        }
    }

    renderCart = () => {
       if(this.props.cartOpen){
            return this.props.cart.cart.map((value, i) => {
                return (
                    <li key={i}>
                        <img src={value.image} alt={value.name} />
                        <p>{value.name}</p>
                        <p>{value.price}</p>
                    </li>
                );
            })
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
                <Modal
                    isOpen={this.state.showAccount}
                    contentLabel="Example Modal"
                >
                    <FontAwesomeIcon icon="times" onClick={() => this.setState({showAccount: false})} />
                    <p>Conta</p>
                </Modal>
                <Modal
                    isOpen={this.props.cartOpen}
                    contentLabel="Example Modal"
                >
                    <FontAwesomeIcon icon="times" onClick={() => this.props.showCart(false)} />
                    {this.renderCart()}
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
                            <FontAwesomeIcon className="shoppingCart" icon="shopping-cart"  onClick={() => this.props.showCart(true)} />
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
        isLogged: state.userIsLogged,
        cartOpen: state.showCart,
        cart: state.addCart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isOpened: (bool) => dispatch(navIsOpen(bool)),
        userIsLogged: (bool) => dispatch(userIsLogged(bool)),
        showCart: (bool) => dispatch(showCart(bool))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);