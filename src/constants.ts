import { Doctor, Specialty } from './types';

export const SPECIALTIES: Specialty[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: 'HeartPulse',
    description: 'Expert care for your heart and vascular system.',
    longDescription: 'Our Cardiology department is equipped with state-of-the-art technology to diagnose and treat a wide range of cardiovascular conditions. From preventive screenings to complex interventional procedures, our team of experts is dedicated to your heart health.',
    symptoms: ['Chest pain', 'Shortness of breath', 'Palpitations', 'Dizziness', 'High blood pressure'],
    procedures: ['Echocardiogram', 'Stress Testing', 'Cardiac Catheterization', 'Angioplasty', 'Pacemaker Implantation']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: 'Brain',
    description: 'Advanced diagnosis and treatment for brain and spine disorders.',
    longDescription: 'The Neurology department provides comprehensive care for patients with disorders of the nervous system. We use advanced neuro-imaging and diagnostic tools to manage conditions ranging from headaches to complex neurological diseases.',
    symptoms: ['Frequent headaches', 'Seizures', 'Memory loss', 'Muscle weakness', 'Numbness or tingling'],
    procedures: ['EEG', 'EMG', 'MRI/CT Scans', 'Sleep Studies', 'Lumbar Puncture']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    icon: 'Bone',
    description: 'Comprehensive bone, joint, and muscle care.',
    longDescription: 'Our Orthopedic specialists provide expert care for musculoskeletal injuries and conditions. Whether you are an athlete with a sports injury or suffering from chronic joint pain, we offer both surgical and non-surgical solutions to get you back to your active life.',
    symptoms: ['Joint pain', 'Back or neck pain', 'Sports injuries', 'Fractures', 'Limited range of motion'],
    procedures: ['Joint Replacement', 'Arthroscopy', 'Spine Surgery', 'Physical Therapy', 'Fracture Repair']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: 'Baby',
    description: 'Specialized healthcare for infants, children, and adolescents.',
    longDescription: 'Vitalis Pediatrics offers a warm and welcoming environment for your child\'s healthcare needs. From newborn care to adolescent medicine, our pediatricians are dedicated to supporting your child\'s growth and development at every stage.',
    symptoms: ['Fever', 'Developmental delays', 'Common childhood illnesses', 'Behavioral concerns', 'Growth issues'],
    procedures: ['Well-child Visits', 'Immunizations', 'Developmental Screenings', 'School Physicals', 'Asthma Management']
  },
  {
    id: 'oncology',
    name: 'Oncology',
    icon: 'Dna',
    description: 'Compassionate cancer care with cutting-edge technology.',
    longDescription: 'Our Oncology center provides a multidisciplinary approach to cancer treatment. We combine advanced therapies with compassionate support services to provide personalized care for every patient on their journey to recovery.',
    symptoms: ['Unexplained weight loss', 'Persistent fatigue', 'Lumps or skin changes', 'Chronic pain', 'Changes in bowel/bladder habits'],
    procedures: ['Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Biopsy', 'Genetic Counseling']
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    icon: 'Stethoscope',
    description: 'Treatment for digestive system and liver disorders.',
    longDescription: 'The Gastroenterology department specializes in the prevention, diagnosis, and treatment of digestive tract and liver diseases. Our specialists use the latest endoscopic techniques to provide accurate diagnoses and effective treatments.',
    symptoms: ['Abdominal pain', 'Acid reflux', 'Chronic constipation/diarrhea', 'Bloating', 'Jaundice'],
    procedures: ['Colonoscopy', 'Endoscopy (EGD)', 'Liver Biopsy', 'ERCP', 'Capsule Endoscopy']
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Uttam kumar',
    specialty: 'Cardiology',
    experience: '15+ Years',
    education: 'MD, FACC',
    image: 'https://github.com/uttamkumar7291/img/blob/main/WhatsApp%20Image%202026-02-27%20at%2011.44.55%20PM.jpeg?raw=true',
    gallery: [
      'https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=800&h=1000',
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800&h=1000',
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800&h=1000'
    ],
    bio: 'Dr. Sarah Johnson is a world-renowned cardiologist with over 15 years of experience in treating complex heart conditions. She specializes in interventional cardiology and has performed thousands of successful procedures.',
    rating: 4.9,
    reviews: 124,
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    experience: '12+ Years',
    education: 'MD, PhD',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800&h=1000',
    rating: 4.8,
    reviews: 89,
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    experience: '10+ Years',
    education: 'MD, FAAP',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800&h=1000',
    rating: 4.9,
    reviews: 156,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    experience: '20+ Years',
    education: 'MD, FAAOS',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800&h=1000',
    rating: 4.7,
    reviews: 210,
    availability: ['Mon', 'Wed', 'Thu']
  }
];
