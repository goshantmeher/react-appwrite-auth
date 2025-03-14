import { useState } from "react";
import "./style.css";
import { updatePassword } from "../../appwrite";
function ResetPasswordRedirect() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const _updatePassword = () => {
    updatePassword(formData.password)
      .then(() => {
        alert("Password updated successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="forgot-password-container">
      <h1>Resetting password...</h1>
      <input
        type="password"
        placeholder="New password"
        value={formData.password}
        onChange={(e) => {
          setFormData({
            ...formData,
            password: e.target.value,
          });
        }}
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={formData.confirmPassword}
        onChange={(e) => {
          setFormData({
            ...formData,
            confirmPassword: e.target.value,
          });
        }}
      />
      <button onClick={_updatePassword}>Reset password</button>
    </div>
  );
}

export default ResetPasswordRedirect;
