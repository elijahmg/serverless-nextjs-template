import React from 'react';

function ErrorIcon() {
	return (
		<svg
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 50 50"
			enableBackground="new 0 0 50 50"
			width="30"
			height="15"
		>
			<circle fill="#D75A4A" cx="25" cy="25" r="25" />
			<polyline
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="2"
				strokeLinecap="round"
				strokeMiterlimit="10"
				points="16,34 25,25 34,16"
			/>
			<polyline
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="2"
				strokeLinecap="round"
				strokeMiterlimit="10"
				points="16,16 25,25 34,34"
			/>
		</svg>
	);
}

export default ErrorIcon;
