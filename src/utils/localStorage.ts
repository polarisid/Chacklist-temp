const DATA_POINTS_KEY = "temperatureHumidityDataPoints";

export const getStoredDataPoints = () => {
  const storedData = localStorage.getItem(DATA_POINTS_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const storeDataPoint = (dataPoint: {
  time: string;
  temperature: number;
  humidity: number;
}) => {
  const storedData = getStoredDataPoints();
  storedData.push(dataPoint);
  localStorage.setItem(DATA_POINTS_KEY, JSON.stringify(storedData));
};
