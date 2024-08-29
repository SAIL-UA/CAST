function getXsrfToken(): string | null {
    const matches = document.cookie.match('\\b_xsrf=([^;]*)\\b');
    return matches ? matches[1] : null;
  }
  
  export async function requestAPI<T>(endpoint: string, init: RequestInit): Promise<T> {
    // Get the _xsrf token
    const xsrfToken = getXsrfToken();
  
    // Set the headers with the _xsrf token
    const headers = new Headers(init.headers);
    if (xsrfToken) {
      headers.append('X-XSRFToken', xsrfToken);
    }
  
    const response = await fetch(`/log`, {
      ...init,
      headers: headers
    });
  
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || response.statusText);
    }
    return response.json();
  }
  