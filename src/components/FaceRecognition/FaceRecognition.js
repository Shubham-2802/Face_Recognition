import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageURL,box,showImage}) => {
	return (
			<div className="centre ma">
				<div className="absolute centre mt2">
				    { showImage === true && (
                    <img id='inputImage' alt={"I'm waiting for Url please Insert it!"} src={imageURL} width="500px" height="auto" />
	                )
	                }
	                { showImage === false && (
	                    <p className="f3">{''}</p>
	                )
	                }
	                { box.map((item, index) => (
	                    <div className='bounding-box' style={{top: item.topRow, right: item.rightCol, bottom: item.bottomRow, left: item.leftCol}} key={index}></div>
	                ))}
				</div>
			</div>
		);
}

export default FaceRecognition;