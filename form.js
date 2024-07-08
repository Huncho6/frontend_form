const nameError = document.getElementById("name-error");
const passwordError = document.getElementById("password-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const submitError = document.getElementById("submit-error");

function validateName() {
    const name = document.getElementById("fname").value;
    if (name.length === 0) {
        nameError.innerHTML = "Full name is required";
        nameError.classList.add("text-red-500");
        return false;
    }
    if (!name.match(/^[A-Za-z]+\s[A-Za-z]+$/)) {
        nameError.innerHTML = "Full name must contain first and last name";
        nameError.classList.add("text-red-500");
        return false;
    }
    nameError.innerHTML = '<ion-icon class="valid text-green-500" name="checkmark-circle"></ion-icon>';
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value;
    if (email.length == 0) {
        emailError.innerHTML = "Email is required";
        emailError.classList.add("text-red-500");
        return false;
    }
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
        emailError.innerHTML = "Invalid email format";
        emailError.classList.add("text-red-500");
        return false;
    }
    emailError.innerHTML = '<ion-icon class="valid text-green-500" name="checkmark-circle"></ion-icon>';
    return true;
}

function validatePhone() {
    const phone = document.getElementById("phone").value;
    if (phone.length == 0) {
        phoneError.innerHTML = "Phone number is required";
        phoneError.classList.add("text-red-500");
        return false;
    }
    if (phone.length !== 10) {
        phoneError.innerHTML = "Phone number must be 10 digits";
        phoneError.classList.add("text-red-500");
        return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = "Phone number must contain only numbers";
        phoneError.classList.add("text-red-500");
        return false;
    }
    phoneError.innerHTML = '<ion-icon class="valid text-green-500" name="checkmark-circle"></ion-icon>';
    return true;
}

function validatePassword() {
    const password = document.getElementById("pass").value;
    if (password.length < 8) {
        passwordError.innerHTML = "Password must be at least 8 characters";
        passwordError.classList.add("text-red-500");
        return false;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/;
    if (!password.match(passwordRegex)) {
        passwordError.innerHTML = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        passwordError.classList.add("text-red-500");
        return false;
    }
    passwordError.innerHTML = '<ion-icon class="valid text-green-500" name="checkmark-circle"></ion-icon>';
    return true;
}

function validateForm(event) {
  event.preventDefault();
  const form = document.getElementById("formBody");
  if (!validateName() || !validateEmail() || !validatePhone() || !validatePassword()) {
      submitError.innerText = "Please fill properly";
      return false;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch("http://localhost:45/data", {
      method: "POST",
      body: formData
    })
      .then((response) => {
          if (!response.ok) {
              return response.json().then((errorData) => {
                  throw new Error(JSON.stringify(errorData));
              });
          }
          return response.json();
      })
      .then((result) => {
          alert("Submitted: " + JSON.stringify(result));
      })
      .catch((error) => {
          console.error("Fetch operation error:", error);
      });
};

function fetchData() {
  fetch('http://localhost:45/data', {
      method: "GET",
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      displayData(data);
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
}

function displayData(data) {
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerHTML = ''; // Clear previous data

  data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('data-item','bg-black','text-primarycolor','rounded', 'shadow-md', 'p-4', 'mb-4','mr-[20px]','ml-[20px]');
      div.innerHTML = `
          <p>${item.imagePath ? `<img src="http://localhost:45${item.imagePath}" alt="Uploaded Image">` : 'No image uploaded'}</p>
          <p>Full Name: ${item.fullName}</p>
          <p>Email: ${item.email}</p>
          <p>Phone: ${item.phone}</p>
          <p>Password: ${item.password}</p>
      `;
      dataContainer.appendChild(div);
  });
}

// Fetch data when the page loads
window.onload = fetchData;







