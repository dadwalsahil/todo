import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phonenumber:"",
		password: "",
	});
	const [error, setError] = useState("");
	const[confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const checkValidation = (e)=>{
		const confPassword = e.target.value;
		setConfirmPassword(confPassword);
		if(data.password !== confPassword){
			setError("Passwords Don't Match");
		}
		else{
			setError("");
		}
	}

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(data.password === confirmPassword){
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			alert("User Registration Successful!");
			navigate("/login");
			console.log(res.message);

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	}else{
		setError("ERROR! Passwords are not Same!");
	}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign In
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>

						<input
							type="tel"
							placeholder="Phone Number"
							name="phonenumber"
							onChange={handleChange}
							value={data.phonenumber}
							required
							className={styles.input}
						/>
						
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder=" Confirm Password"
							name="confirmpassword"
							onChange={checkValidation}
							value={data.confirmpassword}
							required
							className={styles.input}
						/>

						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
