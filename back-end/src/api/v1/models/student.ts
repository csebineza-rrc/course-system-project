/**
 * Represents a student in the system.
 *
 * This model stores personal and academic information about a student.
 * A student can enroll in multiple courses.
 */
export interface Student {
    id: string;
    studentId: number;
    fullName: string;
    email: string;
    program: string;
    programYear: number;
}
