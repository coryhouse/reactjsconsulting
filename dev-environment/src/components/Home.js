import React, { useState, useEffect } from "react";
import { getAccount } from "../api/accountApi";
import { account } from "../propTypes";
import Spinner from "./Spinner";

function Home() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    let mounted = true;

    getAccount(1).then(account => {
      if (mounted) setAccount(account);
    });

    // Cleanup on unmount
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <h1>Home</h1>
      {account ? (
        <>
          <h2>Account</h2>
          <section>Account Number: {account.number}</section>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

Home.propTypes = {
  account
};

export default Home;
