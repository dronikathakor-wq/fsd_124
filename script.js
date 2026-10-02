/*
 * script.js — KBT College of Engineering
 *
 * FIX: The original script crashed with "Cannot read properties of null"
 * whenever this file was loaded on a page that didn't contain both
 * #registerForm AND #loginForm.  All event-listener registrations are
 * now wrapped in null-checks so the file is safe to include anywhere.
 *
 * login.html and registration.html each have their own inline scripts
 * that handle their specific forms.  This file is retained for
 * index.html compatibility and any future shared utilities.
 */

/* ── Navigation fix ────────────────────────────────────────────
 *
 * index.html uses <a href="#login"> and <a href="#Register"> in its
 * nav bar.  These are hash/anchor links that stay on the same page
 * rather than navigating to login.html or registration.html.
 *
 * CONSTRAINT: index.html must not be modified.
 *
 * FIX: We intercept clicks on those specific anchor links and
 * redirect the browser to the correct pages instead.  This is
 * transparent to the user and requires no change to index.html.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Find every <a> whose href ends with #login or #Register
    const navLinks = document.querySelectorAll('a[href="#login"], a[href="#Register"]');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.getAttribute('href') === '#login') {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'registration.html';
            }
        });
    });
});


/* ── Shared validation utilities ──────────────────────────────── */

/**
 * Returns true when `email` looks like a valid email address.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Returns true when `password` meets the strength requirements:
 *   – at least 8 characters
 *   – at least one uppercase letter
 *   – at least one lowercase letter
 *   – at least one digit
 *   – at least one special character from !@#$%^&*
 * @param {string} password
 * @returns {boolean}
 */
function validatePassword(password) {
    return password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*]/.test(password);
}


/* ── Registration form (only wires up when the element exists) ─ */
const registerFormEl = document.getElementById('registerForm');

if (registerFormEl) {
    registerFormEl.addEventListener('submit', function (event) {
        event.preventDefault();

        const name            = document.getElementById('regName').value.trim();
        const email           = document.getElementById('regEmail').value.trim();
        const password        = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const message         = document.getElementById('registerMessage');

        if (name === '') {
            message.style.color = 'red';
            message.textContent = 'Full Name is required.';
            return;
        }

        if (!validateEmail(email)) {
            message.style.color = 'red';
            message.textContent = 'Enter a valid email address.';
            return;
        }

        if (!validatePassword(password)) {
            message.style.color = 'red';
            message.textContent =
                'Password must contain minimum 8 characters with uppercase, lowercase, number and special character.';
            return;
        }

        if (password !== confirmPassword) {
            message.style.color = 'red';
            message.textContent = 'Passwords do not match.';
            return;
        }

        message.style.color = 'green';
        message.textContent = 'Registration successful!';
        registerFormEl.reset();
    });
}


/* ── Login form (only wires up when the element exists) ───────── */
const loginFormEl = document.getElementById('loginForm');

if (loginFormEl) {
    loginFormEl.addEventListener('submit', function (event) {
        event.preventDefault();

        const email    = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const message  = document.getElementById('loginMessage');

        if (email === '' || password === '') {
            message.style.color = 'red';
            message.textContent = 'All fields are required.';
            return;
        }

        if (!validateEmail(email)) {
            message.style.color = 'red';
            message.textContent = 'Enter a valid email address.';
            return;
        }

        message.style.color = 'green';
        message.textContent = 'Login successful!';
        loginFormEl.reset();
    });
}
