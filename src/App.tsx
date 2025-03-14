import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import Home from "./components/home";
import VerifyEmailRedirect from "./components/emailVerification/verifyEmailRedirect";
import ResetPasswordRedirect from "./components/resetPassowrd/resetPassowordRedirect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/email-verification-redirect"
            element={<VerifyEmailRedirect />}
          />
          <Route
            path="/reset-passowrd-redirect"
            element={<ResetPasswordRedirect />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
