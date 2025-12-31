import { Course } from "../models/course";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// Firestore collection name
const COLLECTION: string = "courses";

/**
 * Retrieves all courses created from Firestore
 * @returns Array of all Courses
 */
export const getAllCourses = async (): Promise<Course[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const Courses: Course[] = snapshot.docs.map((doc: any) => {
            const data = doc.data();
            return {
                id: doc.id,
                courseName: data.courseName,
                courseId: data.courseId,
                credits: data.courseId,
                instructor: data.instructor,
                roomNumber: data.roomNumber,
                deliveryFormat: data.deliveryFormat,
                cost: data.cost

            } as Course;
        });

        return Courses;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new course in Firestore
 * @param courseData - The data for the new Course
 * @returns The created Course with generated ID
 */
export const createNewCourse = async (courseData: {
    courseName: string;
    courseId: string;        
    credits: number;           
    instructor: string;
    roomNumber?: string;         
    deliveryFormat: 'in-person' | 'online' | 'hybrid';
    cost: number;  
}): Promise<Course> => {
    try {
        const now = new Date();
        const newCourseData = {
            ...courseData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Course>(COLLECTION, newCourseData);
        return { 
            id: (id), 
            courseName: newCourseData.courseName,
            courseId: newCourseData.courseId,
            credits: newCourseData.credits,
            instructor: newCourseData.instructor,
            roomNumber: newCourseData.roomNumber,
            deliveryFormat: newCourseData.deliveryFormat,
            cost: newCourseData.cost
        } as Course;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an existing course that was created in Firestore
 * @param id - The ID of the Course to update
 * @param courseData - The fields to update
 * @returns The updated Course
 * @throws Error if Course is not found
 */
/**
 * Updates an existing course that was created in Firestore
 * @param id - The ID of the Course to update
 * @param courseData - The fields to update
 * @returns The updated Course
 * @throws Error if Course is not found
 */
export const updateCourse = async (
  id: string,
  courseData: Partial<
    Pick<
      Course,
      | "courseName"
      | "courseId"
      | "credits"
      | "instructor"
      | "roomNumber"
      | "deliveryFormat"
      | "cost"
    >
  >
): Promise<Course> => {
  const updateData = {
    ...courseData,
    updatedAt: new Date(),
  };

  await updateDocument<Course>(COLLECTION, id, updateData);

  return await getCourseById(id);
};



/**
 * Retrieves a single course by ID from Firestore
 * @param id - The ID of the Course to retrieve
 * @returns The Course if found
 * @throws Error if Course not found
 */
export const getCourseById = async (id: string): Promise<Course> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Course with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
            throw new Error(`Course with ID ${id} not found`);
        }

        const Course: Course = {
            id: (doc.id),
            courseName: data.courseName,
            courseId: data.courseId,
            credits: data.courseId,
            instructor: data.instructor,
            roomNumber: data.roomNumber,
            deliveryFormat: data.coursedeliveryFormat,
            cost: data.cost   
        } as Course;

        return Course;
    } catch (error) {
        throw error;
    }
};


/**
 * Deletes a single course from Firestore
 * @param id - The ID of the Course to delete
 * @throws Error if Course not found
 */
export const deleteCourse = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Course with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};
