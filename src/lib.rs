extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn big_computation() {
    log("Big computation in Rust");
}

#[wasm_bindgen]
pub fn print_listings(listings: Box<[JsValue]>) {
    for listing in listings.iter() {
        match listing.as_string() {
            None => log("Could not read listing as string"),
            Some(x) => log(&x),
        }
    }
}

#[wasm_bindgen]
pub fn listing_filter(listings: Box<[JsValue]>, against: &str) -> Box<[JsValue]> {
    let mut result = vec![];
    for listing in listings.iter() {
        match listing.as_string() {
            None => log("Could not read listing as string"),
            Some(x) => {
                if x.contains(against) {
                    let y = listing.clone();
                    result.push(y);
                }
            }
        }
    }

    result.into_boxed_slice()
}
