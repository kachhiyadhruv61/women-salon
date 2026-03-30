const API_BASE = "http://localhost:5000";

export const apiFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // ✅ CHECK: FormData che ke nai
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {})
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers
  });

  // 🔄 Token refresh logic same
  if (response.status === 401 && refreshToken) {
    try {
      const refreshRes = await fetch(`${API_BASE}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });

      const refreshData = await refreshRes.json();

      if (refreshData.success) {
        const newAccessToken = refreshData.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        headers["Authorization"] = `Bearer ${newAccessToken}`;

        response = await fetch(`${API_BASE}${url}`, {
          ...options,
          headers
        });

        return response;
      }
    } catch (err) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  return response;
};