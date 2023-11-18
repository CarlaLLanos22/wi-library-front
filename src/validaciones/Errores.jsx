const ErrorMessage = (errorNum) => {
    let mensaje = ''
    switch(errorNum) {
        case 1  : mensaje = 'Complete todos los campos'; break;
        case 2  : mensaje = 'Email inválido';   break;
        case 3  : mensaje = 'Las contraseñas no coinciden'; break;
        case 4  : mensaje = 'La contraseña debe contener al menos 8 caracteres, una mayúscula y un número'; break;
        case 5  : mensaje = 'Fecha de nacimiento inválida'; break;
        case 6  : mensaje = 'Datos de inicio incorrectos'; break;
        case 7  : mensaje = 'Número de teléfono inválido'; break;
        case 8  : mensaje = 'El nombre solo puede contener letras y espacios'; break;
        case 9  : mensaje = 'El apellido solo puede contener letras y espacios'; break;
        case 10 : mensaje = 'Tienes que ser mayor de 18 años'; break;
        case 11 : mensaje = 'Fecha invalida'; break;
        case 12 : mensaje = 'El email ingresado ya existe'; break;
        case 13 : mensaje = 'El email ingresado no existe'; break;
        case 14 : mensaje = 'No se proporcionó un código'; break;
        case 15 : mensaje = 'CBU/CVU inválido'; break;
        case 16 : mensaje = 'Alias inválido'; break;
        case 17 : mensaje = 'Monto insuficiente'; break;
        case 18 : mensaje = 'Seleccione un monto'; break;
        case 19 : mensaje = 'Saldo insuficiente'; break;
        case 20 : mensaje = 'Monto inválido'; break;
        case 21 : mensaje = 'Seleccione un medio de pago válido'; break;
        case 22 : mensaje = "El documento es invalido"; break; 
        case 23 : mensaje = "Los correos no coinciden"; break;
        case 24 : mensaje = "El código ingresado no es válido"; break; //mensaje nuevo
        default : mensaje = 'Ha ocurrido un error. Inténtelo más tarde'; break;
            }
            return mensaje
        }
    

export default ErrorMessage;