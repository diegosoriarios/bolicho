import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../App.css';
import { connect } from 'react-redux';
import { showFullPage } from '../actions/click';

library.add(faTimesCircle)

class FullPage extends Component {
    state = {
        qtd: 1,
    }

    render(){
        return(
            <div className="fullPage">
                <h3>{this.props.values.name}</h3>
                <FontAwesomeIcon icon="times-circle" className="btn-close" onClick={() => {this.props.showFullPage(false); this.props.close()}} />
                <img src={this.props.values.image} alt={this.props.values.name} />
                <p>Valor: {this.props.values.price}</p>
                <span>Total: {this.props.values.price * this.state.qtd}</span>
                <input 
                    type="number" 
                    value={this.state.qtd} 
                    onChange={e => this.setState({qtd: e.target.value})} 
                    className="qtdInput"
                /><br />
                <button>Adicionar ao Carrinho</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        opened: state.navIsOpen,
        cat: state.selectCat,
        fullPage: state.showFullPage
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        showFullPage: (bool) => dispatch(showFullPage(bool))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FullPage);