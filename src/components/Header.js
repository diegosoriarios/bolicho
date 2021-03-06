import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faUser, faShoppingCart, faFrown } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { navIsOpen, userIsLogged, showCart} from '../actions/click';
import { CSSTransition, transit } from 'react-css-transition'
import Modal from 'react-modal'
import Login from './Login'

let total = 0;

library.add(faBars, faTimes, faUser, faShoppingCart, faFrown)

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
            total = 0;
            return this.props.cart.cart.map((value, i) => {
                total += value.price
                console.log(total)
                return (
                    <li key={i} className="cartList">
                        <img src={value.image} alt={value.name} className="cartImage"/>
                        <div className="cartContent">
                            <p className="cartName">{value.name}</p>
                            <p className="cartPrice">{value.price}</p>
                        </div>
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
                    contentLabel="Login"
                >
                    <FontAwesomeIcon icon="times" onClick={() => this.setState({modalIsOpen: false})} />
                    <Login close={this.closeModal} />
                </Modal>
                <Modal
                    isOpen={this.state.showAccount}
                    contentLabel="Conta"
                >
                    <FontAwesomeIcon icon="times" onClick={() => this.setState({showAccount: false})} />
                    <p>Conta</p>
                </Modal>
                <Modal
                    isOpen={this.props.cartOpen}
                    contentLabel="Cart"
                >
                    <FontAwesomeIcon icon="times" onClick={() => this.props.showCart(false)} />
                    <ul>
                        {this.renderCart()}
                    </ul>
                    <p style={{display: total === 0 ? 'none' : 'block'}}>Total: {total}</p>
                    <div style={{display: total === 0 ? 'block' : 'none'}} className="cartEmpty">
                        <FontAwesomeIcon icon="frown" style={{fontSize: '10em', color: 'grey'}}/>
                        <p style={{fontSize: '1.5em', marginTop: '5%'}}>Carinho está vazio</p>
                    </div>

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