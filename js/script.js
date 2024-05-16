const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.getElementById('signup-form');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
        showToast('Please enter details', 'warning');
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
        showToast(result.message, response.ok ? 'success' : 'error');

        if (response.ok) {
            // Clear the form fields
            signupForm.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Internal server error', 'error');
    }
});

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

    // Show the appropriate icon
    successIcon.style.display = type === 'success' ? 'block' : 'none';
    errorIcon.style.display = type === 'error' ? 'block' : 'none';
    warningIcon.style.display = type === 'warning' ? 'block' : 'none';
    
    // Reset the progress bar
    toastProgress.style.width = '100%';
    toastProgress.style.transition = 'none';

    // Trigger reflow to restart animation
    void toastProgress.offsetWidth;

    // Animate the progress bar
    toastProgress.style.transition = 'width 3s linear';
    toastProgress.style.width = '0%';

    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000); // Show for 3 seconds
}

// Close toast on clicking the close button
document.querySelector('.toast-close').addEventListener('click', function() {
    document.getElementById('toast-default').style.display = 'none';
});
