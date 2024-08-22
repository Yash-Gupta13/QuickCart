export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "strict",
};
