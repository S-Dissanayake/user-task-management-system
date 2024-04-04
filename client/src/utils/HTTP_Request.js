import axios from 'axios';

export const http_Request = (data, successCallback, errorCallback, otherDetails) => {
    axios({
        url: data.url,
        method: data.method,
        data: data.bodyData,
        contentType: otherDetails?.contentType ? otherDetails?.contentType : 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            'Authorization': 'Bearer ' + (localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : (otherDetails?.token ? otherDetails.token : "")),
            'Access-Control-Expose-Headers': "jwt_token"
        },
        responseType: otherDetails?.responseType ? otherDetails?.responseType : 'json'
    })
    .then(function (response) {
        successCallback(response);
    })
    .catch(function (error) {
        errorCallback(error);
    })
}