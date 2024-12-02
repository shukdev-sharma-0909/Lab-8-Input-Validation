const form = document.getElementById('secureForm');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const popupClose = document.getElementById('popupClose');

// Ensure the popup is hidden when the page loads
window.addEventListener('load', () => {
    popup.style.display = 'none';
});

// Listen for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get input values
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
        confirmPassword: document.getElementById('confirmPassword').value.trim(),
    };

    const validationMessage = validateForm(formData);

    if (validationMessage) {
        showPopup(validationMessage, 'error');
    } else {
        // Simulate a successful form submission
        showPopup('Form submitted successfully!', 'success');
        form.reset(); // Reset form after submission
    }
});

// Close the popup when the close button is clicked
popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Show popup with the specified message and type (success or error)
function showPopup(message, type) {
    popupMessage.innerText = message;
    popup.className = `popup ${type}`;
    popup.style.display = 'block';
}

// Validate form data on the client-side
function validateForm({ firstName, lastName, email, password, confirmPassword }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return 'All fields are required!';
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    }

    // Validate password length
    if (password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return 'Passwords do not match.';
    }

    // Check for malicious script tags or inline event handlers
    if (containsScriptOrEventHandlers(firstName, lastName, email, password, confirmPassword)) {
        return 'Invalid input: Script tags or event handlers are not allowed.';
    }

    return null; // No validation errors
}

// Function to check for script tags or event handlers
function containsScriptOrEventHandlers(...inputs) {
    const forbiddenPatterns = [
        /<script.*?>.*?<\/script>/i,    // Script tags
        /on\w+=".*?"/i,                 // Inline event handlers (onmouseover, onclick, etc.)
        /javascript:/i                  // 'javascript:' pseudo-protocol in links
    ];

    return inputs.some(input => {
        return forbiddenPatterns.some(pattern => pattern.test(input));
    });
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input) {
    const tempDiv = document.createElement('div');
    tempDiv.innerText = input; // Use innerText to escape HTML characters
    return tempDiv.innerHTML; // Return the sanitized content
}

// Password input interaction for animation (optional feature)
const passwordInput = document.getElementById('password');
const passwordEmoji = document.getElementById('passwordEmoji');

// Add animation when typing starts in the password field
passwordInput?.addEventListener('input', () => {
    if (passwordInput.value.length > 0) {
        passwordEmoji?.classList.add('animated');
    } else {
        passwordEmoji?.classList.remove('animated');
    }
});
