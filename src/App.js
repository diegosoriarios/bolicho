import React, { Component } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Categories from './components/Categories';
import Footer from './components/Footer';
import FullPage from './components/FullPage';
import './App.css';
import axios from 'axios'
import { connect } from 'react-redux';
import { navIsOpen, selectCat, showFullPage } from './actions/click';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
 
 
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      productsExample: [],
      listProd: [],
      showInitial: [],
      page: {},
      selected: 0
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
        <div key={i} onClick={() => {this.props.showFullPage(true); this.setState({page: value})}} className="menu-item">
          <img src={value.image} alt={value.name} />
          <h3>{value.name}</h3>
          <p>{value.price}</p>
        </div>
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
        <li key={i} className="initialPage" onClick={() => {this.props.showFullPage(true); this.setState({page: value})}}>
          <img src={value.image} alt={value.name} />
          <h3>{value.name}</h3>
          <p>{value.price}</p>
        </li>
      );
    })
  }

  onClosePage = () => {
    this.setState({
      page: {}
    })
  }

  render() {
    if(this.props.fullPage){
      return (
        <div className="App">
          <Header />
          <Nav />
          <FullPage values={this.state.page} close={this.onClosePage} />
        </div>
      );
    }else{
      if(this.props.cat.length === 0){
        return (
          <div className="App">
            <Header />
            <Nav />
            <div className="banner">
              <img src="http://lorempixel.com/640/480/abstract" alt="banner" />
            </div>
            <div className="container">
              <h3>Recomendado</h3><br />
              <ScrollMenu
                data={this.renderExample()}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={this.state.selected}
                onSelect={this.onSelect}
              />
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
      isOpened: (bool) => dispatch(navIsOpen(bool)),
      selectCat: (cat) => dispatch(selectCat(cat)),
      showFullPage: (bool) => dispatch(showFullPage(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);