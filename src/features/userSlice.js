import { createSlice } from "@reduxjs/toolkit";
import { storage, db } from "../firebase";
import firebase from "firebase";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    handlePost: (state, action) => {
      if (action.payload.image != "") {
        const upload = storage
          .ref(`images/${action.payload.image.name}`)
          .put(action.payload.image);
        upload.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress, "hitesh");
            if (snapshot.state === "RUNNING") {
              console.log(progress, "gandhi");
            }
          },
          (error) => {
            alert(error.message);
          },
          () => {
            storage
              .ref("images")
              .child(action.payload.image.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("articles").add({
                  actor: {
                    email: action.payload.user.email,
                    title: action.payload.user.displayName,

                    image: action.payload.user.photoURL,
                  },
                  video: action.payload.video,
                  sharedImage: url,
                  comments: 0,
                  description: action.payload.description,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                });
              });
          }
        );
      } else if (action.payload.video) {
        db.collection("articles").add({
          actor: {
            email: action.payload.user.email,
            title: action.payload.user.displayName,
            image: action.payload.user.photoURL,
          },
          video: action.payload.video,
          sharedImage: "",
          comments: 0,
          description: action.payload.description,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        db.collection("articles").add({
          actor: {
            email: action.payload.user.email,
            title: action.payload.user.displayName,
            image: action.payload.user.photoURL,
          },
          video: "",
          sharedImage: "",
          comments: 0,
          description: action.payload.description,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    },
  },
});

export const { login, logout, handlePost } = userSlice.actions;

export const selectuser = (state) => state.user.user;

export default userSlice.reducer;
