export var delay = 10;

export function changeDelay(val) {
	delay = val;
}

export async function MakeDelay(milisec) {
	return new Promise(resolve => {
		setTimeout(() => { resolve('') }, milisec);
	})
}