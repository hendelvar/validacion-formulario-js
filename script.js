// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSp5M6oS7cFO5WAh4Is0zxJLBLKWwjcJY",
  authDomain: "formulario-b0fc7.firebaseapp.com",
  projectId: "formulario-b0fc7",
  storageBucket: "formulario-b0fc7.appspot.com",
  messagingSenderId: "133576398915",
  appId: "1:133576398915:web:8948e601a30ea51bef9cf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore()

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    // Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    // Validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Patrón de validación

    if(!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce un mail válido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    // Validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if(!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    // Si todos los campos son válidos enviar formularios
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        //BACKEND QUE RECIBA LA INFORMACIÓN
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });

        
    }
})