const form = document.getElementById('secureForm');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const popupClose = document.getElementById('popupClose');

// Hide popup when the page loads
window.addEventListener('load', () => {
    popup.style.display = 'none'; // Ensure the popup is hidden when the page is loaded
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission for validation

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let message = '';

    // Validation checks
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        message = 'All fields are required!';
    } else if (!emailRegex.test(email)) {
        message = 'Please enter a valid email address.';
    } else if (password !== confirmPassword) {
        message = 'Passwords do not match.';
    }

    if (message) {
        showPopup(message, 'error');
    } else {
        showPopup('Form submitted successfully!', 'success');
        form.reset(); // Reset form fields on success
    }
});

popupClose.addEventListener('click', () => {
    popup.style.display = 'none'; // Hide popup when close button is clicked
});

// Show popup with message and type (success or error)
function showPopup(message, type) {
    popupMessage.innerText = message;
    popup.className = `popup ${type}`;
    popup.style.display = 'block'; // Show popup
    // setTimeout(() => {
    //     popup.style.display = 'none'; // Auto-close popup after 3 seconds
    // }, 3000);
}

const passwordInput = document.getElementById('password');
const passwordEmoji = document.getElementById('passwordEmoji');

// Listen for typing in the password field
passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length > 0) {
        passwordEmoji.classList.add('animated'); // Add animation class when typing starts
    } else {
        passwordEmoji.classList.remove('animated'); // Remove animation if input is empty
    }
});

