document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        const userStatusButton = event.target.closest('#user-status > a');
        if (userStatusButton) {
            event.preventDefault();
            if (userStatusButton.getAttribute('href') === 'auth/login.html') {
                // If it's a login link, navigate to the login page
                window.location.href = '/auth/login.html';
            } else {
                // Otherwise, toggle the dropdown
                const dropdown = userStatusButton.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    dropdown.classList.toggle('show');
                }
            }
        } else if (!event.target.closest('#user-status')) {
            const dropdowns = document.querySelectorAll('#user-status .dropdown');
            dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
        }
    });
});