export default interface CreateRentalDTOInterface {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: string;
  total?: number;
}
