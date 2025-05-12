# API de Notas - Node.js + TypeScript + SQL Server

Este proyecto es una API REST para gestionar tareas. Está construida con Node.js, TypeScript y SQL Server.

## 🚀 Tecnologías

- Node.js
- Express
- TypeScript
- SQL Server
- cors

## 📦 Instalación

1. Clona el repositorio:
   Se debe trabajar en la rama:
     dev

`bash
git clone [https://github.com/tuusuario/tu-repo-backend.git](https://github.com/AlejandroSTapia/ToDo_API.git)
- cd ToDo_API
- npm install

## Ejecuta el servidor en modo desarrollo:
-npm run dev


## 🗂️ Endpoints principales
| Método | Ruta            | Descripción             |
| ------ | --------------- | ----------------------- |
| GET    | /api/tasks      | Obtener todas las notas |
| POST   | /api/tasks      | Crear una nueva nota    |
| PUT    | /api/tasks/\:id | Actualizar una nota     |
| DELETE | /api/tasks/\:id | Eliminar una nota       |

## 🗄️ Base de datos
La base de datos se encuentra en SQL Server.

Puedes importar el archivo Tasks.sql (ubicado en la carpeta src/database/) 
desde SQL Server Management Studio y ejecutarlo
