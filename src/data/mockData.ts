export interface Claim {
  id: string;
  userId: string;
  name: string;
  fatherName: string;
  village: string;
  district: string;
  surveyNo: string;
  landArea: string;
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  documentUrl?: string;
  reviewNotes?: string;
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  amount: string;
  eligibility: string;
}

export const mockClaims: Claim[] = [
  {
    id: 'CLM001',
    userId: 'citizen_1',
    name: 'Rajesh Patel',
    fatherName: 'Kishan Patel',
    village: 'Wadgaon',
    district: 'Pune',
    surveyNo: '47/2B',
    landArea: '2.5 acres',
    boundaries: {
      north: 'Ramesh Kulkarni',
      south: 'Village Road',
      east: 'Irrigation Canal',
      west: 'Suresh Patil',
    },
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z',
    documentUrl: 'mock-patta-1.pdf',
  },
  {
    id: 'CLM002',
    userId: 'citizen_2',
    name: 'Sunita Sharma',
    fatherName: 'Mohan Sharma',
    village: 'Kharadi',
    district: 'Pune',
    surveyNo: '23/1A',
    landArea: '1.8 acres',
    boundaries: {
      north: 'Forest Land',
      south: 'Nala',
      east: 'Ashok Pawar',
      west: 'Government Land',
    },
    status: 'approved',
    submittedAt: '2024-01-10T14:20:00Z',
    documentUrl: 'mock-patta-2.pdf',
  },
  {
    id: 'CLM003',
    userId: 'citizen_3',
    name: 'Mangesh Deshmukh',
    fatherName: 'Raghunath Deshmukh',
    village: 'Baner',
    district: 'Pune',
    surveyNo: '156/3C',
    landArea: '3.2 acres',
    boundaries: {
      north: 'Hill Slope',
      south: 'Pradeep Joshi',
      east: 'Stream',
      west: 'Forest Department',
    },
    status: 'rejected',
    submittedAt: '2024-01-05T09:15:00Z',
    documentUrl: 'mock-patta-3.pdf',
  },
  {
    id: 'CLM004',
    userId: 'citizen_4',
    name: 'Laxmi Bhosale',
    fatherName: 'Vitthal Bhosale',
    village: 'Hadapsar',
    district: 'Pune',
    surveyNo: '89/4A',
    landArea: '1.5 acres',
    boundaries: {
      north: 'Cooperative Society',
      south: 'Main Road',
      east: 'Anand Mane',
      west: 'Public Well',
    },
    status: 'pending',
    submittedAt: '2024-01-20T16:45:00Z',
    documentUrl: 'mock-patta-4.pdf',
  },
  {
    id: 'CLM005',
    userId: 'citizen_5',
    name: 'Sanjay Kamble',
    fatherName: 'Dnyaneshwar Kamble',
    village: 'Wagholi',
    district: 'Pune',
    surveyNo: '234/1B',
    landArea: '4.1 acres',
    boundaries: {
      north: 'River Bank',
      south: 'Shivaji Patil',
      east: 'Village Pond',
      west: 'Gram Panchayat Land',
    },
    status: 'approved',
    submittedAt: '2024-01-08T11:00:00Z',
    documentUrl: 'mock-patta-5.pdf',
  },
  {
    id: 'CLM006',
    userId: 'citizen_6',
    name: 'Rekha Jadhav',
    fatherName: 'Balasaheb Jadhav',
    village: 'Katraj',
    district: 'Pune',
    surveyNo: '67/2C',
    landArea: '2.8 acres',
    boundaries: {
      north: 'School Compound',
      south: 'Nilesh Pawar',
      east: 'Temple Land',
      west: 'Forest Area',
    },
    status: 'pending',
    submittedAt: '2024-01-22T13:30:00Z',
    documentUrl: 'mock-patta-6.pdf',
  },
  {
    id: 'CLM007',
    userId: 'citizen_7',
    name: 'Anil Gaikwad',
    fatherName: 'Hanumant Gaikwad',
    village: 'Hinjewadi',
    district: 'Pune',
    surveyNo: '178/5A',
    landArea: '1.2 acres',
    boundaries: {
      north: 'IT Park Boundary',
      south: 'Residential Plot',
      east: 'Drainage Line',
      west: 'Mahesh Kulkarni',
    },
    status: 'rejected',
    submittedAt: '2024-01-03T08:20:00Z',
    documentUrl: 'mock-patta-7.pdf',
  },
  {
    id: 'CLM008',
    userId: 'citizen_8',
    name: 'Vandana Shinde',
    fatherName: 'Govind Shinde',
    village: 'Warje',
    district: 'Pune',
    surveyNo: '45/6B',
    landArea: '3.5 acres',
    boundaries: {
      north: 'Highway',
      south: 'Agricultural Land',
      east: 'Water Tank',
      west: 'Santosh More',
    },
    status: 'approved',
    submittedAt: '2024-01-12T15:10:00Z',
    documentUrl: 'mock-patta-8.pdf',
  },
  {
    id: 'CLM009',
    userId: 'citizen_9',
    name: 'Ravi Thorat',
    fatherName: 'Pandurang Thorat',
    village: 'Kondhwa',
    district: 'Pune',
    surveyNo: '123/7C',
    landArea: '2.1 acres',
    boundaries: {
      north: 'Electricity Substation',
      south: 'Kishor Patil',
      east: 'Bus Stop',
      west: 'Community Hall',
    },
    status: 'pending',
    submittedAt: '2024-01-25T12:00:00Z',
    documentUrl: 'mock-patta-9.pdf',
  },
  {
    id: 'CLM010',
    userId: 'citizen_10',
    name: 'Priya Sawant',
    fatherName: 'Ramchandra Sawant',
    village: 'Undri',
    district: 'Pune',
    surveyNo: '89/3D',
    landArea: '1.9 acres',
    boundaries: {
      north: 'Nursery School',
      south: 'Health Center',
      east: 'Vishnu Kale',
      west: 'Market Area',
    },
    status: 'pending',
    submittedAt: '2024-01-28T14:25:00Z',
    documentUrl: 'mock-patta-10.pdf',
  },
];

export const mockSchemes: Scheme[] = [
  {
    id: 'SCH001',
    title: 'Land Development Support',
    description: 'Financial assistance for land development and agricultural improvements',
    amount: '₹6,000',
    eligibility: 'Approved Patta holders with land area < 5 acres',
  },
  {
    id: 'SCH002',
    title: 'Forest Rights Compensation',
    description: 'Compensation for forest land rights recognition',
    amount: '₹12,000',
    eligibility: 'Traditional forest dwellers with recognized rights',
  },
  {
    id: 'SCH003',
    title: 'Agricultural Equipment Subsidy',
    description: 'Subsidy for purchasing agricultural equipment and tools',
    amount: '₹8,500',
    eligibility: 'All approved claimants engaged in farming',
  },
];

export const extractedData = {
  name: 'Rajesh Kumar Patel',
  fatherName: 'Kishan Lal Patel',
  village: 'Wadgaon',
  district: 'Pune',
  surveyNo: '47/2B',
  landArea: '2.5 acres',
  boundaries: {
    north: 'Ramesh Kulkarni',
    south: 'Village Road',
    east: 'Irrigation Canal',
    west: 'Suresh Patil',
  },
};