import React, { useEffect, useState, useContext, useRef } from "react";
import { Flex, Box } from "@common/index";
import Wrapper from "@common/wrapper";
import Logo from "@/components/logo";
import css from "@css/signup.module.css";
import Input from "@/components/input";
import __SignupAvatar from "@/screens/__signupAvatar";
import { errObj } from "@/types/signup";
import Context from "@store/context";
import { useNavigate } from "react-router-dom";
import XButton from "@/components/xButton";

export default function Signup() {
  const navigate = useNavigate();

  const ctx = useContext(Context);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    gender: 0,
    avatar: "",
  });

  const initErrState: errObj = {
    username: { err: null, msg: "" },
    email: { err: null, msg: "" },
    password: { err: null, msg: "" },
    avatar: { err: null, msg: "" },
  };

  const [err, setErr] = useState(initErrState);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<string | null>(null);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const userRegex = /^(?!admin\b)[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*$/;

  const setAvatarRef = (val: string | null) => {
    console.log(val);
    avatarRef.current = val;
  };

  //
  //
  // ----------------- Verify Username Input ----------------- //
  //                         ||
  //						   \/

  const verifyUsername = async () => {
    const username = usernameRef.current?.value ?? "";
    let err = false;
    let msg = "";

    if (username.length <= 1) {
      err = true;
      msg = "Username is too short";
    } else if (!username.match(userRegex)) {
      err = true;
      msg = "No spaces or Special characters allowed expect for periods";
    } else if (username.length >= 2 && username.match(userRegex)) {
      const req = await fetch("/api/checkAva?player=" + username);

      const res = await req.json();

      if (res.success === false) {
        err = true;
        msg = "Username is already in use";
      }
    }

    setErr((prev) => ({ ...prev, username: { err, msg } }));
    return err ? false : true;
  };

  // ----------- END OF USERNAME VERIFICATION -------------- //

  const verifyEmail = async () => {
    const email = emailRef.current?.value ?? "";
    let err = false;
    let msg = "";

    if (!email.match(emailRegex)) {
      err = true;
      msg = "Invalid email address";
    }

    if (email.match(emailRegex)) {
      const req = await fetch("/api/checkAva?email=" + email);

      const res = await req.json();

      if (res.success === false) {
        err = true;
        msg = "Email is already in use";
      }
    }
    setErr((prev) => ({ ...prev, email: { err, msg } }));
    return err ? false : true;
  };

  /*

	   ----------------- Verify Password ----------------- - - - 

    */

  const verifyPassword = async () => {
    const password = passwordRef.current?.value ?? "";
    let err = false;
    let msg = "";

    if (password.length < 8) {
      err = true;
      msg = "Password is too short it must be at least 8 characters long";
    }

    setErr((prev) => ({ ...prev, password: { err, msg } }));
    return err ? false : true;
  };

  // ----------- END OF PASSWORD VERIFICATION -------------- //

  // ----------- VERIFY AVATAR -------------- //

  const verifyAvatar = () => {
    let err = false;
    let msg = "";

    if (!avatarRef.current) {
      err = true;
      msg = "Please choose a avatar";
    }

    setErr((prev) => ({ ...prev, avatar: { err, msg } }));
    return err ? false : true;
  };

  // ----------- END OF AVATAR VERIFICATION

  //
  //
  // ----------------- handleChange ----------------- //
  //                         ||
  //						   \/
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout.current) clearTimeout(timeout.current);

    const target = evt.currentTarget;
    const val = target.value;
    const name = target.name;

    timeout.current = setTimeout(() => {
      if (name === "username") verifyUsername();
      if (name === "email") verifyEmail();
      if (name === "password") verifyPassword();
      if (name === "avatar") verifyAvatar();
    }, 1200);

    setInputs((prev) => {
      return { ...prev, [name]: val };
    });
  };

  // ----------- END OF HANDLE CHANGE -------------- //

  // ----------- END OF HANDLE SUBMIT -------------- //
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const [isValidUser, isvalidEmail, isValidPass, isValidAvatar] =
      await Promise.all([
        verifyUsername(),
        verifyEmail(),
        verifyPassword(),
        verifyAvatar(),
      ]);

    if (isValidUser && isvalidEmail && isValidPass && isValidAvatar) {
      // if all inputs are valid send a post request to the server

      const data = { ...inputs, device: ctx.deviceInfo };

      const req = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();

      console.log(res);
      if (res.success) {
        ctx.setLoginStatus(true);
        ctx.setPlayerObj(res.player);
        localStorage.setItem("fade", "true");
        navigate("/");
      }
    }
  };

  // ----------- END OF HANDLE SUBMIT -------------- //
  //

  useEffect(() => {
    console.log(err);
  }, [err, setErr]);

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
  return (
    <React.Fragment>
      <Wrapper
        screenVariant={pageVariants}
        style={{
          phone: { bottomSpacing: 70 },
          bottomSpacing: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        className={css.screen}
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
        <form
          noValidate
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "150px",
          }}
          onSubmit={handleSubmit}
          method="post"
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
            <h2>Create an account to begin your idleing Adventure!</h2>
            <Box mb={7} ml={4} className={css.inputTitle}>
              Choose a character name
            </Box>

            <Flex fullWidth center column className={css.inputContainer}>
              <Input
                ref={usernameRef}
                startIcon="username"
                style={{
                  borderRadius: 5,
                  width: "100%",
                }}
                name="username"
                autoComplete="username"
                type="text"
                value={inputs.username}
                placeholder="Character Name"
                onChange={(evt) => handleChange(evt)}
                error={{ ...err.username }}
                maxLength={25}
                hint="Max Character length 25."
              />

              <Box
                mb={7}
                ml={4}
                mt={40}
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
                ref={passwordRef}
                name="password"
                autoComplete="new-password"
                passMeter
                startIcon="password"
                togglePass
                value={inputs.password}
                type="password"
                placeholder="Password"
                onChange={(evt) => handleChange(evt)}
                error={{ ...err.password }}
                maxLength={128}
              />

              <Box
                mb={7}
                ml={4}
                style={{ width: "100%", marginTop: 30 }}
                className={css.inputTitle}
              >
                Enter a Email
              </Box>

              <Input
                style={{
                  borderRadius: 5,
                  width: "100%",
                }}
                ref={emailRef}
                name="email"
                value={inputs.email}
                startIcon="email"
                type="text"
                placeholder="Email address"
                onChange={(evt) => handleChange(evt)}
                error={{ ...err.email }}
              />
              {/* 
							Choose your gender	
						*/}

              <__SignupAvatar
                error={{ ...err.avatar }}
                setAvatarRef={setAvatarRef}
                setInputs={setInputs}
              />
            </Flex>
          </Flex>

          <Flex fullWidth className={css.bottomContainer}>
            <button>Create an account</button>
          </Flex>
        </form>
      </Wrapper>
    </React.Fragment>
  );
}
