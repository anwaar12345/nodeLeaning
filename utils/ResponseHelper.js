export default class ApiResponse {
  constructor() {
    this.defaultMessages = {
      200: 'OK',
      201: 'Created',
      400: 'Bad Request',
      422: 'Validation Error',
      500: 'Internal Server Error',
    };
  }

  success(data = null, message = null, meta = null, code = 200) {
    return {
      status: true,
      code,
      message: message ?? this.defaultMessages[code] ?? '',
      data,
      meta,
      timestamp: new Date().toISOString(),
    };
  }

  error(errors = null, message = null, code = 400) {
    return {
      status: false,
      code,
      message: message ?? this.defaultMessages[code] ?? '',
      errors,
      timestamp: new Date().toISOString(),
    };
  }
}
