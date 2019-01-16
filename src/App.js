import React, { Component } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Categories from './components/Categories';
import Footer from './components/Footer';
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
      showInitial: []
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3004/products')
        .then(response => {
          return response.data
        })
        .then(data => {
          let showInitial = []
          for(var i = 0; i < 20; i++){
            showInitial = showInitial.concat([
              {
                "name": data[i].name,
                "price": data[i].price,
                "image": data[i].image
              }
            ])
          }
          let rand = [
            Math.floor(Math.random() * data.length),
            Math.floor(Math.random() * data.length),
            Math.floor(Math.random() * data.length),
            Math.floor(Math.random() * data.length)
          ]
          this.setState({
            showInitial,
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
    return this.state.productsExample.map((value, i) => {
      return (
        <li key={i}>
          <h3>{value.name}</h3>
          <img src={value.image} alt={value.name} />
          <p>{value.price}</p>
        </li>
      );
    })
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

  showAll = () => {
    return this.state.showInitial.map((value, i) => {
      return (
        <li key={i} className="initialPage">
          <h3>{value.name}</h3>
          <img src={value.image} alt={value.name} />
          <p>{value.price}</p>
        </li>
      );
    })
  }

  render() {
    if(this.props.cat.length === 0){
      return (
        <div className="App">
          <Header />
          <Nav />
          <div className="banner">
            <img src="http://lorempixel.com/640/480/abstract" alt="banner" />
          </div>
          <div className="container">
            <ul className="exampleSlider">
              {this.renderExample()}
            </ul>
          </div>
          <div className="box-container">
            {this.showAll()}
          </div>
          <div className="verMais">+</div>
          <Footer />
        </div>
      );
    }else{
      return (
        <div className="App">
          <Header />
          <Nav />
          <Categories cat={this.props.cat} />
          <div className="verMais">+</div>
          <Footer />
        </div>
      );
    }
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