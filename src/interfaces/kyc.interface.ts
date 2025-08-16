export interface IKycResponse {
  name: string;
  email: string;
  address: string;
  phone: string;
  dob: string;
  documentNumber: string;
  documentType: string;
  documentUrlFront: string;
  documentUrlBack: string;
  imageUrl: string;
  status: string;
  faceMatchScore: number;
  reviewedBy: string;
  reviewedAt: string;
  createdAt: string;
}

export interface IKycRequest {
  name: string;
  email: string;
  address: string;
  phone: string;
  documentNumber: string;
  documentType: string;
  dob: string;
  image: File | null;
  frontDoc: File | null;
  backDoc: File | null;
}

export interface KYCFormData {
  name: string;
  email: string;
  address: string;
  phone: string;
  dob: string;
  documentType: string;
  documentNumber: string;
}

export interface FileState {
  image: File | null;
  frontDoc: File | null;
  backDoc: File | null;
}
