import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useState } from "react";

function PasswordSetting() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  const [currentPassword, setCurrentPassword] = useState(user);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setSuccess('Password updated successfully');
      setError('');
      window.location.reload();
    } catch (e) {
      setError('Wrong current password');
      setSuccess('');
    }
  };

  return (
    <div className="py-6">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="mb-6">
        <label className="text-white text-lg block mb-2">
          Your Current Password
        </label>
        <input type="password"
          className="w-full px-2 py-2 text-lg rounded-md"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="text-white text-lg block mb-2">
          New Password
        </label>
        <input type="password"
          className="w-full px-2 py-2 text-lg rounded-md"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="text-white text-lg block mb-2">
          Confirm New Password
        </label>
        <input type="password"
          className="w-full px-2 py-2 text-lg rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button 
        className="text-white px-6 py-2 bg-primary-rgba float-right rounded-lg hover:bg-lime-800 my-6"
        onClick={handleSave}
      >Save</button>
    </div>
  );
}

export default PasswordSetting;