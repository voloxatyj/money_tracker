import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/layouts/Button";
import { Link, useHistory } from "react-router-dom";
import { loginUser, signUpUser } from "../redux/actions/userActions";
import { Auth } from "../utils/authMethods";

export const AuthForm = () => {
  const [toggleSlides, setToggleSlides] = useState(false);
  const history = useHistory();
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    general: ui.error?.general,
    name: ui.error?.name,
    password: ui.error?.password,
    email: ui.error?.email,
  });
  const [seeText, setSeeText] = useState(false);
  const [seeConfirmText, setSeeConfirmText] = useState(false);

  useEffect(() => {
    Object.keys(ui?.error) !== 0
      ? setErrors({
          general: ui.error?.general,
          name: ui.error?.name,
          password: ui.error?.password,
          confirmPassword: ui.error?.confirmPassword,
          email: ui.error?.email,
        })
      : setErrors({
          general: "",
          name: "",
          password: "",
          confirmPassword: "",
          email: "",
        });
  }, [ui.error]);

  return (
    <div className="containerForm">
      <div
        className={toggleSlides ? "container right-panel-active" : "container"}
      >
        <div className="form-container sign-up-container">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(signUpUser(form, history));
            }}
          >
            <h1>Create Account</h1>
            <div className="social-container">
              <Link to="#" onClick={() => Auth("facebook", history)}>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" onClick={() => Auth("google", history)}>
                <i className="fab fa-google"></i>
              </Link>
              <Link to="#" onClick={() => Auth("twitter", history)}>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" onClick={() => Auth("github", history)}>
                <i className="fab fa-github"></i>
              </Link>
            </div>
            {errors.general && (
              <span style={{ color: "red", fontSize: "1.5rem" }}>
                {errors.general}
              </span>
            )}
            <input
              type="text"
              name="name"
              value={form.name === undefined ? "" : form.name}
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
              placeholder="Name"
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
            <input
              type="email"
              name="email"
              value={form.email === undefined ? "" : form.email}
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
              placeholder="Email"
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
            <input
              type={seeText ? "text" : "password"}
              name="password"
              value={form.password === undefined ? "" : form.password}
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
              placeholder="Password"
            />
            {seeText ? (
              <i
                className="far fa-eye fa-lg"
                onClick={() => setSeeText(false)}
              ></i>
            ) : (
              <i
                className="far fa-eye-slash fa-lg"
                onClick={() => setSeeText(true)}
              ></i>
            )}
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
            <input
              type={seeConfirmText ? "text" : "password"}
              value={
                form.confirmPassword === undefined ? "" : form.confirmPassword
              }
              name="confirmPassword"
              style={{ marginBottom: "1.5rem" }}
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
              placeholder="Confirm Password"
            />
            {seeConfirmText ? (
              <span
                className="far fa-eye fa-lg"
                onClick={() => setSeeConfirmText(false)}
              ></span>
            ) : (
              <span
                className="far fa-eye-slash fa-lg"
                onClick={() => setSeeConfirmText(true)}
              ></span>
            )}
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>
            )}
            {ui.loading ? (
              <i
                className="fas fa-spinner fa-pulse fa-lg"
                style={{ color: "var(--main-color)", marginTop: "1em" }}
              ></i>
            ) : (
              <Button type="submit">Sign Up</Button>
            )}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(
                loginUser(
                  { email: form.email, password: form.password },
                  history
                )
              );
            }}
          >
            <h1>Sign in</h1>
            <div className="social-container">
              <Link to="#" onClick={() => Auth("facebook", history)}>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" onClick={() => Auth("google", history)}>
                <i className="fab fa-google"></i>
              </Link>
              <Link to="#" onClick={() => Auth("twitter", history)}>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" onClick={() => Auth("github", history)}>
                <i className="fab fa-github"></i>
              </Link>
            </div>
            {errors.general && (
              <span style={{ color: "red", fontSize: "1.5rem" }}>
                {errors.general}
              </span>
            )}
            <input
              type="email"
              value={form.email === undefined ? "" : form.email}
              name="email"
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
              placeholder="Email"
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
            <input
              type={seeText ? "text" : "password"}
              name="password"
              value={form.password === undefined ? "" : form.password}
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
              placeholder="Password"
            />
            {seeText ? (
              <i
                className="far fa-eye fa-lg"
                onClick={() => setSeeText(false)}
              ></i>
            ) : (
              <i
                className="far fa-eye-slash fa-lg"
                onClick={() => setSeeText(true)}
              ></i>
            )}
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
            <Link
              to="#"
              onClick={() => {
                setToggleSlides(!toggleSlides);
                setForm({ email: "", password: "" });
              }}
              className="password"
            >
              Forgot your password?
            </Link>
            {ui.loading ? (
              <i
                className="fas fa-spinner fa-pulse fa-lg"
                style={{ color: "var(--main-color)", marginTop: "1em" }}
              ></i>
            ) : (
              <Button type="submit">Sign In</Button>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <Button
                className="ghost"
                onClick={() => {
                  setToggleSlides(!toggleSlides);
                  setForm({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                  setErrors("");
                }}
              >
                Sign In
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Button
                className="ghost"
                onClick={() => {
                  setToggleSlides(!toggleSlides);
                  setForm({ email: "", password: "" });
                  setErrors("");
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
