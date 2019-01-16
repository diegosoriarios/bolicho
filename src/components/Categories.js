import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { navIsOpen, selectCat, isLoading } from '../actions/click';

class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
        };
    }

    getData = () => {
        axios.get('http://localhost:3004/products')
            .then(response => {
                this.props.isLoading(false)
                return response.data
            })
            .then(data => {
                data.forEach(value => {
                    if(value.categoria === this.props.cat){
                        this.setState({
                            categories: this.state.categories.concat([{
                                "nome": value.name,
                                "image": value.image,
                                "price": value.price
                            }])
                        })
                    }
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    renderCat = () => {
        return this.state.categories.map((value, i) => {
            return (
                <li key={i} className="item">
                    <img src={value.image} alt={value.nome} />
                    <h3>{value.nome}</h3>   
                    <p>{value.price}</p>
                </li>
            );
        })
    }

    render(){
        console.log(this.state.categories)
        if(!this.props.loading){
            return(
                <div>
                    <h1>{this.props.cat}</h1>
                    <ul className="listItem">
                        {this.renderCat()}
                    </ul>
                </div>
            );
        }else{
            this.getData();
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        opened: state.navIsOpen,
        cat: state.selectCat,
        loading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isOpened: (bool) => dispatch(navIsOpen(bool)),
        selectCat: (cat) => dispatch(selectCat(cat)),
        isLoading: (bool) => dispatch(isLoading(bool))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Categories);