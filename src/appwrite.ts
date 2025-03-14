import { Account, AppwriteException, Client } from "appwrite";
declare global {
  interface Window {
    token: string;
  }
}

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export const getUserData = async () => {
  try {
    const account = new Account(client);
    const promise = account.createJWT();

    promise.then(
      function (response) {
        console.log(response.jwt); // Success
        window.token = response.jwt;
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    return account.get();
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const account = new Account(client);
    return account.createEmailSession(email, password);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const verifyEmail = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId") as string;
    const secret = urlParams.get("secret") as string;
    if (!userId || !secret) {
      throw new Error("Missing userId or secret");
    }
    const account = new Account(client);
    return account.updateVerification(userId, secret);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const updatePassword = async (password: string) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId") as string;
    const secret = urlParams.get("secret") as string;
    if (!userId || !secret) {
      throw new Error("Missing userId or secret");
    }
    const account = new Account(client);
    return account.updateRecovery(userId, secret, password, password);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const logout = async () => {
  try {
    const account = new Account(client);
    return account.deleteSession("current");
  } catch (error: unknown) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const account = new Account(client);
    return account.create("unique()", email, password);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export default client;
