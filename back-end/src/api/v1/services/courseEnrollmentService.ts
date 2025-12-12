import { CourseEnrollment } from "../models/courseEnrollment";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// Firestone collection name
const COLLECTION: string = "courseEnrollment";

/**
 * Retrieves all courses that the student has enrolled in from Firestore
 * @returns Array of all courses
 */
export const getAllCoursesEnrolled = async (): Promise<CourseEnrollment[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const studentsEnrollement: CourseEnrollment[] = snapshot.docs.map((doc: any) => {
            const data = doc.data();
            return {
                id: doc.id,
                studentId: data.studentId,
                courseName: data.courseName,
                courseId: data.courseId,
                semester: data.semester,
                enrolledAt: data.enrolledAt             
            } as CourseEnrollment;
        });

        return studentsEnrollement;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a single course enrolled by the student using the ID from Firestore
 * @param id - The ID of the course to retrieve
 * @returns The course if found
 * @throws Error if course not found
 */
export const getCourseById = async (id: string): Promise<CourseEnrollment> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Course with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
            throw new Error(`Course with ID ${id} not found`)
        }

        const item: CourseEnrollment = {
            id: (doc.id),
            studentId: data.studentId,
            courseName: data.courseName,
            courseId: data.courseId,
            semester: data.semester,
            enrolledAt: data.enrolledAt
        } as CourseEnrollment;

        return item;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new course enrollment in Firestore
 * @param courseData - The data for the new course
 * @returns The course with a their own generated ID
 */
export const enrollInCourse = async (courseData: {
    studentId:  string,
    courseName: string,
    courseId: string,
    semester: string,
    enrolledAt: Date,
}): Promise<CourseEnrollment> => {
    try {
        const now = new Date();
        const newCourseData = {
            ...courseData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<CourseEnrollment>(COLLECTION, newCourseData);
        return { 
            id: (id), 
            studentId: newCourseData.studentId, 
            courseName: newCourseData.courseName,
            courseId: newCourseData.courseId,
            semester: newCourseData.semester,
            enrolledAt: newCourseData.enrolledAt
         } as CourseEnrollment;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an existing course in Firestore
 * @param id - The ID of course
 * @param courseData - The fields to update
 * @returns The updated fields
 * @throws Error if student not found
 */
export const updateCourseEnrolled = async (
    id: string,
    courseData: Pick<CourseEnrollment, "studentId" | "courseName" | "courseId" | "semester" | "enrolledAt">
): Promise<CourseEnrollment> => {
    try {
        const updateData = {
            ...courseData,
            updatedAt: new Date(),
        };

        await updateDocument<CourseEnrollment>(COLLECTION, id, updateData);

        const updatedCourse = await getCourseById(id);
        return updatedCourse;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a course from Firestore
 * @param id - The ID of the course to delete
 * @throws Error if ID not found
 */
export const deleteCourseEnrolled = async (id: string): Promise<any> => {
    try {
        // Check if Course exists before deleting
        const course = await getDocumentById(COLLECTION, id);

        if (!course) {
            throw new Error(`Course with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);

        return course.data();
    } catch (error) {
        throw error;
    }
};
