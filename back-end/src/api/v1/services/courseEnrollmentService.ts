import { Database } from "../../../database";
import { CourseEnrollment } from "../models/courseEnrollment";

const db = new Database();

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function enrollStudent(studentId: string, courseId: string): Promise<CourseEnrollment> {
    const enrollment = {
        id: generateId(),
        studentId,
        courseId,
        enrolledAt: new Date(),
        status: "active",
    };

    await db.insert("course_enrollments", enrollment);
    return enrollment;
}

export async function getStudentEnrollments(studentId: string): Promise<CourseEnrollment[]> {
    return db.query("course_enrollments", { studentId });
}

export async function getCourseEnrollments(courseId: string): Promise<CourseEnrollment[]> {
    return db.query("course_enrollments", { courseId });
}

export async function unenrollStudent(studentId: string, courseId: string): Promise<boolean> {
    return db.delete("course_enrollments", { studentId, courseId });
}

export async function getEnrollmentStatus(studentId: string, courseId: string): Promise<CourseEnrollment | null> {
    const result = await db.queryOne("course_enrollments", { studentId, courseId });
    return result || null;
}