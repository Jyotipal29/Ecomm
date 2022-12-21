// export const api = "http://localhost:443/api";
// export const api = "https://ecomm-production-928e.up.railway.app/api";

export const apiUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3005/api"
    : "https://ecomm-production-928e.up.railway.app/api";
