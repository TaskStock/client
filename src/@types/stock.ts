interface Stock {
  name: string;
  level: number;
  take_count: number;
}

export interface StockItem extends Stock {
  take_count: number;
  success_count: number;
  stockitem_id: number;
  y_take_count: number;
  y_success_count: number;
  region: string;
  success_rate: string;
  user_id: number;
}

export interface StockDetail extends Stock {
  take_count: number;
  total_success_count: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  smonday: number;
  stuesday: number;
  swednesday: number;
  sthursday: number;
  sfriday: number;
  ssaturday: number;
  ssunday: number;
  my_take_count: number;
  my_success_count: number;
}
