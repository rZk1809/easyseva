export type Language = 'en' | 'ta' | 'hi';

export type TextSize = 'default' | 'large' | 'xlarge';

export type ContrastMode = 'default' | 'high';

export interface AccessibilitySettings {
  textSize: TextSize;
  contrast: ContrastMode;
  reduceMotion: boolean;
  language: Language;
}

export interface ServiceCategory {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  description: string;
  descriptionTa: string;
  descriptionHi: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  nameTa: string;
  nameHi: string;
  description: string;
  accepted: string[];
  maxSizeMB: number;
  required: boolean;
  examples: string[];
}

export interface Service {
  id: string;
  categoryId: string;
  title: string;
  titleTa: string;
  titleHi: string;
  shortDescription: string;
  shortDescriptionTa: string;
  shortDescriptionHi: string;
  fullDescription: string;
  usedFor: string[];
  estimatedMinutes: number;
  documents: DocumentRequirement[];
  eligibilityCriteria: EligibilityQuestion[];
  fee: string;
  formSteps: FormStep[];
  tags: string[];
}

export interface EligibilityQuestion {
  id: string;
  question: string;
  questionTa: string;
  questionHi: string;
  hint?: string;
  options: EligibilityOption[];
}

export interface EligibilityOption {
  value: string;
  label: string;
  eligible: boolean | null;
  explanation?: string;
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  labelTa?: string;
  type: 'text' | 'number' | 'tel' | 'email' | 'date' | 'select' | 'textarea' | 'radio';
  placeholder?: string;
  helperText?: string;
  example?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
    message?: string;
  };
}

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'documents_verified'
  | 'under_review'
  | 'action_required'
  | 'approved'
  | 'rejected';

export interface ApplicationStatusStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'action_required';
  date?: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface Application {
  id: string;
  referenceNumber: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  status: ApplicationStatus;
  statusLabel: string;
  progress: number;
  submittedAt?: string;
  lastUpdated: string;
  formData?: Record<string, unknown>;
  documents?: UploadedDocument[];
  timeline: ApplicationStatusStep[];
  currentStep?: number;
  totalSteps?: number;
}

export interface UploadedDocument {
  id: string;
  requirementId: string;
  name: string;
  filename: string;
  sizeKB: number;
  uploadedAt: string;
  status: 'uploading' | 'success' | 'error';
  url?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'action';
  title: string;
  message: string;
  applicationId?: string;
  read: boolean;
  createdAt: string;
}

export interface AppState {
  language: Language;
  accessibility: AccessibilitySettings;
  applications: Application[];
  notifications: Notification[];
  currentFormData: Record<string, Record<string, unknown>>;
  uploadedDocuments: Record<string, UploadedDocument[]>;
}
