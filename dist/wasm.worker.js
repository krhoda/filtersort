importScripts('filtersort.js');

let ready = false;

const loadBindgen = (cb) => {
	wasm_bindgen('filtersort_bg.wasm').then(() => {
		console.log('IN WORKER THREAD after WASM:');
		ready = true;
		cb();
	}).catch(console.error);
}

const sendReady = () => {
	console.log('is it here?');
	sendTo({action: 'init', payload: {ready: ready}}, false);
};

const doBigComputation = () => {
	wasm_bindgen.big_computation();
};

const sendTo = (input, worker = false) => {
	let payload = packJSON(input);
	if (!payload) {
		return payload;
	}

	if (!worker) {
		postMessage(payload, [payload]);
		return true;
	}

	worker.postMessage(payload, [payload]);
	return true;
}

const packJSON = (json) => {
	try {
		let str = JSON.stringify(json);
		return packString(str);
	} catch (err) {
		console.error(err);
		return false;
	}
}

const packString = (str) => {
	try {
		let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
		let bufView = new Uint16Array(buf);
		for (let i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}

		return buf;

	} catch (err) {
		console.error(`Could not process target into transferable array: ${err}, Target:`);
		console.error(str);
		return false;
	}
}

const unpackToString = (bytes) => {
	try {
		let x = new Uint16Array(bytes).reduce((data, byte) => {
			return data + String.fromCharCode(byte);
		}, '');

		return x;
	} catch (err) {
		console.error(`Could not process target from bytes to JSON: ${err}`);
		return false;
	}
}

const unpackToJSON = (bytes) => {
	let str = unpackToString(bytes);
	if (!str) {
		return str;
	}

	try {
		let obj = JSON.parse(str);
		return obj;
	} catch (err) {
		console.error(`Could not process target from string to JSON: ${err}, Target:`);
		console.error(str);
		return false;
	}
}

onmessage = (e) => {
	console.log("In WORKER THREAD -- HEARD:");
	let nextData = unpackToJSON(e.data);
	console.log(nextData);

	let {action, payload} = nextData;

	switch(action) {
		case 'init':
			if (ready) {
				sendReady();
				break;
			}

			let cb = () => {
				sendReady();
				/* wasm_bindgen.print_listings(payload); */
			}

			loadBindgen(cb);
			break;

		case 'do_wasm':
			if (!ready) {
				return;
			}

			doBigComputation();
			break;

		case 'filter': {
			if (!ready) {
				return;
			}

			// TODO: Memoize Here:
			let x = wasm_bindgen.listing_filter(payload.listings, payload.filter)
			let msg = {
				action: 'new_listings',
				payload: x
			}

			sendTo(msg, false);

			break;
		}
		default:
			console.error('Unknown action: ' + e.data.action);
			break;
	}
}
