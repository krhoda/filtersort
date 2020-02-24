extern crate wasm_bindgen;

#[macro_use]
extern crate serde_derive;

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

#[derive(Serialize, Deserialize, Debug)]
pub struct Listing {
    pub region: String,
    pub country: String,
    pub item_type: String,
    pub sales_channel: String,
    pub order_priority: String, // ACTUALLY ENUM OF L C M H
    pub order_date: String,     // _M/DD/YYYY
    pub order_id: i32,
    pub ship_date: String, // _M/DD/YYYY
    pub units_sold: i32,
    pub unit_price: f64,
    pub unit_cost: f64,
    pub total_revenue: f64,
    pub total_cost: f64,
    pub total_profit: f64,
}

#[wasm_bindgen]
pub fn listing_filter(listings: Box<[JsValue]>, against: &str) -> Box<[JsValue]> {
    let mut result = vec![];
    log("About to loop");
    for list_val in listings.iter() {
        match list_val.into_serde::<Listing>() {
            Err(e) => log(&format!("Failed to deserialize: {}", e)),
            Ok(listing) => {
                if listing.region.contains(against) {
                    result.push(JsValue::from_serde(&listing).unwrap())
                }
            }
        }
    }
    result.into_boxed_slice()
}