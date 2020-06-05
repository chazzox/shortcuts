import React from 'react';
import logo from './colorWheel.png';

const hexOpacityRegex = /^([\da-fA-F]{2}){4}$/;
const hexStringRegex = /^([\da-fA-F]{2}){3}$/;
const rgbStringOpacityRegex = /^(?:(?:^|,\s*)([01]?\d\d?|2[0-4]\d|25[0-5])){3},(0(\.[0-9]{1,4})?|1(\.0{1,2})?)$/;
const rgbStringRegex = /^(?:(?:^|,\s*)([01]?\d\d?|2[0-4]\d|25[0-5])){3}/;

export default class ColorWheel extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			mouseDownOnCanvas: false,
			rbgData: [255, 255, 255, 255],
			rgbString: '',
			hexString: '',
			isOpacityOn: false
		};
		this.canvasRef = React.createRef();
		this.getPixelData = this.getPixelData.bind(this);
	}

	componentDidMount() {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext('2d');

		const image = new Image();
		image.onload = function () {
			ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
		};
		image.src = logo;

		this.setNewRGBData(this.hexToRGB(this.props.color));
	}

	componentDidUpdate(prevProps) {
		if (this.props.color !== prevProps.color) {
			if (this.props.color.slice(-2).toUpperCase() !== 'FF') {
				this.setState({ isOpacityOn: true }, this.setNewRGBData(this.hexToRGB(this.props.color)));
			} else {
				this.setState({ isOpacityOn: false }, this.setNewRGBData(this.hexToRGB(this.props.color)));
			}
		}
	}

	setNewRGBData(newData) {
		const newHex = this.getHex(newData);
		this.setState(
			{
				rbgData: newData,
				rgbString:
					newData[0] +
					',' +
					newData[1] +
					',' +
					newData[2] +
					(this.state.isOpacityOn ? ',' + Number((newData[3] / 255).toFixed(2)) : ''),
				hexString: newHex
			},
			this.props.colorChange(newHex)
		);
	}

	getPixelData(event) {
		if (this.state.mouseDownOnCanvas) {
			const canvas = this.canvasRef.current;
			const ctx = canvas.getContext('2d');
			const canvasOffset = {
				top: canvas.getBoundingClientRect().top + window.scrollY,
				left: canvas.getBoundingClientRect().left + window.scrollX
			};

			const canvasX = Math.floor(event.pageX - canvasOffset.left);
			const canvasY = Math.floor(event.pageY - canvasOffset.top);

			const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
			const pixel = imageData.data;

			this.setNewRGBData(pixel);
		}
	}

	getHex(values) {
		let hexString = '';
		values.map((rgbValue) => {
			var hex = Math.floor(Number(rgbValue)).toString(16);
			if (hex.length < 2) {
				hex = '0' + hex;
			}
			hexString = hexString.concat(hex);
			return null;
		});
		if (!this.state.isOpacityOn) return hexString.slice(0, -2);
		return hexString;
	}

	hexToRGB(hex) {
		const splitHex = hex.match(/.{2}/g);

		if (!this.state.isOpacityOn)
			return [parseInt(splitHex[0], 16), parseInt(splitHex[1], 16), parseInt(splitHex[2], 16), 255];
		return [parseInt(splitHex[0], 16), parseInt(splitHex[1], 16), parseInt(splitHex[2], 16), parseInt(splitHex[3], 16)];
	}

	rgbStringToRGB(rgbString) {
		const rgbStringSplit = rgbString.split(',');
		const newRGB = [];
		for (let rgbIndex = 0; rgbIndex < 3; rgbIndex++) {
			newRGB.push(Number(rgbStringSplit[rgbIndex]));
		}
		if (this.state.isOpacityOn) newRGB.push(Math.floor(Number(rgbStringSplit[3]) * 255));
		return newRGB;
	}

	handleChangeRGB(valPointer, val) {
		if (val > 255 || isNaN(Number(val))) return;
		let newRGBData = Array.from(this.state.rbgData);
		newRGBData[valPointer] = Number(val);
		this.setNewRGBData(newRGBData);
	}

	render() {
		return (
			<div id="colorPicker" className="colorModals boxContainer">
				<div style={{ width: 280 }}>
					<canvas
						ref={this.canvasRef}
						id="picker"
						width="280"
						height="280"
						onMouseDown={() => this.setState({ mouseDownOnCanvas: true })}
						onMouseUp={() => this.setState({ mouseDownOnCanvas: false })}
						onMouseMove={this.getPixelData}
					/>
				</div>
				<p>
					Opacity Toggle
					<input
						type={'checkbox'}
						checked={this.state.isOpacityOn}
						onChange={(e) => {
							this.setState({ isOpacityOn: e.target.checked }, () => {
								this.setNewRGBData(this.state.rbgData);
								this.handleChangeRGB(3, 255);
							});
						}}
					/>
				</p>
				<div className="controls">
					<ColorInput
						content={'R'}
						index={0}
						value={this.state.rbgData[0]}
						newData={(index, pointer) => this.handleChangeRGB(index, pointer)}
					/>
					<ColorInput
						content={'G'}
						index={1}
						value={this.state.rbgData[1]}
						newData={(index, pointer) => this.handleChangeRGB(index, pointer)}
					/>
					<ColorInput
						content={'B'}
						index={2}
						value={this.state.rbgData[2]}
						newData={(index, pointer) => this.handleChangeRGB(index, pointer)}
					/>
					{this.state.isOpacityOn ? (
						<ColorInput
							content={'A'}
							index={3}
							value={this.state.rbgData[3]}
							newData={(index, pointer) => this.handleChangeRGB(index, pointer)}
						/>
					) : null}
					<div>
						RGB{this.state.isOpacityOn ? 'A' : null}
						<input
							type="text"
							value={this.state.rgbString}
							autoComplete="off"
							onChange={(e) => {
								if (
									this.state.isOpacityOn
										? !rgbStringOpacityRegex.test(e.target.value)
										: !rgbStringRegex.test(e.target.value)
								) {
									this.setState({ rgbString: e.target.value });
								} else if (
									this.state.isOpacityOn
										? rgbStringOpacityRegex.test(e.target.value)
										: rgbStringRegex.test(e.target.value)
								) {
									const newRGB = this.rgbStringToRGB(e.target.value);
									this.setNewRGBData(newRGB);
								}
								return;
							}}
						/>
					</div>
					<div>
						HEX
						<input
							value={this.state.hexString}
							type="text"
							id="hexVal"
							autoComplete="off"
							maxLength={this.state.isOpacityOn ? 8 : 6}
							onChange={(e) => {
								if (
									this.state.isOpacityOn
										? !hexOpacityRegex.test(e.target.value)
										: !hexStringRegex.test(e.target.value)
								) {
									this.setState({ hexString: e.target.value });
								} else if (
									this.state.isOpacityOn
										? hexOpacityRegex.test(e.target.value)
										: hexStringRegex.test(e.target.value)
								) {
									const newRGB = this.hexToRGB(e.target.value);
									this.setNewRGBData(newRGB);
								}
								return;
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}

class ColorInput extends React.Component {
	render() {
		return (
			<div className={'control'}>
				{this.props.content}
				<input
					value={this.props.value}
					autoComplete="off"
					onChange={(e) => this.props.newData(this.props.index, e.target.value)}
				/>
				<input
					type="range"
					min={0}
					max={255}
					value={this.props.value}
					className="slider"
					onChange={(e) => this.props.newData(this.props.index, e.target.value)}
				/>
			</div>
		);
	}
}
