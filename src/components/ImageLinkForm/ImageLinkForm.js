import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ( {onInputChange,onButtonSubmit} ) => {
	return (
			<div className="ma4 mt0">
				<p className="f3">
					{'Welcome to the Magic Brain Portal. We will detect faces on your picture.'}
				</p>
				<div className="centre">
					<div className="form pa3 br3 shadow-5">
						<input 
							className="f3 center w-70" 
							type="text" 
							onChange={onInputChange}
						/>
						<button 
							className="f3 center w-30 bg-light-purple"
							onClick={onButtonSubmit}>
							Detect
						</button>
					</div>
				</div>
			</div>
		);
}

export default ImageLinkForm;