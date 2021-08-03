import styled from 'styled-components';

const JiggleContainer = styled.div`
	&:nth-child(2n-1) {
		animation-name: keyframes2;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		transform-origin: 30% 5%;
		animation-duration: 0.25s;
	}
	&:nth-child(2n) {
		animation-name: keyframes1;
		animation-iteration-count: infinite;
		transform-origin: 50% 10%;
		animation-duration: 0.25s;
	}

	@keyframes keyframes1 {
		0% {
			transform: rotate(-1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(1.5deg);
			animation-timing-function: ease-out;
		}
	}

	@keyframes keyframes2 {
		0% {
			transform: rotate(1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(-1.5deg);
			animation-timing-function: ease-out;
		}
	}
`;

export default JiggleContainer;
