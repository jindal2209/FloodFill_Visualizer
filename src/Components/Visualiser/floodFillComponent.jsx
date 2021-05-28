import { useEffect, useState } from "react";
import { floodFill } from "../Algorithm/floodFill";
import './floodFillComponent.css'

function FloodFill() {
	var [color, setColor] = useState('#ff0000')
	var [arr, setArr] = useState([]);
	var [draw, setDraw] = useState(false)

	useEffect(() => {
		var ar = []
		for (var i = 0; i < 23; i++) {
			var sr = []
			for (var j = 0; j < 60; j++) {
				sr.push('element-block');
			}
			ar.push(sr)
		}
		setArr(ar)
	}, [])

	function handleColorChange(e) {
		setColor(e.target.value)
	}

	function handleCoordinates(e) {
		var val = document.getElementById('toggler').checked;
		if (val === false) {
			e.target.style.backgroundColor = 'rgb(247, 247, 207)'
			var grid = document.querySelectorAll('.element-block');
			for (var i = 0; i < grid.length; i++) {
				if (grid[i].style.backgroundColor === 'rgb(247, 247, 207)') {
					var row = parseInt(i / 60);
					var col = i - row * 60
					floodFill(row, col);
					break;
				}
			}
		}
		else {
			setDraw(prev => !prev)
		}
	}

	function handleMouseEnter(e) {
		var val = document.getElementById('toggler').checked;
		var currentColor = e.target.style.backgroundColor;
		if (val === true && draw === true) {			// draw mode
			if (currentColor === 'black') {
				e.target.style.backgroundColor = 'white'
			}
			else {
				e.target.style.backgroundColor = 'black'
			}
		}
	}

	function handleChange(e) {
		var val = e.target.checked;
		if (val === true) {			// draw mode

		}
	}

	return (
		<div>
			<div className='navbar'>
				<ul>
					<li><a className='heading' href="#home">Flood FIll Algorithm</a></li>
					<li style={{ float: 'right' }}>
						<a style={{ padding: '5px' }} href="https://github.com/jindal2209/FloodFill_Visualizer" target='_blank' rel='noreferrer' >
							<img style={{ width: '70px' }} src={process.env.PUBLIC_URL + "/iff.png"} alt='myGithub' />
						</a>
					</li>
				</ul>
			</div>
			<div style={{ marginTop: '10px' }}>
				<div className='grid-container'>
					<div className='left'>
						<label>
							<input type='color' id='colorBox' value={color} onChange={(e) => handleColorChange(e)} />
						</label>
						&nbsp;
						&nbsp;
						&nbsp;
						<label className='switch' >
							<input id='toggler' type='checkbox' onClick={(e) => handleChange(e)} />
							<span className='slider' />
						</label>
					</div>
					<div className='right'>
						Toggle the switch to draw/fill. <br />
						Draw: Click on any box to start drawing. Click again to stop drawing.<br />Fill : Select the colour and click on area to color
					</div>
				</div>
				<div>
					<div className='box'>
						{arr.map((row, ridx) => (
							<div className={ridx} key={ridx} >
								{row.map((col, cidx) => (
									<div
										className={`${col}`}
										key={cidx}
										style={{
											backgroundColor: 'white',
											height: '25px',
											width: '25px',
											outline: '1px solid rgb(175, 216, 248)',
											display: 'inline-block',
											transition: '0.6s',
											transitionTimingFunction: 'ease-in'
										}}
										onMouseEnter={(e) => handleMouseEnter(e)}
										onMouseDown={(e) => handleCoordinates(e)}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FloodFill;