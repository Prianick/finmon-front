export const responseHandler = {
    isSuccess(json) {
        if (json.exception != undefined) {
            console.log(json);
            alert(json.message);
            return false;
        }
        return true;
    },
    async parseResponse(response) {
        let json = await response.json()
        return {isSuccess: this.isSuccess(json), json: json}
    }
}