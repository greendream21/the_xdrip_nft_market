import React from "react";
import { useAddress } from "@thirdweb-dev/react";
import AuthorProfileCard from "../authorPage/AuthorProfileCard/AuthorProfileCard"; 

const AuthorProfilePage = () => {
  const address = useAddress();

  return (
    <div>
      <h1>Author Profile Page</h1>
      {address ? <AuthorProfileCard currentAccount={address} /> : "Please connect your wallet"}
    </div>
  );
}

export default AuthorProfilePage;
