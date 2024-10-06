declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PLANT_DATABASE_API?: string;
    }
  }
}
