function sendRequest(username, email, password) {
    // Example API endpoint (replace with your actual API endpoint)
    // const apiUrl = 'https://example.com/api/login';
    const apiUrl = 'localhost:5000/api/users';

    // Example data payload
    const data = {
        username: username,
        email: email,
        password: password
    };

    // Sending the request to the API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful response from the API
        console.log('Response from API:', data);
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the request:', error);
    });
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    sendRequest(username, email, password);
}

// Attach event listener to form submission
document.getElementById('signup-form').addEventListener('submit', handleSubmit);