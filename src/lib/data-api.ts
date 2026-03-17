
export const handleErrorException = (result: any) => {
    let errMsg = "An error occurred";

    if (Array.isArray(result.errors)) {
        errMsg = result.errors[0]?.message || "Invalid input format";
    } else if (typeof result.errors === 'string') {
        errMsg = result.errors;
    } else if (result.message) {
        errMsg = result.message;
    }
    throw new Error(errMsg);
}

export const requestHeaders = (token: string) => ({
    'Content-Type': 'application/json',
    Authorization: token,
})



