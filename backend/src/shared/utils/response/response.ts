type SuccessResponse<T> = { success: true; data?: T; message?: string };
type ErrorResponse<TDetails> = {
  success: false;
  error: {
    code: string;
    status: number;
    message: string;
    details?: TDetails;
  };
};

export const successResponse = <T>({
  message,
  data
}: {
  message?: string;
  data?: T;
}): SuccessResponse<T> => ({
  success: true,
  message,
  data
});

export const errorResponse = <TDetails = unknown>({
  code,
  status,
  message,
  details
}: {
  code: string;
  status: number;
  message: string;
  details?: TDetails;
}): ErrorResponse<TDetails> => ({
  success: false,
  error: { code, status, message, details }
});
