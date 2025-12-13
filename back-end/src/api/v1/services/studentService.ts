import { Student } from "../models/student";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// Firestone collection name
const COLLECTION: string = "student";

/**
 * Retrieves all students from Firestore
 * @returns Array of all Students
 */
export const getAllCourses = async (): Promise<Student[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const Courses: Student[] = snapshot.docs.map((doc: any) => {
            const data = doc.data();
            return {
                id: doc.id,
                studentId: data.studentId,
                fullName: data.fullName,
                email: data.email,
                program: data.program,
                programYear: data.programYear
            } as Student;
        });

        return Courses;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new course in Firestore
 * @param courseData - The data for the new Student
 * @returns The created Student with generated ID
 */
export const CreateNewCourse = async (courseData: {
    studentId: number;
    fullName: string;
    email: string;
    program: string;
    programYear: number;
}): Promise<Student> => {
    try {
        const now = new Date();
        const newCourseData = {
            ...courseData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Student>(COLLECTION, newCourseData);
        return { 
            id: (id), 
            studentId: newCourseData.studentId,
            fullName: newCourseData.fullName,
            email: newCourseData.email,
            program: newCourseData.program,
            programYear: newCourseData.programYear
        } as Student;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an existing student in Firestore
 * @param id - The ID of the Student to update
 * @param studentData - The fields to update
 * @returns The updated Student
 * @throws Error if Student is not found
 */
export const updateCourse = async (
    id: string,
    studentData: Pick<Student, "studentId" | "fullName" | "email" | "program" | "programYear">
): Promise<Student> => {
    try {
        const updateData = {
            ...studentData,
            updatedAt: new Date(),
        };

        await updateDocument<Student>(COLLECTION, id, updateData);

        // Return the updated Student
        const updatedCourse = await getCourseById(id);
        return updatedCourse;
    } catch (error) {
        throw error;
    }
};


/**
 * Retrieves a single student by ID from Firestore
 * @param id - The ID of the Student to retrieve
 * @returns The Student if found
 * @throws Error if Student not found
 */
export const getCourseById = async (id: string): Promise<Student> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Student with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
            throw new Error(`Student with ID ${id} not found`)
        }

        const Student: Student = {
            id: (doc.id),
            studentId: data.studentId,
            fullName: data.fullName,
            email: data.email,
            program: data.program,
            programYear: data.programYear
        } as Student;

        return Student;
    } catch (error) {
        throw error;
    }
};


/**
 * Deletes a single course from Firestore
 * @param id - The ID of the Student to delete
 * @throws Error if Student not found
 */
export const deleteStudent = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Student with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw new Error(`Error in deleteCourse (id: ${id}): ${error instanceof Error ? error.message : error}`);
    }
};
