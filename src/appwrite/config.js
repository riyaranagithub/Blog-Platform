import conf from "../conf/conf";

import { Client, Databases,Storage,ID, Query } from "appwrite";

export class databasesSerives {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      console.log("createPost Data : ", {
        title,
        slug,
        content,
        featuredImage,
        status,
        userID,
      });
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Service :: getPost :: error", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Service :: getPosts :: error", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("FileService :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("FileService :: deleteFile :: error", error);
      return false;
    }
  }

  async getFile(fileId) {
    try {
      return await this.bucket.getFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("FileService :: getFile :: error", error);
      return false;
    }
  }

  getImagePreview(fileId) {
    return this.bucket.getImagePreview(conf.appwriteBucketId, fileId);
  }

  async updateFile(fileId, file) {
    try {
      return await this.bucket.updateFile(conf.appwriteBucketId, fileId, file);
    } catch (error) {
      console.log("FileService :: updateFile :: error", error);
      return false;
    }
  }

  downLoadFile(fileId) {
    try {
      return this.bucket.getFileDownload(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("FileService :: downLoadFile :: error", error);
      return false;
    }
  }
}

const dataService = new databasesSerives();

export default dataService;


