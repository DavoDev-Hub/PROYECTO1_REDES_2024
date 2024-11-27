# Proyecto Mexican Monkeys Proplayers 🙈

Este proyecto es una aplicación de CRUD (Crear, Leer, Actualizar y Eliminar) construida con Docker, Node.js, React y MySQL para gestionar información sobre proplayers de "Mexican Monkeys".

## Descripción 📄

La aplicación permite:
- Crear un nuevo proplayer con información básica (nombre, foto y ganancias).
- Ver una lista de proplayers existentes.
- Editar la información de cada proplayer.
- Eliminar un proplayer de la lista.

## Tecnologías 🚀

- **Docker**: Para la contenedorización de la aplicación.
- **Node.js y Express**: Para el backend y la API REST.
- **React**: Para el frontend y la interfaz de usuario.
- **MySQL**: Para la base de datos.
  
## Estructura de Contenedores 🐬

La aplicación está dividida en tres contenedores de Docker:
1. **Frontend**: React ejecutado en un contenedor de Node.js.
2. **Backend**: Node.js + Express ejecutado en otro contenedor de Node.js.
3. **Base de datos**: MySQL en su propio contenedor.


## Pasos 🚗
Clona el repositorio:

Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:
```
git clone https://github.com/DavoDev-Hub/Proyecto1_Redes_2024_CRUD.git
cd Proyecto1_Redes_2024_CRUD
```
Construye y ejecuta los contenedores con Docker Compose:
Ejecuta el siguiente comando para construir y ejecutar los contenedores:

```docker-compose up --build```

Este comando hará lo siguiente:
Construirá las imágenes de Docker para el backend y el frontend, si no existen.
Iniciará los contenedores de MySQL, backend y frontend definidos en el archivo docker-compose.yml.
Una vez que los contenedores estén en ejecución, podrás acceder a la aplicación en:

> Frontend: http://localhost:3000

> Backend API: http://localhost:5000/api\proplayers

Detén los contenedores:
Cuando hayas terminado de trabajar con la aplicación, puedes detener todos los contenedores ejecutando:

```
docker-compose down
```
Esto detendrá y eliminará todos los contenedores, redes y volúmenes creados por Docker Compose.

