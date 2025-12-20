document.getElementById("student-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    program: document.getElementById("program").value,
    programYear: parseInt(document.getElementById("programYear").value)
  };

  try {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });

    const result = await res.json();
    document.getElementById("student-status").innerText = result.message;

  } catch (error) {
    document.getElementById("student-status").innerText = "Error creating student.";
  }
});
