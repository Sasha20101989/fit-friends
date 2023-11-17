import { toast } from 'react-toastify';

export interface CustomError {
  response?: {
    status: number;
    data?: {
      details?: { messages: string[] }[];
      message?: string;
    };
  };
  message?: string;
}

export const errorHandle = (error: CustomError): void => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 400) {
      if (data && data.details && data.details.length > 0) {
        data.details.forEach((detail) => {
          detail.messages.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error(data?.message || 'Bad Request');
      }
    } else if (status === 401) {
      toast.error('Unauthorized');
    } else if (status === 404) {
      toast.error('Not Found');
    } else if (status === 409) {
      toast.error('Conflict');
    } else {
      toast.error('Server Error');
    }
  } else {
    toast.error('An error occurred');
  }
};
