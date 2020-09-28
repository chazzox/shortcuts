import React, { useState } from 'react';

import './tutorial.scss';

const Tutorial = () => {
	const [slideCounter, setSlideCounter] = useState(0);

	const slides = [<Slide0 />, <Slide1 />];

	return (
		<>
			<div id="welcomeContainer" className="box">
				<div className="boxTitle">Shortcuts</div>
				<div className="boxInner">
					{slides[slideCounter]}

					<div className="buttonContainer">
						<span
							className="button"
							onClick={() => {
								setSlideCounter((slideCounter - 1) % slides.length);
							}}
						>
							Previous
						</span>
						<span
							className="button affirmative"
							onClick={() => {
								setSlideCounter((slideCounter + 1) % slides.length);
							}}
						>
							Next
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

const Slide0 = () => {
	return (
		<>
			<h2>What is shortcuts?</h2>
			<p>
				Although currently just a website, Shortcuts will soon be making its way to the
				chrome extension store where you can use it as a replacement for the new tab page
			</p>
			<p>
				It includes useful widgets like a Reddit and Twitter feed, it also has a gmail
				widget and RSS feed coming soon™
			</p>
		</>
	);
};

const Slide1 = () => {
	return (
		<>
			<h2>Adding New links/Sections/Boxes</h2>
			<p>
				Whenever you want to add a new thing to your homepage find the 'Edit Mode' button on
				the top right of the navbar, Click on this
			</p>
			<p>{'{image to be added soon}'}</p>
			<p>
				you should now see plus symbols at each stage of things that are available to add,
				If you want a new widget, follow the same instructions for adding a new box
			</p>
		</>
	);
};

export default Tutorial;
