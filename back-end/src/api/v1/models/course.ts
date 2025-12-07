/**
 * Represents a course that students can enroll in.
 */
export interface Course {
  id: string;                 
  courseName: string;
  courseId: string;        
  credits: number;           
  instructor: string;
  roomNumber?: string;         
  deliveryFormat: 'in-person' | 'online' | 'hybrid';
  cost: number;  
}
