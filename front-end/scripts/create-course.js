document.getElementById("course-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const courseData = {
    courseName: document.getElementById("courseName").value,
    courseCode: document.getElementById("courseCode").value,
    program: document.getElementById("program").value || null,
    year: parseInt(document.getElementById("year").value) || null,
    description: document.getElementById("description").value
  };

  try {
    const res = await fetch("http://localhost:3000/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData)
    });

    const result = await res.json();
    document.getElementById("course-status").innerText = result.message;

  } catch (error) {
    document.getElementById("course-status").innerText = "Error creating course.";
  }
});
