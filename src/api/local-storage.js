/* global document */
export const setCookie = (name, value, expiresOn) => {
  const d = new Date();
  d.setTime(d.getTime() * 24 * 60 * 60 * 1000);
  const expires = `expires= ${d.toUTCString()}`;
  document.cookie = `${name}= ${value}; ${expires}; path=/`;
};
