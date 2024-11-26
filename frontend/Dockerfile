# Usa una imagen de Node como base
FROM node:14

# Crea un directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install
RUN npm install react-scripts

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
