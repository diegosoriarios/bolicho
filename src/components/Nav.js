import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navIsOpen, selectCat, isLoading } from '../actions/click';
import { CSSTransition, transit } from 'react-css-transition'
import axios from 'axios'

class Nav extends Component {
    state = {
        categories: []
    };

    componentDidMount = () => {
        axios.get('http://localhost:3004/products')
            .then(response => {
                return response.data
            })
            .then(data => {
                data.forEach(value => {
                    this.setState({
                        categories: this.state.categories.concat(value.categoria)
                    })
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    renderCat = () => {
        var sorted_arr = this.state.categories.slice().sort();
        var results = []
        for (var i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] !== sorted_arr[i]) {
                results.push(sorted_arr[i]);
            }
        }
        return results.map((value, i) => {
            return <li key={i} className="catList" onClick={() => {this.props.selectCat(value); this.props.isOpened(false); this.props.isLoading(true)}}>{value}</li>
        })
    }

    render(){
        if(this.state.categories !== undefined){
            return(
                <CSSTransition
                    defaultStyle={{ transform: "translate(-100%, 0)" }}
                    enterStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
                    leaveStyle={{ transform: transit("translate(-100%, 0)", 500, "ease-in-out") }}
                    activeStyle={{ transform: "translate(0, 0)" }}
                    active={this.props.opened}
                    className="nav"
                >
                    <div>
                        <img src="http://lorempixel.com/640/480/food" alt="Img" />
                    </div>
                    <h3>Categories</h3>
                    <ul>
                        {this.renderCat()}
                    </ul>
                </CSSTransition>
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
        isOpened: (bool) => dispatch(navIsOpen(bool)),
        selectCat: (cat) => dispatch(selectCat(cat)),
        isLoading: (bool) => dispatch(isLoading(bool))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Nav);