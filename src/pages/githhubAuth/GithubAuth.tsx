// src/components/GitHubLogin.js
/* 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GitHubLogin = () => {
    const handleLogin = () => {
        // Redirect to your backend's GitHub authentication endpoint
        window.location.href = 'http://localhost:8000/auth/github';
    };

    return (
        <div>
            <h1>Login with GitHub</h1>
            <button onClick={handleLogin}>Login with GitHub</button>
        </div>
    );
};
*/
// export default GitHubLogin;
/*
 Step 3: Handle the Callback
After the user authenticates via GitHub, they will be redirected back to your application. You need to create a route to handle this callback and extract the JWT from the response.
// src/components/GitHubCallback.js
const GitHubCallback = () => {
    useEffect(() => {
        const fetchToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (code) {
                try {
                    const response = await axios.get(`http://localhost:8000/auth/github/callback?code=${code}`);
                    const { token } = response.data;

                    // Store the JWT in local storage or a state management solution
                    localStorage.setItem('jwt', token);
                    // Redirect to dashboard or another page
                    window.location.href = '/dashboard';
                } catch (error) {
                    console.error('Authentication failed:', error);
                }
            }
        };

        fetchToken();
    }, []);

    return <div>Loading...</div>;
};

export default GitHubCallback;
*/



/*
Step 4: Create a Protected Route
Create a protected route that checks for the JWT before allowing access to the dashboard.
// src/components/Dashboard.js
const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('jwt');

            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/dashboard', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    // Handle token expiration or invalid token
                }
            } else {
                // Redirect to login if no token is found
                window.location.href = '/login';
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? <h2>Hello, {user}</h2> : <p>Loading user data...</p>}
        </div>
    );
};

*/
/*
Step 5: Set Up Routing
If you're using React Router, set up your routes to include the login, callback, and dashboard components.
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GitHubLogin from './components/GitHubLogin';
import GitHubCallback from './components/GitHubCallback';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={GitHubLogin} />
                <Route path="/auth/github/callback" component={GitHubCallback} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
*/

