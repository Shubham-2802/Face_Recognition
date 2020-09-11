import React,{ Component } from 'react';

class NewerPassword extends Component{

	constructor(props){
		super(props);
		this.state = {
			NewPass:'',
			ReNewPass:''
		}
	}

	onNewPassEnter = (event) => {
		this.setState({NewPass:event.target.value})
	}

	onNewPassReEnter = (event) => {
		this.setState({ReNewPass:event.target.value})
	}

	onResetSubmit = () =>{
		console.log(this.state)
		this.props.onRouteChange('SignIn')
		// fetch('http://localhost:3000/signIn',{
		// 	method: 'POST',
		// 	headers: {'Content-Type': 'application/json'},
		// 	body: JSON.stringify({
		// 		email:this.state.signInEmail,
		// 		password:this.state.signInPassword
		// 	})
		// })
		// //this.props.onRouteChange('home')
		// .then(response => response.json())
		// .then(user => {
		// 	//console.log(user)
		// 	if(user.id){
		// 		this.props.onLoadUser(user)
		// 		this.props.onRouteChange('home');
		// 	}
		// })
	}

	render() {
		//const { onRouteChange } = this.props;
		return (
		<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-1">
			<main className="pa4 black-80">
			  <div className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Reset Password</legend>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">New Password</label>
			        <input 
				        onChange={this.onNewPassEnter} 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password1"  
				        id="password1"
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Re-enter New Password</label>
			        <input 
				        onChange={this.onNewPassReEnter} 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password2"  
				        id="password2"
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
				      onClick={this.onResetSubmit} 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib shadow-5" 
				      type="submit" 
				      value="Reset"
			      />
			    </div>
			  </div>
			</main>
		</article>
		);
	}
	
}

export default NewerPassword;