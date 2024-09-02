import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class signUp {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("AuthService -> createAccount -> response :", userAccount);
      if (userAccount) {
        // call another method to login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("AuthService -> createAccount -> error :", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("AuthService -> login -> session :", session);
      return session;
    } catch (error) {
      console.log("AuthService -> login -> error :", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("AuthService -> getCurrentUser -> user :", user);
      return user;
    } catch (error) {
      console.log("AuthService -> getCurrentUser -> error :", error);
    }
    return null;
  }

  async logout() {
    try {
      const response = await this.account.deleteSessions();
      console.log("AuthService -> logout -> response :", response);
      return response;
    } catch (error) {
      console.log("AuthService -> logout -> error :", error);
    }
  }

}
const authService = new signUp();
export default authService;

