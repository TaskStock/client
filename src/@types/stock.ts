interface Stock {
  name: string;
  level: number;
  take_count: number;
}

export interface StockItem extends Stock {
  stockitem_id: number;
  take_count: number;
  success_count: number;
  y_take_count: number;
  y_success_count: number;
  region: string;
  success_rate: number;
  user_id: number;
}

export interface Challengers {
  user_id: number;
  user_name: string;
  image: string;
}
export interface StockDetail {
  stockitem: {
    name: string;
    level: number;
    take_count: number;
    success_count: number;
    my_take_count: number;
    my_success_count: number;
    is_add_today: boolean;
  };
  statistics: {
    total_count: number;
    total_success_count: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
    s_monday: number;
    s_tuesday: number;
    s_wednesday: number;
    s_thursday: number;
    s_friday: number;
    s_saturday: number;
    s_sunday: number;
  };
  userlist: Challengers[];
}
