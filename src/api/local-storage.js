/* global document */
export const setCookie = (name, value, days) => {
  const d = new Date();
  const dayCount = days || 365;
  d.setTime(d.getTime() + dayCount * 24 * 60 * 60 * 1000);
  const expires = `expires= ${d.toUTCString()}`;
  document.cookie = `${name}= ${value}; ${expires}; path=/`;
};

export const getCookie = cname => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const checkCookie = cname => {
  const checkItem = getCookie(cname);

  if (checkItem !== '') {
    return true;
  }
  return false;
};
