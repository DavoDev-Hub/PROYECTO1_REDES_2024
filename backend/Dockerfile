# Usa una imagen de Node como base
FROM node:14

# Crea un directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["npm", "run", "dev"]
