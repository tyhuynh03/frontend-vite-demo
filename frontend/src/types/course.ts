export interface Course {
  id: number;
  title: string;
  introduction: string;
  requirements: string;
  objectives: string;
  content: string;
  exercises: string;
  progress_schedule: string;
  notes: string;
  created_by: number | null;
  created_by_username: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CourseFormData {
  title: string;
  introduction: string;
  requirements: string;
  objectives: string;
  content: string;
  exercises: string;
  progress_schedule: string;
  notes: string;
}
