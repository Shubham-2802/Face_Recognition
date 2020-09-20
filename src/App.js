import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import NewerPassword from './components/NewerPassword/NewerPassword';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Imagelink from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';


const particlepara = {
                 "particles": {
                      "number": {
                          "value": 50
                      },
                      "size": {
                          "value": 3
                      }
                  },
                  "interactivity": {
                      "events": {
                          "onhover": {
                              "enable": true,
                              "mode": "repulse"
                          }
                      }
                  }
              }

const initialState = {
      input:'',
      imageURL: '',
      box: [],
      showImage:false,
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }             

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  onLoadUser = (data) =>{
    this.setState({user: {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }})
  }

  calculateFace = (data,i) => {
      const face = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
  }  

  displayFaceBox = (box) => {
    //console.log(box)
    this.setState({box: [...this.state.box,box]});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
      this.setState({
        box:[],
        imageURL:this.state.input,
        showImage:true
      });
      fetch('http://localhost:3000/imageurl',{
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  input:this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if (response) {
                fetch('http://localhost:3000/image',{
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id:this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries:count }))
          })
      }
      var dat = response.outputs[0].data.regions
      for(var i=0;i<dat.length;i++){
        this.displayFaceBox(this.calculateFace(response,i));
      }
    })
    .catch(err => console.log(err)); 
  }

  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn:true})
    }
    else if (route === "signout"){
      this.setState(initialState)
    } 
    this.setState({route: route})
    }
  
  render() {
      return (
      <div className="App">
        <Particles className="particles"
                params={particlepara}
              />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { (this.state.route === 'ForgotPassword' 
                    ? <ForgotPassword onRouteChange={this.onRouteChange}/>
                    : (this.state.route === 'NewerPassword'
                      ? <NewerPassword onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
                      : this.state.route === 'home'
                        ? <div>
                            <Logo/>
                            <Rank 
                              name={this.state.user.name} 
                              entries={this.state.user.entries}/>
                            <Imagelink 
                              onInputChange={this.onInputChange} 
                              onButtonSubmit={this.onButtonSubmit}/>
                            <FaceRecognition 
                              box={this.state.box} 
                              imageURL={this.state.imageURL}
                              showImage={this.state.showImage}/>
                          </div>
                        : (this.state.route === 'SignIn'
                           ?  <SignIn onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
                           :  <Register onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
                          )
                    )
                )
        }
      </div>
    );
  }
}

export default App;
