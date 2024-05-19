const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = signupForm.name.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    if (!name || !email || !password) {
        showToast('Please enter all details', 'warning');
        return;
    }

    if (!validatePassword(password)) {
        showToast('Password must be at least 8 characters long and include at least one number, one special character, and one uppercase letter.', 'warning');
        return;
    }

    const data = { name, email, password };

    try {
        const response = await fetch('http://localhost:5500/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            showToast(result.message, 'success');
            setTimeout(() => {
                container.classList.remove('active'); // Switch to the sign-in form after 1 second
            }, 1000); // Delay of 1 second
        } else {
            showToast(result.message || 'Error occurred', 'error');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showToast('Internal server error', 'error');
    }
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('Please enter all details', 'warning');
        return;
    }

    const data = { email, password };

    try {
        const response = await fetch('http://localhost:5500/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            showToast(result.message, 'success');
            setTimeout(() => {
                window.location.href = 'Home.html'; // Redirect to Home.html after 1 second
            }, 1000); // Delay of 1 second
        } else {
            showToast(result.message || 'Incorrect email or password', 'error');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showToast('Internal server error', 'error');
    }
});

function validatePassword(password) {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasUpperCase = /[A-Z]/;

    return password.length >= minLength &&
           hasNumber.test(password) &&
           hasSpecialChar.test(password) &&
           hasUpperCase.test(password);
}

function showToast(message, type) {
    const toast = document.getElementById('toast-default');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    const toastProgress = toast.querySelector('.toast-progress');
    const successIcon = toast.querySelector('.success-icon');
    const errorIcon = toast.querySelector('.error-icon');
    const warningIcon = toast.querySelector('.warning-icon');
    
    toastTitle.textContent = type === 'success' ? 'Success' :
                              type === 'error' ? 'Error Occurred' :
                              'Action Required';
    toastMessage.textContent = message;
    
    toast.className = `toast-container ${type}`;
    toast.style.display = 'flex';

    successIcon.style.display = type === 'success' ? 'block' : 'none';
    errorIcon.style.display = type === 'error' ? 'block' : 'none';
    warningIcon.style.display = type === 'warning' ? 'block' : 'none';
    
    toastProgress.style.width = '100%';
    toastProgress.style.transition = 'none';

    void toastProgress.offsetWidth;

    toastProgress.style.transition = 'width 3s linear';
    toastProgress.style.width = '0%';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function() {
        const passwordField = this.previousElementSibling;
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

document.querySelectorAll('input[type="password"]').forEach(input => {
    const togglePasswordIcon = input.nextElementSibling;
    input.addEventListener('input', function() {
        if (this.value.length > 0) {
            togglePasswordIcon.style.display = 'block';
        } else {
            togglePasswordIcon.style.display = 'none';
        }
    });
    input.addEventListener('focus', function() {
        if (this.value.length > 0) {
            togglePasswordIcon.style.display = 'block';
        }
    });
    input.addEventListener('blur', function() {
        if (this.value.length === 0) {
            togglePasswordIcon.style.display = 'none';
        }
    });
});
