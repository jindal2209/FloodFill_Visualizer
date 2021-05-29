export var delay = 10;

export function changeDelay(val) {
	delay = val;
}

export async function MakeDelay(milisec) {
	return new Promise(resolve => {
		setTimeout(() => { resolve('') }, milisec);
	})
}

export var row = 23;
export var col = 60;

export function setRC(r, c) {
	row = r;
	col = c;
}