export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  education: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  availability: string[];
  bio?: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription?: string;
  symptoms?: string[];
  procedures?: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
