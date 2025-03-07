export const ENVIROMENTS = {
  SERVER_PORT: Number(process.env.SERVER_PORT) || 3000,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT) ,
  DB_USERNAME: process.env.DB_USERNAME ,
  DB_PASSWORD: process.env.DB_PASSWORD ,
  DB_NAME: process.env.DB_NAME,
  DB_TYPE: process.env.DB_TYPE,
  JWT_SECRET: process.env.JWT_SECRET 
};


const requiredEnvVars = Object.entries(ENVIROMENTS);
for (const [key, value] of requiredEnvVars) {
  if (value === undefined || value === null) {
    console.error(`Error: Variable de entorno ${key} no está configurada`);
  }
} 