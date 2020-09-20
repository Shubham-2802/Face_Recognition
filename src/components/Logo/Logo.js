import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import Badge from 'react-bootstrap/Badge'
import './Logo.css'

const Logo = () => {
	return (
			<div className="ma4 mt0 flex-container">
				<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 120, width: 120 }} >
        			<div className="Tilt-inner pa3">
          				<img style={{paddingTop: '2.5px'}} alt='logo' src={brain}/>
        			</div>
        			<h1>
				    	<Badge variant="secondary">BRAIN STORM</Badge>
				    </h1>
      			</Tilt>
			</div>
		);
}

export default Logo;