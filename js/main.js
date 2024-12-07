const firebaseConfig = {
    apiKey: "AIzaSyBhPXOBYihXpEgCNNmXjE6f9V2s5LaNq9U",
    authDomain: "contact-form-1245b.firebaseapp.com",
    databaseURL: "https://contact-form-1245b-default-rtdb.firebaseio.com",
    projectId: "contact-form-1245b",
    storageBucket: "contact-form-1245b.firebasestorage.app",
    messagingSenderId: "87486202141",
    appId: "1:87486202141:web:4c633da8bf01fdf78de1f4"
};

// Initialization of firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
let contactFormDB = firebase.database().ref('contact-form');

document.getElementById('contact-form-bloc').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    let name = getElementVal('name');
    let email = getElementVal('email');
    let sujet = getElementVal('sujet');
    let message = getElementVal('message');

    // console.log(name, email, sujet, message);
    saveMessage(name, email, sujet, message);

    document.querySelector('.error-msg').style.display = 'block';
    document.getElementById('contact-form-bloc').reset();
}

const saveMessage = (name, email, sujet, message) =>{
    let newContactForm = contactFormDB.push();

    newContactForm.set({
        name: name,
        email: email,
        sujet: sujet,
        message: message,
    });
}
const getElementVal = (id) => {
    return document.getElementById(id).value;
}