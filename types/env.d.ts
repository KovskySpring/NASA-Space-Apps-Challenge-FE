declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PLANT_DATABASE_API?: string;
      NEXT_PUBLIC_HOST?: string;
      NEXT_PUBLIC_HYDRO1_GES_DISC_API?: string;
    }
  }
}
