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
	postMessage({action: 'init', payload: {ready: ready}});
};

const doBigComputation = () => {
	wasm_bindgen.big_computation();
};

onmessage = (e) => {
	console.log("In WORKER THREAD -- HEARD:");
	console.log(e);

	if (!ready && e.data.action !== 'init') {
		// TODO: ERR OUT HERE?
	}

	let {action, payload} = e.data;

	switch(action) {
		case 'init':
			if (ready) {
				sendReady();
				break;
			}

			let cb = () => {
				sendReady();
				wasm_bindgen.print_listings(payload);
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

			let x = wasm_bindgen.listing_filter(payload.listings, payload.filter)
			let msg = {
				action: 'new_listings', 
				payload: x
			}

			postMessage(msg);
			
			break;
		}
		default:
			console.error('Unknown action: ' + e.data.action);
			break;
	}
}
