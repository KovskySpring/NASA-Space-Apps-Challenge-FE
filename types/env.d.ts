declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GIOVANNI_API_KEY?: string;
      PLANT_DATABASE_API?: string;
    }
  }
}
