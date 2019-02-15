export function getBaseUrl(api) {
  return process.env.REACT_APP_API_URL + "/" + api;
}

function getHeaders(user) {
  const headers = {
    "content-type": "application/json"
  };

  if (user) headers.Authorization = "Bearer " + user.accessToken;
  return headers;
}

export async function get(url, user) {
  return await fetch(url, {
    headers: getHeaders(user)
  })
    .then(response => {
      // redirect to login if the user's session has timed out
      if (response.status === 401) global.window.location.replace("/login");
      return response;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export async function post(url, data, user) {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: getHeaders(user)
  })
    .then(response => {
      // redirect to login if the user isn't authorized
      // but don't redirect if the user is actually trying to login, since that's just a failed login attempt.
      const tryingToLogin = window.location.href.indexOf("/login") > -1;
      if (response.status === 401 && !tryingToLogin)
        global.window.location.replace("/login");
      return response;
    })
    .catch(error => {
      throw new Error(error);
    });
}
