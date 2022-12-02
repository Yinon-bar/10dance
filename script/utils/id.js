export const inputValidationId = (input) => {
    let response = 0;
    const inputLength = input.length;
    if (!inputLength) {
        alert("נא הקש ת.ז.");
    } else if (inputLength > 9) {
        alert("ת.ז ארוכה מידי");
    } else {
        let newIdBase = input;
        if(inputLength === 9){
            response = input;
        }
        else  {
            const delta = 9 - inputLength;
            let prefix = "";
            for (let i = 0; i < delta; i++) {
            prefix += "0";
            }
            const newId = `${prefix}${newIdBase}`;
            response = newId;
        }
    }
    return response;
}