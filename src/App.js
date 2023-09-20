import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/login/Login';
import Signin from './components/login/Signin';
import SignUp from './components/signup/Signup';
import Gallery from './components/Gallery/Gallery';
import { auth } from './firebase';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {user ? (
            // If the user is authenticated, show the Gallery component
            <Route path="/simple-auth-gallery" element={<Gallery user={user} auth={auth} />} />
          ) : (
            // If not authenticated, show login/signup routes
            <>
              <Route path="/simple-auth-gallery" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
