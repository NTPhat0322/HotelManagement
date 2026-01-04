export interface User {
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  city?: string | null;
  district?: string | null;
  ward?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface City {
  province_name: string | null;
  province_id: string | null;
}
export interface District {
  district_id: string | null;
  district_name: string | null;
}
export interface Ward {
  ward_id: string | null;
  ward_name: string | null;
}
