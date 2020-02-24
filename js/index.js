import React, {useEffect, useReducer, useState} from "react";
import ReactDOM from "react-dom";
import sampleListings from '../data/tenklistings.js';

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

const getArrayOfListingText = (listOfObjs) => {
	let listingText = [];
	listOfObjs.forEach((obj) => {
		let acc = ''; // start with a string to get the addition we want.
		let keys = Object.keys(obj);
		keys.forEach((key) => {
			let val = obj[key];
			acc += val;
		});

		listingText.push(acc);
	});

	return listingText;
}

const wasmWorker = window.wasmWorker;

const doSomeWasm = (listings, filter) => {
	if (!filter) {
		sendTo({'action': 'new_listings', 'payload': immutableListings}, false);
		return;
	}
	sendTo({'action': 'filter', 'payload': {listings: listings, filter: filter}}, wasmWorker);
}

const mapStrToElm = (str, i) => {
	return <p key={`iteration-${i}`}>{str}</p>;
}

const mapObjToElm = (obj, i) => {
	let cells = [];
	let keys = Object.keys(obj);
	keys.forEach((key, i) => {
		cells.push(<td key={`inner-iteration-${i}`}>{obj[key]}</td>);
	});
	return (
		<tr key={`outer-iteration-${i}`}>
			{cells}
		</tr>
	);
}

const tableHeader = (obj) => {
	let cells = [];
	let keys = Object.keys(obj);
	keys.forEach((key, i) => {
		cells.push(<th key={`header-iteration-${i}`}>{key}</th>);
	});

	return <tr>{cells}</tr>
}

const generateRandomSubstrIndicies = (s) => {
	let maxBound = s.length;
	let firstSubStr = (Math.floor(Math.random() * maxBound)) - 1;
	let nextMaxBound = s.length - firstSubStr
	let secondSubStr = ((Math.floor(Math.random() * nextMaxBound)) + firstSubStr) - 1;
	return [firstSubStr, secondSubStr]
}

const immutableListings = getArrayOfListingText(sampleListings);

const App = () => {
	const wasmReducer = (state, action) => {
		if (action.type === 'init') {
			return true;
		}
	};

	const listingsReducer = (state, action) => {
		if (action.type === 'new_listings') {
			return action.listings.map(mapObjToElm)
		}
	}

	let [wasmLoaded, wasmDispatch] = useReducer(wasmReducer, false);
	let [listingsElm, listingsDispatch] = useReducer(listingsReducer, sampleListings.map(mapObjToElm))

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

			let {action, payload} = unpackToJSON(data);
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

		sendTo(
			{
				'action': 'init',
				'payload': immutableListings
			},
			wasmWorker
		);

	}, [])


	let loaded = <p>Loading Wasm Button...</p>;
	if (wasmLoaded) {
		// TODO: Make Special Input:
		loaded = <input type="text" onChange={(e) => {doSomeWasm(sampleListings, e.target.value)}}/>;
	}

	console.log(sampleListings[0]);
	console.log('UI RENDER:');
	return (
		<div>
			<h1>GLORIOUS SORTING</h1>
			{loaded}
			<table>
				<thead>
					{tableHeader(sampleListings[0])}
				</thead>
				<tbody>
					{listingsElm}
				</tbody>
			</table>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
