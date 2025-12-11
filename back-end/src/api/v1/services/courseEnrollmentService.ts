import { Database } from "../../../database";
import { CourseEnrollment } from "../models/courseEnrollment";

export class CourseEnrollmentService {
    constructor(private db: Database) {}

    async enrollStudent(studentId: string, courseId: string): Promise<CourseEnrollment> {
        const enrollment = {
            id: this.generateId(),
            studentId,
            courseId,
            enrolledAt: new Date(),
            status: "active",
        };

        await this.db.insert("course_enrollments", enrollment);
        return enrollment;
    }

    async getStudentEnrollments(studentId: string): Promise<CourseEnrollment[]> {
        return this.db.query("course_enrollments", { studentId });
    }

    async getCourseEnrollments(courseId: string): Promise<CourseEnrollment[]> {
        return this.db.query("course_enrollments", { courseId });
    }

    async unenrollStudent(studentId: string, courseId: string): Promise<boolean> {
        return this.db.delete("course_enrollments", { studentId, courseId });
    }

    async getEnrollmentStatus(studentId: string, courseId: string): Promise<CourseEnrollment | null> {
        const result = await this.db.queryOne("course_enrollments", { studentId, courseId });
        return result || null;
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}