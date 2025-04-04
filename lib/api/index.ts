export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/backend-api') {
    this.baseUrl = baseUrl;
  }

  async post<T>(path: string, data: unknown, options?: { isFormData?: boolean }): Promise<T> {
    const headers: Record<string, string> = {};
    
    if (!options?.isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers,
      body: options?.isFormData ? data as FormData : JSON.stringify(data),
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to make POST request to ${path}: ${errorText}`);
    }

    try {
      const responseData = await response.json();
      if (!responseData) {
        throw new Error('Empty response from server');
      }
      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse response: ${error.message}`);
      }
      throw new Error('Failed to parse response: Unknown error');
    }
  }
}

export const getClient = () => new ApiClient();
