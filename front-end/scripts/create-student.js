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

    const statusElement = document.getElementById("student-status");

    if (!res.ok) {
      let errorMessage = "Error creating student.";
      try {
        const errorResult = await res.json();
        if (errorResult && errorResult.message) {
          errorMessage = errorResult.message;
        }
      } catch (parseError) {
        // Ignore JSON parse errors and fall back to the default message
      }
      statusElement.innerText = errorMessage;
      return;
    }

    const result = await res.json();
    statusElement.innerText = result && result.message ? result.message : "Student created successfully.";

  } catch (error) {
    document.getElementById("student-status").innerText = "Error creating student.";
  }
});
