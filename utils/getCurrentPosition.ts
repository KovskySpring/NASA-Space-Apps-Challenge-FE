export default async function getCurrentPosition(options?: PositionOptions) {
  const geolocation = navigator.geolocation;
  return new Promise<Readonly<[number, number]>>((resolve, reject) => {
    geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        reject(error);
      },
      options,
    );
  });
}
