// Get the CSRF token from the cookie
const getCsrfToken = () => {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (const cookie of cookieArray) {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.indexOf(name) === 0) {
            return trimmedCookie.substring(name.length);
        }
    }
    return '';
};

// NB: check out the backend API endpoints before sending or making  a new request to the backend containing the token  of the CSRF Protection to ensure the CSRF Protection API setup on the backend in fully functional and in sync with the frontend. 

// Use the token in a fetch request
const csrfToken = getCsrfToken();

fetch('/api/sensitive-action', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken, // Include CSRF token in headers
    },
    body: JSON.stringify({ /* your payload */ }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
