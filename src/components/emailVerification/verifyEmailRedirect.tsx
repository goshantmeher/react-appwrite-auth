import { useEffect, useState } from "react";
import { verifyEmail } from "../../appwrite";

function VerifyEmailRedirect() {
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const [isVerificationFailure, setIsVerificationFailure] = useState(false);
  useEffect(() => {
    verifyEmail()
      .then(() => {
        setIsVerificationSuccess(true);
      })
      .catch(() => {
        setIsVerificationSuccess(false);
        setIsVerificationFailure(true);
      });
  }, []);
  return (
    <div>
      <h1>
        {isVerificationSuccess
          ? "Email verified successfully"
          : isVerificationFailure
          ? "Email verification failed"
          : "Verifying email..."}
      </h1>
    </div>
  );
}

export default VerifyEmailRedirect;
