import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../firebase/services';
import { useAddress } from "@thirdweb-dev/react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const address = useAddress();

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getUserProfile(address);
      setProfile(userProfile);
      setLoading(false);
    };

    if (address) {
      fetchProfile();
    }
  }, [address]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Wallet Address: {profile.walletAddress}</p>
      <img src={profile.profilePictureUrl} alt="Profile" />
      {/* add more fields as needed */}
    </div>
  );
};

export default ProfilePage;
