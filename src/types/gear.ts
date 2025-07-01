export interface Camera {
  id: string;
  user_id: string;
  name: string;
  serial_number?: string;
  notes?: string;
  created_at?: string;
}

export interface Lens {
  id: string;
  user_id: string;
  name: string;
  focal_length?: string;
  aperture?: string;
  notes?: string;
  created_at?: string;
}