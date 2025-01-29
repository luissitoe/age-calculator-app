const form = document.getElementById('form');
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const btnSubmit = document.getElementById("btnSubmit");


form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get input values
    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    // Create date objects
    let currentDate = new Date();
    let userDate = new Date(year, month - 1, day);
    let isValid = true;

    clearErrorMessage(dayInput);
    clearErrorMessage(monthInput);
    clearErrorMessage(yearInput);


    // Validate day field
    if (!day) {
        displayErrorMessage(dayInput, "This field is required");
        isValid = false;
    }
    if (day < 1 || day > 31) {
        displayErrorMessage(dayInput, "Must be a valid day");
        isValid = false;
    }

    // Validate month field
    if (!month) {
        displayErrorMessage(monthInput, "This field is required");
        isValid = false;
    }
    if (month < 1 || month > 12) {
        displayErrorMessage(monthInput, "Must be a valid month");
        isValid = false;
    }

    // Validate year field
    if (!year) {
        displayErrorMessage(yearInput, "This field is required");
        isValid = false;
    }
    if (year > currentDate.getFullYear()) {
        displayErrorMessage(yearInput, "Must be a valid year");
        isValid = false;
    }

    if(isValid) {
        let years = currentDate.getFullYear() - userDate.getFullYear();
        let months = currentDate.getMonth() - userDate.getMonth();
        let days = currentDate.getDate() - userDate.getDate();
        
        if (days < 0) {
            months--;
            let lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(),0).getDate();
            days += lastDayOfLastMonth;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

       const display =  document.querySelector(".result__display");
       display.querySelector(".years").innerText = years;
       display.querySelector(".months").innerText = months;
       display.querySelector(".days").innerText = days;

        if (userDate.getDate() !== day || userDate.getMonth() + 1 !== month || userDate.getFullYear() !== year) {
            displayErrorMessage(dayInput, `Must be a valid date`);
            displayErrorMessage(monthInput, "");
            displayErrorMessage(yearInput, "");
            isValid = false;
        }
        
    }



})



const displayErrorMessage = (input, errorMessage) => {
    const label = input.parentElement.querySelector('label');
    const error = input.parentElement.querySelector('.error-message');
    label.classList.add('error');
    error.style.display = 'block';
    error.innerText = errorMessage;
    input.classList.add('error');
}

const clearErrorMessage = (input) => {
    const label = input.parentElement.querySelector('label');
    const error = input.parentElement.querySelector('.error-message');
    label.classList.remove('error');
    error.style.display = 'none';
    error.innerText = "";
    input.classList.remove('error');
}


