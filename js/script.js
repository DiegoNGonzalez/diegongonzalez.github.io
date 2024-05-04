const form = document.querySelector('form');
const inputNombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const errorNombre = document.querySelector('#errorNombre');
const errorEmail = document.querySelector('#errorEmail');

const alerta = () => {
    Swal.fire({
        position: "bottom-center",
        icon: "success",
        title: "Formulario Enviado!",
        showConfirmButton: false,
        timer: 1500,
    });
};
const alertaFormIncompleto = () => {
    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Verifique los datos ingresados",
        showConfirmButton: false,
        timer: 1500,
    });
};
const validarNombre = () => {
    let name = inputNombre.value;

    if (name=="") {
        errorNombre.innerHTML = "Ingrese nombre";
        errorNombre.style.color = "red";
        errorNombre.style.fontSize = "12px";
        errorNombre.style.fontWeight = "bold";

        alertaFormIncompleto();
        return false
    }
    if (!name.match(/^[a-zA-ZÀ-ÿ\s]{2,40}$/)) {
        errorNombre.innerHTML = "Ingrese nombre completo";
        errorNombre.style.color = "red";
        errorNombre.style.fontSize = "12px";
        errorNombre.style.fontWeight = "bold";
        alertaFormIncompleto();
        return false
    } else {
        return true
    };
}
    
const validarMail = () => {
        let email = inputEmail.value;

        if (email=="") {
            errorEmail.innerHTML = "Ingrese Email";
            errorEmail.style.color = "red";
            errorEmail.style.fontSize = "12px";
            errorEmail.style.fontWeight = "bold";
            alertaFormIncompleto();
            return false
        }else if (
            !email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/)
        ) {
            errorEmail.innerHTML = "Email no valido";
            errorEmail.style.color = "red";
            errorEmail.style.fontSize = "12px";
            errorEmail.style.fontWeight = "bold";

            alertaFormIncompleto();
            return false
        } else {
            return true
        }
    }
const validarForm = () => {
    return (
        validarMail () && validarNombre()
    )
}

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    if (validarForm()) {
        
        const form = new FormData(this);
        const response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers: {
                Accept: "application/json",
            },
        });
        if (response.ok) {
            this.reset();
            alerta();
            errorEmail.innerHTML = "";
            errorNombre.innerHTML = "";
        }
    }
}