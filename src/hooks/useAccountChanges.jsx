// HOOKS
import { useEffect } from "react";

/**
 * The `useAccountChanges` hook is used to handle account changes in a React application.
 * It sets up an event listener for account changes in the Ethereum wallet.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.setWallet - A function to update the wallet state.
 * @param {Function} props.setError - A function to update the error state.
 * @returns {void}
 */
export const useAccountChanges = ({ setWallet, setError }) => {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("Accounts changed:", accounts);

        if (accounts.length === 0) {
          console.log("User is disconnected from the DApp.");

          setWallet(null);
        } else {
          // User is connected, but the selected account might have changed
          console.log("Connected account:", accounts[0]);

          // Update UI with new account
          setWallet(accounts[0]);
        }
      });
    } else {
      setError("MetaMask is not installed");
    }
  }, [setWallet, setError]);
};
