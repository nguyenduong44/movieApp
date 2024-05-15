import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import undefinedImg from '../../../../../img/not_found.jpg'


function GeneralSetting() {
  const auth = getAuth();
  const storage = getStorage();

  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('John');
  const [photo, setPhoto] = useState(undefinedImg);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        setDisplayName(user.displayName || 'John');
        setPhoto(user.photoURL || undefinedImg);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL });
      setPhoto(photoURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSave = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName });
        window.location.reload();
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className="py-6">
      <div className="mb-6">
        <img
          src={photo}
          className="h-40 w-40 mb-2"
        />
        <input type="file" className="text-white" 
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-6">
        <label className="text-white text-lg block mb-2">
          Display Name
        </label>
        <input placeholder=""
          className="w-full px-2 py-2 text-lg rounded-md"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </div>
      <div className="mb-6">
        <label className="text-white text-lg block mb-2">
          Email
        </label>
        <input placeholder=""
          className="w-full px-2 py-2 text-lg rounded-md"
          value={user?.email}
          disabled
        />
      </div>
      <button 
        className="text-white px-6 py-2 bg-primary-rgba float-right rounded-lg hover:bg-lime-800"
        onClick={handleSave}
      >Save</button>
    </div>
  );
}

export default GeneralSetting;