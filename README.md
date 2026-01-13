# 🐶 Administrador de Pacientes Veterinarios (APV) – Frontend

Aplicación web desarrollada en **React** para la gestión de pacientes veterinarios.  
Forma parte de un proyecto **full-stack MERN**, orientado a uso real y demostración profesional.

Permite a los veterinarios autenticarse, administrar sus pacientes (mascotas) y gestionar su perfil.

---

## 🚀 Demo en vivo

🔗 **Aplicación:** https://apv-mern-adonay.netlify.app  
🔗 **API Backend:** https://agenciaviajesnode-u8it.onrender.com

---

## 🧪 Credenciales de prueba (Demo)

> Pensadas para que reclutadores puedan explorar la aplicación sin necesidad de registro.

- **Email:** demo@demo.com  
- **Password:** Demo123

⚠️ *El flujo de registro con confirmación por email está implementado a nivel de código,  
pero en el entorno de producción los correos no se envían a direcciones reales.  
(Se utilizó Mailtrap durante el desarrollo).  
Para una revisión completa de la aplicación, se recomienda usar las credenciales demo indicadas en la página de Login.*

---

## 🧠 Funcionalidades principales

### 👤 Autenticación
- Inicio de sesión
- Protección de rutas
- Persistencia de sesión
- Recuperación y cambio de contraseña
- Edición del perfil del veterinario

### 🐾 Gestión de pacientes
- Crear pacientes (mascotas)
- Editar pacientes
- Eliminar pacientes
- Asociación paciente ↔ veterinario autenticado

---

## 🛠️ Tecnologías utilizadas (Frontend)

- React
- Vite
- React Router DOM
- Axios
- Context API
- CSS moderno
- Consumo de API REST

---

## 🔐 Seguridad
- Autenticación basada en JWT
- Rutas protegidas
- Manejo de sesiones
- Variables de entorno para configuración sensible

---

## 📦 Instalación local (opcional)

```bash
npm install
npm run dev
