import React, { Component } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Categories from './components/Categories'
import './App.css';
import axios from 'axios'
import { connect } from 'react-redux';
import { navIsOpen, selectCat } from './actions/click';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      productsExample: [],
      listProd: [],
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3004/products')
        .then(response => {
          return response.data
        })
        .then(data => {
          let rand = [
            Math.floor(Math.random() * data.length),
            Math.floor(Math.random() * data.length),
            Math.floor(Math.random() * data.length),
            Math.floor(Math.random() * data.length)
          ]
          this.setState({
            productsExample: [
              {
                "name": data[rand[0]].name,
                "price": data[rand[0]].price,
                "image": data[rand[0]].image
              },
              {
                "name": data[rand[1]].name,
                "price": data[rand[1]].price,
                "image": data[rand[1]].image
              },
              {
                "name": data[rand[2]].name,
                "price": data[rand[2]].price,
                "image": data[rand[2]].image
              },
              {
                "name": data[rand[3]].name,
                "price": data[rand[3]].price,
                "image": data[rand[3]].image
              }
            ]
          })
        })
        .catch(err => {
          console.error(err)
        })
  }

  renderExample = () => {
    if(this.props.cat.length === 0){
      return this.state.productsExample.map((value, i) => {
        return (
          <li key={i}>
            <h3>{value.name}</h3>
            <img src={value.image} alt={value.name} />
            <p>{value.price}</p>
          </li>
        );
      })
    }else{
      return <Categories cat={this.props.cat} />
    }
  }

  getCategory = cat => {
    axios.get('http://localhost:3004/products')
        .then(response => {
          return response.data
        })
        .then(data => {
          console.log(data)
          data.forEach(value => {
            if(value.categoria === cat){
              console.log(value.categoria)
              this.setState({
                listProd: this.state.listProd.concat([
                  {
                    "name": value.name,
                    "image": value.image,
                    "price": value.price
                  }
                ])
              })
            }
          })
        })
        .catch(err => {
          console.error(err);
        })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <ul className="exampleSlider">
          {this.renderExample()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      opened: state.navIsOpen,
      cat: state.selectCat
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      isOpened: (bool) => dispatch(navIsOpen(bool)),
      selectCat: (cat) => dispatch(selectCat(cat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);