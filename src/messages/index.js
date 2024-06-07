const message = {
  admin: {
    permissionDenied: "Permission denied",
    createproduct: {
      success: "Product created successfully",
      failure: "Failed to creating product",
      error: "Error creating product",
      titleAlreadyExists: "Title already exists",
    },
    updateproduct: {
      success: "Product updated successfully",
      failure: "Product not found",
      error: "Error updating product",
    },
    deleteproduct: {
      success: "Product deleted successfully",
      failure: "Product not found",
      error: "Error deleting product",
    },
    createuser: {
      success: "User created successfully",
      failure: "Failed to creating user",
      error: "Error creating user",
    },
    updateuser: {
      success: "User updated successfully",
      failure: "User not found",
      error: "Error updating user",
    },
    deleteuser: {
      success: "User deleted successfully",
      failure: "User not found",
      error: "Error deleting user",
    }
  },
  login: {
    success: "Inicio de sesión exitoso",
    failure: "Error al iniciar sesión",
    credentialsfailure: "Credenciales incorrectas",
    notexistinguser: "El usuario no existe en nuestro registro",
    waitingemail: "Correo electrónico no verificado"
  },
  signup: {
    success: "Creación de cuenta exitosa",
    failure: "Error al crear la cuenta",
    existinguser: "El usuario ya está registrado"
  },
  emailVerification: {
    success: "Mensaje enviado al email",
    failure: "Error al enviar el mensaje"
  },
  decodedToken: {
    success: "Email verificado",
    failure: "Error al verificar email"
  },
  approveExpert: {
    success: "Experta aprobada",
    failure: "Error al aprobar experta"
  },
  rejectExpert: {
    success: "Experta rechazada",
    failure: "Error al rechazar experta"
  },
  formExpert: {
    success: "Formulario de experta recibido",
    failure: "Error al enviar formulario de experta"
  },
  addItemToList: {
    success: "Item añadido a la lista",
    failure: "Error al añadir item a la lista"
  },
  removeItemFromList: {
    success: "Item eliminado de la lista",
    failure: "Error al eliminar item de la lista"
  },
  database: {
    success: "Operación realizada con éxito",
    failure: "Error al realizar la operación",
    usernotfound: "Usuario no encontrado",
    expert: {
      updatesuccess: "Experta actualizada correctamente",
    },
    user: {
      updatesuccess: "Usuario actualizado correctamente",
    }
  },
  passwordRecovery: {
    success: "Email enviado",
    failure: "Error al enviar email"
  }
}

module.exports = { message }