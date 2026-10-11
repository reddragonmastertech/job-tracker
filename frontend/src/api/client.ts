const apiUrl = import.meta.env.VITE_API_URL ?? "";
const apiToken = import.meta.env.VITE_API_TOKEN ?? "";

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);

  if (apiToken) {
    headers.set("Authorization", `Bearer ${apiToken}`);
  }

  return fetch(`${apiUrl}${path}`, {
    ...init,
    headers,
  });
}
