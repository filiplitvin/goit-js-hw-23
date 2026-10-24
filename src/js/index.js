const getStudentsBtn = document.querySelector("#get-students-btn");
const studentsBody = document.querySelector("#students-table tbody");

const addStudentForm = document.querySelector("#add-student-form");

const name = document.querySelector("#name");
const age = document.querySelector("#age");
const course = document.querySelector("#course");
const skills = document.querySelector("#skills");
const email = document.querySelector("#email");
const isEnrolled = document.querySelector("#isEnrolled");

const createMarkup = (students) => {
  return students
    .map(
      (student) => `
        <tr data-id="${student.id}">
          <th>${student.id}</th>
          <th>${student.name}</th>
          <th>${student.age}</th>
          <th>${student.course}</th>
          <th>${student.skills.join(", ")}</th>
          <th>${student.email}</th>
          <th>${student.isEnrolled}</th>
          <th>
            <button class="delete-btn" data-id="${student.id}">
              Видалити
            </button>
          </th>
        </tr>
      `
    )
    .join("");
};

const renderStudents = (students) => {
  studentsBody.innerHTML = createMarkup(students);
};

const getStudents = async () => {
  const url = "http://localhost:3000/students";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.statusText}`);
    }
    const data = await response.json();
    renderStudents(data);
  } catch (error) {
    console.log(error);
  }
};

const createStudent = async (student) => {
  const url = "http://localhost:3000/students";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = async (id, student) => {
  const url = `http://localhost:3000/students/${id}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (id) => {
  const url = `http://localhost:3000/students/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error ${response.statusText}`);
    }
    getStudents();
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const newStudent = {
    name: name.value,
    age: age.value,
    course: course.value,
    skills: skills.value.split(","),
    email: email.value,
    isEnrolled: isEnrolled.checked,
  };
  createStudent(newStudent);
  addStudentForm.reset();
};

const handleDelete = (event) => {
  if (event.target.classList.contains("delete-btn")) {
    deleteStudent(event.target.dataset.id);
  }
};

getStudentsBtn.addEventListener("click", getStudents);
addStudentForm.addEventListener("submit", handleSubmit);
studentsBody.addEventListener("click", handleDelete);
