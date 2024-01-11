export interface Value {
  value_id: number;
  date: string;
  percentage: null | number;
  start: number;
  end: number;
  low: number;
  high: number;
  combo: number;
}

export interface WagmiData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}
