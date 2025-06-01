import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Flex, Box } from "@common/index";
import Logo from "@comp/logo";
import Wrapper from "@common/wrapper";
import css from "@css/login.module.css";
import Input from "@comp/input";
import XButton from "@comp/xButton";
import { motion } from "framer-motion";
import Context from "@/store/context";
import { ReactComponent as ErrorIcon } from "@svg/error.svg";
import useSendExpoMessage from "@/hooks/useSendExpoMessage";

const pageVariants = {
  initial: { x: "0", y: "-100%", opacity: 0 }, // Start completely off-screen
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }, // Slide out to the left
};

function Login() {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const ctx = useContext(Context);
  const navigate = useNavigate();

  const sendExpoMessage = useSendExpoMessage;

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [validInputs, setValidInputs] = useState({
    password: false,
    email: false,
  });
  const [error, setError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const prevSubmitData = useRef({ email: "", password: "" });

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputFocus = () => {
    if (wrapperRef.current) {
      setTimeout(() => {
        wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
      }, 200);
    }
  };

  const [err, setErr] = useState<{
    email: { err: boolean | null; msg: string };
    password: { err: boolean | null };
  }>({
    email: { err: null, msg: "" },
    password: { err: null },
  });

  const verifyEmail = (checkAll: boolean = false) => {
    if (checkAll || (emailRef.current && emailRef.current?.value.length >= 1)) {
      let err = false;
      let msg = "";
      let validInput = false;

      if (!emailRef.current?.value.match(emailRegex)) {
        err = true;
        msg = "A valid email address is required.";
      } else {
        validInput = true;
      }

      setValidInputs((prev) => ({ ...prev, email: validInput }));
      setErr((prev) => ({ ...prev, email: { err, msg } }));
    }
  };

  const verifyPassword = (checkAll: boolean = false) => {
    if (
      passwordRef.current &&
      (checkAll || passwordRef.current?.value.length >= 1)
    ) {
      let err = true;
      let validInput = false;
      if (passwordRef.current.value.length >= 8) {
        err = false;
        validInput = true;
      }

      setValidInputs((prev) => ({ ...prev, password: validInput }));
      setErr((prev) => ({ ...prev, password: { err } }));
      console.log("going here verify password");
    }
  };

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const verifyInputs = () => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      verifyEmail();
      verifyPassword();
    }, 1200);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // LIsten for changes on the inputs as well
    verifyInputs();

    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    verifyEmail(true);
    verifyPassword(true);

    if (
      (!err.email.err &&
        !err.password.err &&
        err.email.err !== null &&
        err.password.err !== null &&
        prevSubmitData.current.email !== emailRef.current?.value) ||
      prevSubmitData.current.password !== passwordRef.current?.value
    ) {
      // If all required inputs are field in, lets
      // run a check to see if they are valid or not
      const data = { ...inputs };
      prevSubmitData.current = data;

      const req = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();

      if (res.success) {
        // Account verified
        navigate("/");
        ctx.setLoginStatus(true);
        ctx.setPlayerObj(res.player);
        localStorage.setItem("fade", "true");
      } else if (!res.success && !res.locked) {
        // Invalid
        setErr((prev) => ({
          ...prev,
          email: { err: true, msg: "" },
          password: { err: true, msg: "" },
        }));

        setError("Invalid Email Or Password");
      } else if (res.locked) {
        // Account has been locked
        setValidInputs((prev) => ({ ...prev, email: false, password: false }));
        setError(
          "Your account has been locked. For more information, please check your email."
        );
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-container"
    >
      <Flex style={{ position: "relative" }} fullWidth row pt={10} pl={10}>
        <XButton />
        <Flex
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Logo />
        </Flex>
      </Flex>

      <form noValidate onSubmit={handleSubmit} method="post">
        <Wrapper
          style={{ phone: { bottomSpacing: -90 }, bottomSpacing: -150 }}
          ref={wrapperRef}
          className={css.screen}
        >
          <Flex
            column
            style={{
              phone: { width: "90%" },
              tablet: { width: "90%" },
              width: "90%",
            }}
            className={css.container}
          >
            <h2>Login</h2>
            <Box mb={7} ml={4} className={css.inputTitle}>
              Character name
            </Box>

            <Flex fullWidth center column className={css.inputContainer}>
              <Input
                ref={emailRef}
                startIcon="email"
                style={{
                  borderRadius: 5,
                  width: "100%",
                }}
                name="email"
                autoComplete="email"
                type="text"
                value={inputs.email}
                placeholder="Email Address"
                onChange={(evt) => handleChange(evt)}
                error={{ ...err.email }}
              />

              <Box
                mb={7}
                ml={4}
                style={{ width: "100%", marginTop: 30 }}
                className={css.inputTitle}
              >
                Enter a password
              </Box>

              <Input
                style={{
                  borderRadius: 5,
                  width: "100%",
                }}
                onFocus={handleInputFocus}
                ref={passwordRef}
                name="password"
                autoComplete="new-password"
                startIcon="password"
                togglePass
                value={inputs.password}
                type="password"
                placeholder="Password"
                onChange={(evt) => handleChange(evt)}
                error={{ ...err.password }}
              />
            </Flex>
          </Flex>
        </Wrapper>

        <Flex fullWidth className={css.bottomContainer} middle>
          {error && (
            <Flex middle className={css.bottomErrorContainer}>
              <ErrorIcon
                style={{
                  width: 18,
                  height: 18,
                  color: "#d16565",
                  marginRight: 30,
                }}
              />
              {error}
            </Flex>
          )}
          <Link to="/forgotpassword">Forgot Password?</Link>
          <button
            {...((!validInputs.email || !validInputs.password) && {
              className: `${css.disabledButton}`,
            })}
          >
            Login
          </button>
        </Flex>
      </form>
    </motion.div>
  );
}

export default Login;
