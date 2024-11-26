# Usa una imagen base de Node
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
