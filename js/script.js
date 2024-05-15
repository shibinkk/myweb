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
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('http://localhost:5500/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        showToast(result.message, response.ok);

        if (response.ok) {
            // Clear the form fields
            signupForm.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('User already exist', false);
    }
});

function showToast(message, isSuccess) {
    const toast = document.getElementById('toast-default');
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    toast.style.display = 'flex';
    toast.querySelector('.w-4.h-4').style.backgroundColor = isSuccess ? 'green' : 'red';
    
    setTimeout(() => {
        toast.style.display = 'none';
        toast.classList.remove('show');
    }, 3000); // Show for 3 seconds
}
