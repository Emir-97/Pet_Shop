export function valida(input){
	const tipoData = input.dataset.tipo;
	if(validadores[tipoData]){
		validadores[tipoData](input);
	}

	if(input.validity.valid){
		input.parentElement.classList.remove('input-container--invalid');
		input.parentElement.querySelector('.input-message-error').innerHTML='';
	} else{
		input.parentElement.classList.add('input-container--invalid');
		input.parentElement.querySelector('.input-message-error').innerHTML= mostrarMensajeError(tipoData, input);
	}
}

const tipoDeErrores = [
	'valueMissing',
	'typeMisMatch',
	'patternMisMatch',
	'customError',
];

const mensajeError = {
	nombre: {
		valueMissing: "Este campo no puede estar vacío",
	},
	email: {
		valueMissing: "Este campo no puede estar vacío",
		typeMisMatch: "El correo no  es válido",
	},
	password: {
		valueMissing: "Este campo no puede estar vacío",
		patternMismatch: "De 6 a 12 carácteres con una letra ayúscula, una minúscula, un número y un carácter especial",
	},
	nacimiento: {
		valueMissing: "Este campo no puede estar vacío",
		customError: "Debes ser mayor de edad",
	},
	numero: {
		valueMissing: "Este campo no puede estar vacío",
		patternMismatch: 'El formato debe ser de 10 números',
	},
	direccion: {
		valueMissing: "Este campo no puede estar vacío",
		patternMismatch: 'El formato debe ser de por lo menos 10 carácteres',
	},
	ciudad: {
		valueMissing: "Este campo no puede estar vacío",
		patternMismatch: 'El formato debe ser de por lo menos 2 carácteres',
	},
	provincia: {
		valueMissing: "Este campo no puede estar vacío",
		patternMismatch: 'El formato debe ser de por lo menos 2 carácteres',
	},
};

const validadores = {
	nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoData, input){
	let mensaje = '';
    tipoDeErrores.forEach((error) => {
    	if(input.validity[error]){
    		console.log(tipoData, error);
            console.log(input.validity[error]);
            console.log(mensajeError[tipoData][error]);
            mensaje = mensajeError[tipoData][error];
    	}
    });
	return mensaje;
};

function validarNacimiento(input){
	const fecha = new Date(input.value);
	let mensaje = '';
	if(!mayorEdad(fecha)){
		mensaje = "Debes tener al menos 18 años de edad";
	}
	input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
	const fechaActual = new Date();
	const diferenciaFechas = new Date(
          fecha.getUTCFullYear() +18,
          fecha.getUTCMonth(),
          fecha.getUTCDate()
		);
	return diferenciaFechas <= fechaActual;
}