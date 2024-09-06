import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD02r9FTWA3V42hmCxuG5lnoXL2RZfsw3M",
  authDomain: "chatbot-rex-15d82.firebaseapp.com",
  projectId: "chatbot-rex-15d82",
  storageBucket: "chatbot-rex-15d82.appspot.com",
  messagingSenderId: "117231275069",
  appId: "1:117231275069:web:3808300722b94dfe102e54"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "chats");
// to retrive all the documents inside the chats collection:
//colRef returns a promise. it gives us the snapshot of that collection.
//we are interested in data and the id of the doc
getDocs(colRef)
  .then((snapshot) => {
    const chats = [];
    snapshot.docs.forEach((chat) => {
      chats.push({ ...chat.data(), id: chat.id });
    });
    console.log(chats);
  })
  .catch((err) => {
    console.log(err);
  });

const addChatForm = document.querySelector(".add");
addChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addChatForm.title.value,
    author: addChatForm.author.value,
  }).then(() => {
    console.log("AddChat worked!");
    addChatForm.reset();
  });
});