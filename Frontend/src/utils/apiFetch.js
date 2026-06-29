export const API_BASE =
  process.env.REACT_APP_API_URL || "https://women-salon.onrender.com";

export const apiUrl = (url = "") => {
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE}${url.startsWith("/") ? url : `/${url}`}`;
};

export const getApiErrorMessage = async (response, fallback = "Request failed") => {
  try {
    const data = await response.json();
    return data.message || data.error || fallback;
  } catch {
    return fallback;
  }
};

export const apiFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {})
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(apiUrl(url), {
    ...options,
    headers,
    credentials: "include"
  });

  // If token expired
  if (response.status === 401 && refreshToken) {
    try {
      const refreshRes = await fetch(apiUrl("/refresh-token"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken })
      });

      const refreshData = await refreshRes.json();

      if (refreshData.success) {
        const newAccessToken = refreshData.accessToken;

        // Save new token
        localStorage.setItem("accessToken", newAccessToken);

        // Retry original request
        headers["Authorization"] =`Bearer ${newAccessToken}`;

        response = await fetch(apiUrl(url),{
          ...options,
          headers,
          credentials: "include"
        });

        return response;
      }
    } catch (err) {
      localStorage.clear();
        window.location.href = "/login";
        return;
    }

    // If refresh token invalid → logout
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  return response;
};
