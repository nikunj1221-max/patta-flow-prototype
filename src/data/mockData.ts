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