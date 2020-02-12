import React, {useEffect, useReducer, useState} from "react";
import ReactDOM from "react-dom";

const wasmWorker = window.wasmWorker;

/* const doSomeWasm = () => {
 * 	wasmWorker.postMessage({'action': 'do_wasm'});
 * } */

const doSomeWasm = (listings, filter) => {
	if (!filter) {
		postMessage({'action': 'new_listings', 'payload': immutableListings});
		return;
	}
	wasmWorker.postMessage({'action': 'filter', 'payload': {listings: listings, filter: filter}});
}

const generateNThousandListings = (n) => {
	let k = n * 1000;
	let s = 'The quick dog jumped over the lazy brown fox';
	let strs = [];
	for (let i = 0; i < k; i++) {
		let [fst, snd] = generateRandomSubstrIndicies(s);
		let innerText = s.substr(fst, snd);
		strs.push(innerText);
	}

	return strs;
}

const mapStrToElm = (str, i) => {
	return <p key={`iteration-${i}`}>{str}</p>;
}

const generateRandomSubstrIndicies = (s) => {
	let maxBound = s.length;
	let firstSubStr = (Math.floor(Math.random() * maxBound)) - 1;
	let nextMaxBound = s.length - firstSubStr
	let secondSubStr = ((Math.floor(Math.random() * nextMaxBound)) + firstSubStr) - 1;
	return [firstSubStr, secondSubStr]
}

const immutableListings = generateNThousandListings(10);

const App = () => {
	const wasmReducer = (state, action) => {
		if (action.type === 'init') {
			return true;
		}
	};

	const listingsReducer = (state, action) => {
		if (action.type === 'new_listings') {
			return action.listings.map(mapStrToElm)
		}
	}

	let [wasmLoaded, wasmDispatch] = useReducer(wasmReducer, false);
	let [listingsElm, listingsDispatch] = useReducer(listingsReducer, immutableListings.map(mapStrToElm))

	console.log('WASM LOADED IS');
	console.log(wasmLoaded)

	useEffect(() => {
		wasmWorker.onmessage = (e) => {
			console.log("In UI THREAD -- HEARD:");
			console.log(e);

			let {data} = e;
			if (!data) {
				console.error('Could not find data in onmessage event!');
				console.error(e);
				return
			}

			let {action, payload} = data;
			if (action === 'init') {
				console.log("In UI THREAD -- ABOUT TO DISPATCH:");
				console.log(action);

				wasmDispatch({type: action})
			}

			if (action === 'new_listings') {
				console.log('Listings message heard:');
				listingsDispatch({type: action, listings: payload})
			}
		}

		wasmWorker.postMessage(
			{
				'action': 'init',
				'payload': immutableListings
			}
		);

	}, [])


	let loaded = <p>Loading Wasm Button...</p>;
	if (wasmLoaded) {
		loaded = <input type="text" onChange={(e) => {doSomeWasm(immutableListings, e.target.value)}}/>;
	}

	return (
		<div>
			<h1>GLORIOUS SORTING</h1>
			{loaded}
			{listingsElm}
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
