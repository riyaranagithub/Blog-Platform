# install dependencies
@reduxjs/toolkit 
react redux 
react-router-dom 
appwrite 
@tinymce/tinymce-react 
html-react-parser 
react-hook-form

# new file - .env in root directory src
Environment variables are a powerful tool for managing configuration and sensitive information in a flexible, secure, and environment-agnostic way. They allow you to maintain the same codebase across different environments while easily managing configuration and secrets.


create a file with name - .env
add this file to .gitignore
- to access in vite project - console.log(import.meta.env.VITE_APPWRITE_URL)
      this is not a better approch because sometimes import.meta.env.VITE_APPWRITE_URL may not load and crash the whole file and finding errors could be difficult.
      also environment variable should always in string and if it contains only number then it might create some problem speacially in typescript.

     - Better approch to access environment variables
       create a folder-conf in src and in this create a file- conf.js 
          In file conf.js create a object name conf and provide your environment variables in it using String() and then export it.

<!-- const conf ={
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default conf -->


# CREATE account in appwrite
- create a project - Blog-Platform

- go settings copy API Endpoint id and paste in VITE_APPWRITE_URL
                 copy Project id and paste in VITE_APPWRITE_PROJECT_ID

- go Databases and create a database with name Blog
                 copy the Database id and paste in VITE_APPWRITE_DATABASE_ID
            Then create a collection - Articles
                 copy its's id and paste in VITE_APPWRITE_COLLECTION_ID
                 then go to it's settings and in permissions click on all user's and enable all checkpoints and then update.

- go to storage create a bucket - images
                 copy the id and paste in VITE_APPWRITE_BUCKET_ID

- create attributes in articles ![alt text](<Screenshot (537).png>)

- and then update the permission ![alt text](<Screenshot (539)-1.png>)

- create bucket - images in storage ![alt text](<Screenshot (538).png>) also update the permission.

-----------------------------------------------------------------------------------------------------------
   #                                                 AUTHENTICATION

# AuthService
This module provides authentication services using the Appwrite backend. It includes functionalities for user sign-up, login, account retrieval, and logout.

Setup
Installation
To use this service, you need to have Appwrite installed and configured. Follow the Appwrite documentation to set up your Appwrite server.

# Configuration
Create a conf.js file in your conf directory with the following content:

<!-- const conf = {
appwriteURL: 'YOUR_APPWRITE_ENDPOINT',
appwriteProjectId: 'YOUR_APPWRITE_PROJECT_ID',
}; -->

 export default conf;

Replace YOUR_APPWRITE_ENDPOINT and YOUR_APPWRITE_PROJECT_ID with your actual Appwrite endpoint and project ID.

# Usage
Importing the Service
<!-- import authService from './path_to_your_service/authService'; -->

# Creating an Account
<!-- To create a new account, use the createAccount method:
authService.createAccount({ email: 'user@example.com', password: 'password', name: 'User Name' })
.then(user => {
console.log('Account created:', user);
})
.catch(error => {
console.error('Error creating account:', error);
}); -->

# Logging In
To log in, use the login method:


<!-- authService.login({ email: 'user@example.com', password: 'password' })
.then(session => {
console.log('Logged in:', session);
})
.catch(error => {
console.error('Error logging in:', error);
}); -->

# Getting Account Details
To get the details of the currently logged-in account, use the getAccount method:


<!-- authService.getAccount()
.then(account => {
console.log('Account details:', account);
})
.catch(error => {
console.error('Error getting account details:', error);
}); -->

# Logging Out
To log out, use the logout method:


<!-- authService.logout()
.then(() => {
console.log('Logged out successfully');
})
.catch(error => {
console.error('Error logging out:', error);
}); -->

-------------------------------------------------------------------------------------------------------

#                                                            DatabasesServices

This module provides services for interacting with the Appwrite Databases and Storage APIs. It allows for creating, updating, deleting, and retrieving posts, as well as uploading, deleting, and previewing files.

Setup
Prerequisites
Ensure you have Appwrite installed and configured. Follow the Appwrite documentation to set up your Appwrite server.

# Configuration
Create a conf.js file in your conf directory with the following content:


<!-- const conf = {
  appwriteURL: 'YOUR_APPWRITE_ENDPOINT',
  appwriteProjectId: 'YOUR_APPWRITE_PROJECT_ID',
  appwriteDatabaseId: 'YOUR_APPWRITE_DATABASE_ID',
  appwriteCollectionId: 'YOUR_APPWRITE_COLLECTION_ID',
  appwriteBucketId: 'YOUR_APPWRITE_BUCKET_ID',
}; -->

export default conf;
Replace the placeholders with your actual Appwrite endpoint, project ID, database ID, collection ID, and bucket ID.

#         Usage

# Importing the Service

<!-- import dataservice from './path_to_your_service/databasesServices'; -->


#        ---Creating a Post---
To create a new post, use the createPost method:


<!-- dataservice.createPost('Post Title', 'post-slug', 'Post content', 'featured-image.jpg', 'active', 'user-id')
  .then(document => {
    console.log('Post created:', document);
  })
  .catch(error => {
    console.error('Error creating post:', error);
  }); -->


#         ---Updating a Post---
To update an existing post, use the updatePost method:


<!-- dataservice.updatePost('post-slug', { tittle: 'Updated Title', content: 'Updated content', featuredImage: 'new-image.jpg', status: 'active', userId: 'user-id' })
  .then(document => {
    console.log('Post updated:', document);
  })
  .catch(error => {
    console.error('Error updating post:', error);
  }); -->

#       ---Deleting a Post---
To delete a post, use the deletePost method:


<!-- dataservice.deletePost('post-slug')
  .then(() => {
    console.log('Post deleted successfully');
  })
  .catch(error => {
    console.error('Error deleting post:', error);
  }); -->


#      ---Retrieving a Single Post---
To retrieve a single post, use the getPost method:


<!-- dataservice.getPost('post-slug')
  .then(document => {
    console.log('Post retrieved:', document);
  })
  .catch(error => {
    console.error('Error retrieving post:', error);
  }); -->


#      ---Retrieving Multiple Posts---
To retrieve multiple posts, use the getPosts method. By default, it retrieves active posts:


<!-- dataservice.getPosts()
  .then(documents => {
    console.log('Posts retrieved:', documents);
  })
  .catch(error => {
    console.error('Error retrieving posts:', error);
  }); -->


#      ---Uploading a File---
To upload a file, use the uploadFile method:


<!-- const file = new File(['content'], 'example.txt', { type: 'text/plain' });
dataservice.uploadFile(file)
  .then(response => {
    console.log('File uploaded:', response);
  })
  .catch(error => {
    console.error('Error uploading file:', error);
  }); -->

#     ---Deleting a File---
To delete a file, use the deleteFile method:


<!-- dataservice.deleteFile('file-id')
  .then(() => {
    console.log('File deleted successfully');
  })
  .catch(error => {
    console.error('Error deleting file:', error);
  }); -->

#   ---Getting a File Preview---
To get a preview of a file, use the getFilePreview method:


<!-- const filePreviewUrl = dataservice.getFilePreview('file-id');
console.log('File preview URL:', filePreviewUrl); -->
                                      
-------------------------------------------------------------------------------------------------------------------------
#                                            STORE

src/
│
├── store/
│   ├── store.js
│   └── authSlice.js
│
├── components/
│   ├── header/
│   │   ├── header.jsx
│   ├── footer/
│   │   └── footer.jsx
│   └── index.js
│
├── App.jsx
├── App.css
└── index.js

1. Store Setup
# store/store.js
This file is where the Redux store is configured. It will combine different slices of state, such as authSlice for user authentication.

javascript
Copy code
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {}
});

export default store;


# store/authSlice.js
This file is responsible for managing the authentication state of the user. It includes actions for logging in and logging out, as well as an initial state.

<!-- import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logOut: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
}); 

export const { login, logOut } = auth.actions;
export default auth.reducer;
-->

-------------------------------------------------------------------------------------------------------------------------
#                                            COMPONENTS

