import React,{ Component } from 'react';

class SignIn extends Component{

	constructor(props){
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword:''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail:event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword:event.target.value})
	}

	onSigninSubmit = () =>{
		console.log(this.state)
		//this.props.onRouteChange('home')
		fetch('http://localhost:3000/signIn',{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email:this.state.signInEmail,
				password:this.state.signInPassword
			})
		})
		//this.props.onRouteChange('home')
		.then(response => response.json())
		.then(user => {
			//console.log(user)
			if(user.id){
				this.props.onLoadUser(user)
				this.props.onRouteChange('home');
			}
		})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
		<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-1">
			<main className="pa4 black-80">
			  <div className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
				        onChange={this.onEmailChange} 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-cyan w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
				        onChange={this.onPasswordChange} 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password"
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
				      onClick={this.onSigninSubmit} 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib shadow-5" 
				      type="submit" 
				      value="Sign in"
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <a href="#0" onClick={() => onRouteChange('Register')} className="f6 link dim black db">Register</a>
			      <a href="#0" className="f6 link dim black db">Forgot your password?</a>
			    </div>
			  </div>
			</main>
		</article>
		);
	}
	
}

export default SignIn;