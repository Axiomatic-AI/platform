export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/backend-api') {
    this.baseUrl = baseUrl;
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to make POST request to ${path}`);
    }

    return response.json();
  }
}

export const getClient = () => new ApiClient();
