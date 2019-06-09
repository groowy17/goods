import { MIN_RATE_CURRENCY, MAX_RATE_CURRENCY } from "./constants";

export const getRandomRate = () => {
  return Math.floor(
    Math.random() * (MAX_RATE_CURRENCY - MIN_RATE_CURRENCY) + MIN_RATE_CURRENCY
  );
};

export const getPriceInRubles = (price, rateCurrency) => {
  return Math.round(price * rateCurrency * 100) / 100;
};
