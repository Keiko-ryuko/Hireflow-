export type UserRole = 'admin' | 'hr_manager' | 'recruiter' | 'interviewer' | 'viewer';

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  organizationId: string;
}

export type JobStatus = 'draft' | 'published' | 'closed';

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  status: JobStatus;
  organizationId: string;
  createdAt: string;
}

export type CandidateStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string;
  resumeText?: string;
  jobId: string;
  stage: CandidateStage;
  aiScore?: number;
  aiRecommendation?: string;
  organizationId: string;
  createdAt: string;
}

export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Interview {
  id: string;
  candidateId: string;
  jobId: string;
  interviewerIds: string[];
  startTime: string;
  endTime: string;
  status: InterviewStatus;
  feedback?: string;
}
