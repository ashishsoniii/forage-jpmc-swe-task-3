import { ServerRespond } from "./DataStreamer";

export interface Row {
  // Defining the properties of the Row interface
  price_abc: number;
  price_def: number;

  ratio: number;

  timestamp: Date;
  // Defining the Row interface
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  
  static generateRow(serverResponds: ServerRespond[]): Row {
    // Defining the Row interface
    const priceABC =
      (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF =
      (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    // Defining the Row interface
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    return {
      // Defining the Row interface
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert:
        ratio > upperBound || ratio < lowerBound ? ratio : undefined,
    };
  }
}
