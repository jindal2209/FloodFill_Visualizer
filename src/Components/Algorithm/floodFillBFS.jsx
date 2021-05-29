import { col, delay, MakeDelay } from "../Utils/utils";

class queue {
	constructor() {
		this.arr = [];
	}

	push(n) {
		this.arr.push(n);
		this.size += 1;
	}

	empty() {
		return this.arr.length === 0;
	}

	front() {
		return this.arr[0];
	}

	pop() {
		if (this.arr.length !== 0) {
			this.arr.shift();
		}
	}

}

var fillColor = 'pink';
var n;

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

function giveNbrs(pos) {
	var arr = [];
	if ((pos - 1 >= 0) && (pos % col !== 0)) {
		arr.push(pos - 1);
	}
	if ((pos + 1 < n) && ((pos + 1) % col !== 0)) {
		arr.push(pos + 1);
	}
	if (pos - col >= 0) {
		arr.push(pos - col);
	}
	if (pos + col < n) {
		arr.push(pos + col)
	}
	return arr;
}

async function helper(grid, src) {
	var visited = new Array(n);
	for (var k = 0; k < n; k++) {
		visited[k] = false;
	}
	var q = new queue();
	q.push(src);
	visited[src] = true;

	while (q.empty() !== true) {
		var node = q.front();
		grid[node].style.backgroundColor = fillColor;
		await MakeDelay(delay)
		q.pop();

		var nbrs = giveNbrs(node);
		for (var i = 0; i < nbrs.length; i++) {
			if (visited[nbrs[i]] === false && grid[nbrs[i]].style.backgroundColor !== 'black') {
				q.push(nbrs[i]);
				visited[nbrs[i]] = true;
			}
		}
	}
}

export async function floodFillBFS(cx, cy) {
	var grid = document.querySelectorAll('.element-block');
	fillColor = document.getElementById('colorBox').value;
	fillColor = hexToRgb(fillColor);
	n = grid.length;
	var pos = (cx * col) + cy;
	await helper(grid, pos);
}