// Load courses into dropdown
async function loadCourses() {
  const res = await fetch("http://localhost:3000/api/courses");
  const courses = await res.json();

  const select = document.getElementById("course-select");
  courses.forEach(course => {
    select.innerHTML += `<option value="${course.id}">${course.courseName} (${course.courseCode})</option>`;
  });
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
    document.getElementById("enroll-status").innerText = result.message;

  } catch (error) {
    document.getElementById("enroll-status").innerText = "Error enrolling student.";
  }
});
