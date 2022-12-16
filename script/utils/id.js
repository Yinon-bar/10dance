export const inputValidationId = (inputId) => {
    let responseId = 0;
    if (!inputId.length) {
        alert("נא הקש ת.ז.");
    } else if (inputId.length > 9) {
        alert("ת.ז ארוכה מידי");
    } else {
        responseId = inputId;
        if(responseId.length !== 9) {
            const delta = 9 - inputId.length;
            for (let i = 0; i < delta; i++) {
            responseId = "0" + responseId;
            }
        }
    }
    return responseId;
}