/**
 * Represents a student's enrollment in a specific course.
 * 
 * This model links a student to a course and stores details about 
 * the student's program and the course they are registering for.
 * 
 * A CourseEnrollment record is created whenever a student 
 * successfully enrolls in a course.
 */
export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseName: string;  
  courseId: string; 
  semester: string;
  enrolledAt: Date;
}
