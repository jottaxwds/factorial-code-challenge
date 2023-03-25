export const handleErrorMessage = error => {
    const { response } = error
    const { status, data } = response ?? {}
    const errorText = data?.message || error.message
    return `Error ${status}: ${errorText}`
  }