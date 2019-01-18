import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../App.css';
import { connect } from 'react-redux';
import { showFullPage, addCart } from '../actions/click';

library.add(faTimesCircle)

class FullPage extends Component {
    state = {
        qtd: 1,
    }

    addToCart = () => {
        if(this.props.userIsLogged){
            console.log('Adicionar ao carrinho da conta')
        }else{
            console.log('Adicionar ao carrinho e localStorage')
            let value = {
                "name": this.props.values.name,
                "image": this.props.values.image,
                "price": (this.props.values.price * this.state.qtd)
            }
            this.props.addCart(value)
        }
    }

    render(){
        return(
            <div className="fullPage">
                <FontAwesomeIcon icon="times-circle" className="btn-close" onClick={() => {this.props.showFullPage(false); this.props.close()}} />
                <br /><br />
                <img src={this.props.values.image} alt={this.props.values.name} />
                <h4>{this.props.values.name}</h4>
                <p className="price">R$ {this.props.values.price}</p>
                <div className="descriptionBox">
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dignissim libero. 
                        Mauris luctus arcu nec arcu ornare posuere. Mauris sed nunc a mauris congue pharetra. 
                    </p>
                    <div className="descriptionContent">
                        <span>Total: {this.props.values.price * this.state.qtd}</span>
                        <input 
                            type="number" 
                            value={this.state.qtd} 
                            onChange={e => this.setState({qtd: e.target.value})} 
                            className="qtdInput"
                        /><br />
                        <button onClick={() => this.addToCart()}>Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        opened: state.navIsOpen,
        cat: state.selectCat,
        fullPage: state.showFullPage,
        isLogged: state.userIsLogged
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        showFullPage: (bool) => dispatch(showFullPage(bool)),
        addCart: (item) => dispatch(addCart(item))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FullPage);