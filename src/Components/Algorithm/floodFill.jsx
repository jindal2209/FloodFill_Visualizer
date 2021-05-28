import { delay, MakeDelay } from "../Utils/utils";

export var row = 23;
export var col = 60;
var fillColor = 'pink';
var n;
var dx = [0, 1, -1, 0];
var dy = [1, 0, 0, -1]

export function setRC(r, c) {
	row = r;
	col = c;
}

function hexToRgb(hex) {
	// copied from stack overflow
	// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		var c = `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
		return c;
	}
	else {
		return 'black'
	}
}


async function helper(grid, i, j) {
	var pos = (i) * col + j;
	if (i < 0 || i >= row || j < 0 || j >= col || pos < 0 || pos >= n) {
		return;
	}
	var ele = grid[pos];
	if (ele.style.backgroundColor === 'black') {
		return;
	}

	if (ele.style.backgroundColor === fillColor) {
		return;
	}

	ele.style.backgroundColor = 'pink'
	await MakeDelay(delay);

	await MakeDelay(delay);
	ele.style.backgroundColor = fillColor;

	for (var lo = 0; lo < 4; lo++) {
		await helper(grid, i + dx[lo], j + dy[lo]);
	}
}

export async function floodFill(cx, cy) {
	var grid = document.querySelectorAll('.element-block');
	fillColor = document.getElementById('colorBox').value;
	fillColor = hexToRgb(fillColor);
	console.log(row, col);
	n = grid.length;
	await helper(grid, cx, cy);
}