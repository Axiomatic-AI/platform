import { getClient } from '../../../lib/api';
import { useMutation } from '@tanstack/react-query';

interface ExecuteCodeResponse {
  output: string;
  error?: string;
}

interface ExecuteCodeParams {
  code: string;
}

const wrapPicDesignerCodeWithPrints = (code: string) => {
  return `
import base64
from io import BytesIO
from PIL import Image

${code}

# Convert the GDS image to base64
path = "image.png"

fig = c.plot(return_fig=True)
fig.savefig(path)

# Print base64 string
with open(path, "rb") as f:
    img_base64 = base64.b64encode(f.read()).decode("utf-8")

print(img_base64)
`
}


interface ExecuteGdsFactoryCodeResponse {
  base64Image: string;
  error?: string;
}

export function useExecuteGdsFactoryCode() {
  return useMutation<ExecuteGdsFactoryCodeResponse, Error, ExecuteCodeParams>({
    mutationFn: async ({ code }: ExecuteCodeParams) => {
      const response = await getClient().post<ExecuteCodeResponse>('/code-execution/python/execute', { 
        code: wrapPicDesignerCodeWithPrints(code)
      });

      return {
        base64Image: response.output
      };
    }
  });
} 