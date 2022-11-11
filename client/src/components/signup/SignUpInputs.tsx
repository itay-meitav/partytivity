import React from "react";
import { atom, useRecoilState } from "recoil";

export const signUpInputsState = atom({
  key: "signUpInputs",
  default: {
    username: "",
    name: "",
    email: "",
    firstPass: "",
    secondPass: "",
  },
});

function SignUpInputs() {
  const [details, setDetails] = useRecoilState(signUpInputsState);
  return (
    <>
      <input
        className="form-input"
        type="text"
        placeholder="Full Name"
        onChange={(e) => {
          const val = e.currentTarget.value.replace(/[^\w\s]|[0-9]/gi, "");
          setDetails({ ...details, name: val });
        }}
        value={details.name}
        minLength={2}
        maxLength={20}
        title="There can be minimum of 2 and maximum of 20 characters. No special characters nor numbers."
        required
      />
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        onChange={(e) => {
          const val = e.currentTarget.value.replace(/[^\w]/gi, "");
          setDetails({ ...details, username: val });
        }}
        value={details.username}
        minLength={3}
        maxLength={15}
        title="There can be minimum of 3 and maximum of 15 characters. No special characters."
        required
      />
      <input
        className="form-input"
        type="email"
        placeholder="Email"
        onChange={(e) => {
          const val = e.currentTarget.value;
          setDetails({ ...details, email: val });
        }}
        pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        value={details.email}
        title="Standard email only."
        required
      />
      <input
        className="form-input"
        type="password"
        onChange={(e) => {
          const val = e.currentTarget.value;
          setDetails({ ...details, firstPass: val });
        }}
        onCopy={(e) => {
          e.preventDefault();
        }}
        onCut={(e) => {
          e.preventDefault();
        }}
        onPaste={(e) => {
          e.preventDefault();
        }}
        placeholder="Password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters total."
        required
      />
      <input
        className="form-input"
        type="password"
        onChange={(e) => {
          const val = e.currentTarget.value;
          setDetails({ ...details, secondPass: val });
        }}
        onCopy={(e) => {
          e.preventDefault();
        }}
        onCut={(e) => {
          e.preventDefault();
        }}
        onPaste={(e) => {
          e.preventDefault();
        }}
        placeholder="Confirm password"
        required
      />
    </>
  );
}

export default SignUpInputs;
