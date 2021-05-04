export const responseHandler = {
    isSuccess(json) {
        if (json.exception != undefined) {
            console.log(json);
            alert(json.message);
            return false;
        }

        if (json.errors != undefined) {
            console.log(json);
            let msg = '';
            for (let key in json.errors) {
                msg += json.errors[key].join('. ') + ' ';
            }
            alert(msg);
            return false;
        }
        return true;
    },
    parseResponse(response) {
        return response.json().then((json) => {
            if (this.isSuccess(json)) {
                return Promise.resolve(json);
            } else {
                return Promise.reject(json);
            }
        })
    }
}