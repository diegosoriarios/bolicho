import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { navIsOpen } from '../actions/click';
import { CSSTransition, transit } from 'react-css-transition'

library.add(faBars, faTimes, faUser, faShoppingCart)

CSSTransition.childContextTypes = {
    // this can be empty
}   

class Header extends Component {
    render(){
        return(
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
                        <FontAwesomeIcon className="user" icon="user" />
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        opened: state.navIsOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isOpened: (bool) => dispatch(navIsOpen(bool)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);