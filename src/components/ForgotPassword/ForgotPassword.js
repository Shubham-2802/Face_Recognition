import React,{ Component } from 'react';

class ForgotPassword extends Component{

	constructor(props){
		super(props);
		this.state = {
			signInEmail:''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail:event.target.value})
	}


	onForgotPasswordSubmit = () =>{
		console.log(this.state)
		// this.props.onRouteChange('NewerPassword')
		fetch('http://localhost:3000/Forgot',{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email:this.state.signInEmail,
			})
		})
		.then(response => response.json())
		.then(user => {
			console.log(user)
			if(user.email){
				this.props.onRouteChange('NewerPassword');
			}
		})
	}

	render() {
		return (
		<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-1">
			<main className="pa4 black-80">
			  <div className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Forgot Password?</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Enter Your Email</label>
			        <input 
				        onChange={this.onEmailChange} 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        required
			        />
			      </div> 
			    </fieldset>
			    <div>
			      <input 
				      onClick={this.onForgotPasswordSubmit} 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib shadow-5" 
				      type="submit" 
				      value="Submit"
			      />
			    </div>
			  </div>
			</main>
		</article>
		);
	}
	
}

export default ForgotPassword;