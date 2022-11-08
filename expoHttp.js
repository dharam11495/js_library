"use strict";

/**************   Expo http start */
/**
 * Class http is used to create http calls
 */
class ExpoHttp {
    constructor() {
        /**set csrf token header for all ajax requests */
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        });
    }

    /** used to send http get request */
    get({
        url,
        data = {},
        crossDomain = false,
        expoDomain = true,
        processData = true,
        contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }) {
        return this.callHttpRequest({
            type: "GET",
            url,
            data,
            crossDomain,
            expoDomain,
            processData,
            contentType
        });
    }

    /** used to send http put request */
    put({
        url,
        data = {},
        crossDomain = false,
        expoDomain = true,
        processData = true,
        contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }) {
        return this.callHttpRequest({
            type: "put",
            url,
            data,
            crossDomain,
            expoDomain,
            processData,
            contentType
        });
    }
    /** used to send http delete request */
    delete({
        url,
        data = {},
        crossDomain = false,
        expoDomain = true,
        processData = true,
        contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }) {
        return this.callHttpRequest({
            type: "DELETE",
            url,
            data,
            crossDomain,
            expoDomain,
            processData,
            contentType
        });
    }

    /** used to send http post request */
    post({
        url,
        data = {},
        crossDomain = false,
        expoDomain = true,
        processData = true,
        contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }) {
        return this.callHttpRequest({
            type: "POST",
            url,
            data,
            crossDomain,
            expoDomain,
            processData,
            contentType
        });
    }

    /** class http request to server */
    callHttpRequest({
        type = "POST",
        url,
        data = {},
        crossDomain = false,
        expoDomain = true,
        processData = true,
        contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }) {

        let response = {
            xhr: null,
            subscribe: null
        };
        response.subscribe = () => {
            return new Promise((resolve, reject) => {
                url = expo.stripTrailingSlash(url);

                response.xhr = $.ajax({
                    type: type,
                    url: url,
                    crossDomain: crossDomain,
                    dataType: "json",
                    data: data,
                    processData: processData,
                    contentType: contentType
                })
                    .done(xhrRresponse => {
                        if (expoDomain) {
                            if (xhrRresponse.redirect) {
                                window.location.href = xhrRresponseonse.redirect.url;
                            } else if (xhrRresponse.result) {
                                return resolve(xhrRresponse.result);
                            } else {
                                return reject({
                                    'errorMessage': (expo.isKeyExistsInObject(xhrRresponse.error, "errorMessage") ? xhrRresponse.error.errorMessage :(expo.isKeyExistsInObject(xhrRresponse, "message")?xhrRresponse.message:'error.common_error')),
                                    'errorDetails': (expo.isKeyExistsInObject(xhrRresponse.error, "errorDetails") ? xhrRresponse.error.errorDetails : null)
                                });
                            }
                        } else {
                            return resolve(xhrRresponse);
                        }
                    })
                    .fail((xhr, textStatus, errorThrown) => {
                        if (expo.isKeyExistsInObject(xhr, "responseJSON")) {
                            return reject({
                                'errorMessage': (expo.isKeyExistsInObject(xhr.responseJSON.error, "errorMessage") ? xhr.responseJSON.error.errorMessage : (expo.isKeyExistsInObject(xhr.responseJSON, "message")?xhr.responseJSON.message:'error.common_error')),
                                'errorDetails': (expo.isKeyExistsInObject(xhr.responseJSON.error, "errorDetails") ? xhr.responseJSON.error.errorDetails : null),
                                'xhr': xhr
                            });
                        }
                        reject({
                            'errorMessage': 'error.common_error',
                            'errorDetails': null,
                            'xhr': xhr
                        });
                    });
            });
        }
        return response;
    }
}
// Create expoHttp object
const expoHttp = new ExpoHttp();
/**************   Expo http end */
