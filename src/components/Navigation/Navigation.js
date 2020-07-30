import React from 'react';

const Navigation = ({onRouteChange,isSignedIn}) => {

	if(isSignedIn){
		return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p1 onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer"> SignOut </p1>
			</nav>
		);
	} else {
		return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p1 onClick={() => onRouteChange('SignIn')} className="f3 link dim black underline pa3 pointer"> SignIn </p1>
				<p1 onClick={() => onRouteChange('Register')} className="f3 link dim black underline pa3 pointer"> Register </p1>
			</nav>
		);
	}
	
}

export default Navigation;