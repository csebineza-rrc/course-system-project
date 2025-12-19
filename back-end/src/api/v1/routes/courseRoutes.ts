import { Router, Request, Response } from "express";

const router = Router();

// TEMP in-memory course list (for testing)
const courses: any[] = [];

/**
 * GET /api/courses
 * Get all courses
 */
router.get("/", (req: Request, res: Response) => {
  res.json(courses);
});

/**
 * POST /api/courses
 * Create a new course
 */
router.post("/", (req: Request, res: Response) => {
  const { courseName, courseCode, description } = req.body;

  if (!courseName || !courseCode) {
    return res.status(400).json({ message: "courseName and courseCode are required" });
  }

  const newCourse = {
    id: Date.now().toString(),
    courseName,
    courseCode,
    description: description || ""
  };

  courses.push(newCourse);

  res.status(201).json({
    message: "Course created successfully",
    course: newCourse
  });
});

export default router;
