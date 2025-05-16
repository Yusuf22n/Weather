interface Coordinates {
  lat: number;
  lon: number;
}

export const getUserCoordinates = (): Promise<Coordinates | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        resolve(null);
      }
    );
  });
};
