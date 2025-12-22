// Load courses into dropdown
async function loadCourses() {
  try {
    const res = await fetch("http://localhost:3000/api/courses");

    if (!res.ok) {
      throw new Error(`Failed to load courses: ${res.status} ${res.statusText}`);
    }

    const courses = await res.json();

    const select = document.getElementById("course-select");
    if (!select) {
      return;
    }

    courses.forEach(course => {
      select.innerHTML += `<option value="${course.id}">${course.courseName} (${course.courseCode})</option>`;
    });
  } catch (error) {
    console.error("Error loading courses:", error);
    const select = document.getElementById("course-select");
    if (select) {
      select.innerHTML = `<option value="">Failed to load courses</option>`;
    }
    const statusEl = document.getElementById("enroll-status");
    if (statusEl) {
      statusEl.innerText = "Error loading courses. Please try again later.";
    }
  }
}

loadCourses();

// Handle form submission
document.getElementById("enroll-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const enrollmentData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    program: document.getElementById("program").value,
    programYear: parseInt(document.getElementById("programYear").value),
    courseId: document.getElementById("course-select").value
  };

  try {
    const res = await fetch("http://localhost:3000/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrollmentData)
    });

    const result = await res.json();

    if (!res.ok) {
      const errorMessage = result && result.message ? result.message : "Error enrolling student.";
      document.getElementById("enroll-status").innerText = errorMessage;
      return;
    }
    document.getElementById("enroll-status").innerText = result.message;

  } catch (error) {
    console.error("Error enrolling student:", error);
    const message = (error && error.message) ? error.message : "Error enrolling student.";
    document.getElementById("enroll-status").innerText = message.startsWith("Error enrolling student")
      ? message
      : `Error enrolling student: ${message}`;
  }
});
