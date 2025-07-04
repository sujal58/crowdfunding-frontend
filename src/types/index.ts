export type Role = {
    id: number;
    name: string;
  }

  export type Campaign = {
    id: number;
    title: string;
    creator: string;
    email: string;
    goal: string;
    status: 'Active' | 'Pending' | 'Suspended';
    submissionDate: string;
  }
  
  
  export type Fund = {
    id: number;
    campaign: string;
    campaigner: string;
    amount: string;
    releaseDate?: string; 
    scheduledDate?: string; 
    status: 'Released' | 'Pending' | 'Held' | 'Canceled';
  }
  