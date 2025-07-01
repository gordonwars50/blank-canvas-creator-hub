export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

export interface Camera {
  id: string;
  name: string;
  serialNumber?: string;
  notes?: string;
}

export interface Lens {
  id: string;
  name: string;
  focalLength?: string;
  aperture?: string;
  notes?: string;
}

export type TabType = 'dashboard' | 'team-gear' | 'settings';