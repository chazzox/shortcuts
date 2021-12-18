import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { setGrid } from '@app/redux/gridReducer';
import { oldUser } from '@app/redux/settingsReducer';
import store, { AppDispatch } from '@app/redux/store';
import { defaults, empty } from '@app/utils';
import { Button, SimpleBox } from './styled';

const BoxInner = styled(SimpleBox)`
	width: 60%;
`;

const BoxContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const Option = styled(Button)`
	height: 150px;
	width: 200px;
	margin: 5px;
	cursor: pointer;
`;

const OptionContainer = styled.div``;

const Tutorial = () => {
	const [slideCounter, setSlideCounter] = useState(0);
	const slides = [<Slide0 />, <Slide1 />, <FinalSlide />];
	const setCount = (change: number) =>
		setSlideCounter((prev) => {
			const newVal = prev + change;
			if (newVal <= slides.length - 1 && newVal >= 0) return newVal;
			return prev;
		});

	const handleKeyDown = useCallback(
		({ key }: KeyboardEvent) => {
			switch (key) {
				case 'ArrowLeft':
					setCount(-1);
					break;
				case 'ArrowRight':
					setCount(1);
					break;
			}
		},
		[slideCounter]
	);

	React.useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<BoxContainer>
			<BoxInner>
				<h1>Shortcuts</h1>
				{slides[slideCounter]}

				{slideCounter > 0 && (
					<Button
						onClick={() => {
							setCount(-1);
						}}>
						Previous
					</Button>
				)}
				{slideCounter < slides.length - 1 && (
					<Button
						style={{ float: 'right' }}
						onClick={() => {
							setCount(1);
						}}>
						Next
					</Button>
				)}
			</BoxInner>
		</BoxContainer>
	);
};

const Slide0 = () => {
	return (
		<>
			<h2>What is shortcuts?</h2>
			<p>
				Although currently just a website, Shortcuts will soon be making its way to the chrome extension store where
				you can use it as a replacement for the new tab page
			</p>
			<p>
				It includes useful widgets like a Reddit and Twitter feed, it also has a gmail widget and RSS feed coming
				soon™
			</p>
		</>
	);
};

const Slide1 = () => (
	<>
		<h2>Adding New links/Sections/Boxes</h2>
		<p>
			Whenever you want to add a new thing to your homepage find the 'Edit Mode' button on the top right of the navbar,
			Click on this
		</p>
		<p>{'{image to be added soon}'}</p>
		<p>
			you should now see plus symbols at each stage of things that are available to add, If you want a new widget,
			follow the same instructions for adding a new box
		</p>
		<p>ps: you can use the arrow keys to navigate the slides</p>
	</>
);

const FinalSlide = () => {
	const dispatch: AppDispatch = store.dispatch;
	return (
		<>
			<h2>Thats it!</h2>
			<p>Nice! you've completed the tutorial, there are a couple of options below that you can pick from to start</p>
			<p>
				Pick the blank slate or the default option to start, you can also go back and read more of the tutorial and
				come back later if you want
			</p>
			<OptionContainer>
				<Option
					onClick={() => {
						dispatch(setGrid(empty));
						dispatch(oldUser());
					}}>
					Blank
				</Option>
				<Option
					onClick={() => {
						dispatch(setGrid(defaults));
						dispatch(oldUser());
					}}>
					Default
				</Option>
			</OptionContainer>
		</>
	);
};

export default Tutorial;
