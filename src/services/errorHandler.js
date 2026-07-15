import useAuthStore from '../zustand-store/authStore'

function getErrorMessage(error, responseData) {
  if (typeof responseData === 'string' && responseData) {
    return responseData
  }

  if (responseData?.message) {
    return responseData.message
  }

  if (error?.message) {
    return error.message
  }

  return 'An unexpected error occurred'
}

function errorHandler(error, status, responseData) {
  if (status === 401) {
    useAuthStore.getState().logout()

    return {
      success: false,
      message: getErrorMessage(error, responseData) || 'Unauthorized',
      status: 401,
      unauthorized: true,
    }
  }

  return {
    success: false,
    message: getErrorMessage(error, responseData),
    status: status || 0,
  }
}

export default errorHandler
