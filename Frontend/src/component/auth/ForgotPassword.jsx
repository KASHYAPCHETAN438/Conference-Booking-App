import React, { useState } from 'react';
import ApiService from '../../service/ApiService'; 

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Email | Step 2: OTP + Password | Step 3: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await ApiService.sendOtp(email);
      setMessage(res);
      setStep(2); // Move to OTP + new password input
    } catch (err) {
      setError(err.response?.data || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Submit new password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!otp || !newPassword) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await ApiService.resetPassword({ email, otp, newPassword });
      setMessage(res);
      setStep(3); // Password changed successfully
    } catch (err) {
      setError(err.response?.data || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="forgot-form">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className="forgot-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="success-message">
          Password reset successfully! Now you can <a href="/login">Login</a>.
        </div>
      )}

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
