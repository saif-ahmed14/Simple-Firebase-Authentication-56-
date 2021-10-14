import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
initializeAuthentication();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const btnStyles = {
    marginTop: '25px',
    marginLeft: '25px',
    width: '180px',
    height: '40px',
    borderRadius: '5px',
    border: '1px solid gray',
    backgroundColor: 'lightcoral',
    fontWeight: '700',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer'
  }


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      })

      .catch(error => {
        <h3>error.message</h3>
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      })

      .catch(error => {
        <h3>error.message</h3>
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="App">
      { !user.name ?
      <div>
      <button style={btnStyles} onClick={handleGoogleSignIn}>Google Sign In</button>
      <button style={btnStyles} onClick={handleGithubSignIn}>Github Sign In</button>
      </div> :
      <div>
      <button style={btnStyles} onClick={handleSignOut}>Sign Out</button>
      </div>
      }
      <br />
      {
        user.name && <div>
          <h3>Welcome to {user.name}</h3>
          <p>This is your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
