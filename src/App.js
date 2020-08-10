import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Imagelink from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

const app = new Clarifai.App({
 apiKey: '10780d471875486c940000ebf757f3ce'
});

const particlepara = {
                particles: {
                    numbers: {
                      value: 100,
                      density: {
                        enable: true,
                        value_area: 800
                    }
                  }
                }
              }

            

class App extends Component {

  constructor() {
    super();
    this.state = {
      input:'',
      imageURL: '',
      box: {},
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

  calculateFace = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(face, width, height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }  

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
      this.setState({imageURL:this.state.input})
      app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
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
        this.displayFaceBox(this.calculateFace(response))
      })
      .catch(err => console.log(err)); 
  }

  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn:true})
    }
    else if (route === "signout"){
      this.setState({isSignedIn:false})
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
        { this.state.route === 'home'
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
                imageURL={this.state.imageURL}/>
            </div>
          : (this.state.route === 'SignIn'
              ? <SignIn onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
              : <Register onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
            )   
        }
      </div>
    );
  }
}

export default App;
