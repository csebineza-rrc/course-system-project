document.getElementById("course-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const yearValue = document.getElementById("year").value.trim();

  const courseData = {
    courseName: document.getElementById("courseName").value,
    courseCode: document.getElementById("courseCode").value,
    program: document.getElementById("program").value || null,
    year: yearValue === "" ? null : Number(yearValue),
    description: document.getElementById("description").value
  };

  try {
    const res = await fetch("http://localhost:3000/api/v1/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    document.getElementById("course-status").innerText = result.message;

  } catch (error) {
    document.getElementById("course-status").innerText = "Error creating course.";
  }
});
