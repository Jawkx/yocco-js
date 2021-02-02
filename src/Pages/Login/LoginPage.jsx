import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import fire from "../../firebase";

const LoginPage = () => {

	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [hasAccount, setHasAccount] = useState(false);
	let history = useHistory();
	const clearInputs = () => {
		setEmail('');
		setPassword('');
	}

	const handleLogin = (e) => {
		e.preventDefault();
		fire
		.auth()
		.signInWithEmailAndPassword(email, password)
		.catch(err => {
			switch(err.code) {
				case "auth/invalid-email":
				case "auth/user-disabled":
				case "auth/user-not-found":
					setEmailError(err.message);
					break;
				case "auth/wrong-password":
					setPasswordError(err.message);
					break;
			}		
		});
	}

	const authListener = () => {
		fire.auth().onAuthStateChanged(user => {
			if(user) {
				clearInputs();
				setUser(user);
			}
			else {
				setUser("");
			}
		});
	}

	const handleLogout = () => {
		fire.auth().signOut();
		history.push('/login');
	}

	
	useEffect(() => {
		authListener();
	}, []);

	return (
		<div>
			{user ? (
				<div>
					<h>Put main page here</h> 
					<br></br>
					<Link to = "/proctor"> GO TO PROCTOR </Link>
					<br></br>
					<button 
						onClick = {handleLogout}
					>
						Log out
					</button>

				</div>    
			):(
				<form onSubmit={(e) => handleLogin(e)}>

					<h3>Sign In</h3>
					<div>
						<label>Email Address</label>
						<input 
							className="form-control"
							type="text" 
							id="login"
							placeholder="Email"
							autoFocus 
							required 
							autocomplete="off"
							autocapitalize="off"
							value={email} 
							onChange={(e) => setEmail(e.target.value)}
						/>  
					</div>
					<div>
						<label>Password</label>
						<input
							className="form-control"
							type="password"
							id="password"
							placeholder="password"
							required 
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>				
				<button>Login</button>
			</form>
			)}
		</div>
	);
};

export default LoginPage;

