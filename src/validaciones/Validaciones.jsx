import { number, object, string, date, ref } from 'yup'
import ErrorMessage from './errores'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
var phoneRegEx      = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
// Minimo 8 caracteres, 1 letra mayuscula, 1 letra miniscula, 1 caracter numerico

// const isbn (value) => {
//     const cleanedISBN = value.replace(/-|\s/g, '');
//     if (cleanedISBN.length === 10 || cleanedISBN.length === 13) {
//         return true;
//     }
//     throw new Error('El ISBN debe ser válido (ISBN-10 o ISBN-13).');
// },  

let validacionLogin = object({
    username : string().required("Completa todos los campos"),
    password : string().required("Completa todos los campos")
});

let validacionLibros = object({
    nombre : string().required(ErrorMessage(1)),
    año: int().required(),
    precio: int().required(),
    formato: string().required(),
    isbn: string().matches(isbn).required()

});

let validacionCategorias = object({
   nombre: string().required()
});

let validacionEditoriales = object({
    nombre: string().required()
});

let validacionVentas = object({
    cantidad: int().required(),
    descuento: int().required()
});

let validacionAutores = object({
    nombre : string().required(ErrorMessage(1)),
    apellido : string().required(ErrorMessage(1)),
    nacionalidad : string().required(ErrorMessage(1)),
    biografia : string().required(ErrorMessage(1)),
    fecha_nacimiento : datetime,
});

let validacionRoles = object({
    nombre : string().required(ErrorMessage(1))
});

let validacionPersonas = object({
    nombre : string().required(ErrorMessage(1)),
    apellido : string().required(ErrorMessage(1)),
    email : string().email(ErrorMessage(2)).required(ErrorMessage(1)),
    telefono : string().matches(phoneRegEx, ErrorMessage(7)).required(ErrorMessage(1)),
    direccion : string().required(),
    tipo: string().required()
});

let validacionStock = object({
    cantidad: int().required()
});

let validacionUsuarios = object({
    username : string().required(getErrorMessage(1)),
    password : string().matches(passwordRules).required(getErrorMessage(1))
});

let validacionProveedores = object({
    nombre : string().required(getErrorMessage(1)),
    direccion : string().required(),
    telefono : string().matches(phoneRegEx, getErrorMessage(7)).required(getErrorMessage(1)),
    email : string().email(getErrorMessage(2)).required(getErrorMessage(1)),
});


module.exports = { validacionLogin, validacionLibros, validacionCategorias, validacionEditoriales, validacionVentas,
    validacionAutores, validacionRoles, validacionPersonas, validacionUsuarios, validacionStock, validacionProveedores}