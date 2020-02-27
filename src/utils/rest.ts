import { AlertDialog } from "tabris";

/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

utility functions for REST calls to the back end server
*/

export let restHostname: string = "https://intra.xmsk.ch:443";

/*
get data from a REST service located at 'url' and return a promis for the JSON
response

arguments:
    url: url of the REST service

returns:
    promise: promise for the json data
*/
export async function restGET(url: string = '') {
    const response = await fetch(url);

    return response.json(); // parses JSON response into native JavaScript objects
}

/**
 * create an alert to be shown in case of an error
 *
 * @returns an alert object with default text for an Error
 */
export function errorAlert(): AlertDialog {
    return new AlertDialog({
        title: 'An error occured',
        message: 'There seems to be a connection problem with the back-end',
        buttons: {
            ok: 'close'
        }
    });
}

/**
 * create an alert to be shown in case of a failure (non-2xx HTTP return code)
 *
 * @returns an alert object with default text for a Failure
 */
export function failureAlert(): AlertDialog {
    return new AlertDialog({
        title: 'An error occured',
        buttons: {
            ok: 'close'
        }
    });
}

/**
 * default onFailure Routine that is opened when the HTTP status code is not 2xx
 * and a specialized onFailure routine was not given to the rest function
 *
 * @param response Promise to the response received from the REST call
 * @param onError fucntion to be called in case there is an Error when unpacking
 * the JSON response
 */
function defaultOnFailure(
    response: Response,
    onError: (e: Error) => void
): void {
    let alert: AlertDialog = failureAlert();
    // set error message on alert box
    response.json().then(
        (j) => alert.message = j.message
    ).catch(
        onError
    );
    alert.open();
    return;
}

/**
 * default onError Routine that is opened when the HTTP call results in an
 * errror and a specialized onFailure routine was not given to the rest function
 *
 * @param e Error that was raised
 */
function defaultOnError(e: Error): void {
    console.debug(e);
    errorAlert().open();
    return;
}

/**
 * generalized function for REST calls
 *
 * some default headers are set automatically (not overwritten), if these
 * headers should be different, they have to be set eplicitly
 *
 * the default behaviour of the function is to call the url with the parameters
 * that were passed and call
 *      * `defaultOnFailure` if the HTTP return code is not 2xx
 *      * `defaultOnError` if there is an Error during the REST call
 * these two functions open simple Alerts and do nothing afterwards; if a
 * special function should be called after a Failure/Error, it can be passed as
 * an argument; the passed functions can make use of the exported failureAlert
 * and errorAlert and then attach an .onClose() function to the Alerts for
 * further processing
 *
 * @param method the method for the REST call
 * @param url the URL for the REST endpoint
 * @param body the body to be passed in POST/PUT calls
 * @param headers the HTTP headers for the call
 * @param onSuccess function to be called after a successful REST call (HTTP
 * return code 2xx); the function will be called with the returned JSON body as
 * an argument
 * @param onFailure function to be called after a failed HTTP call (return code
 * >= 300); the function will be called with the Response object as argument
 * @param onError function to be called after an Error has been raised during a
 * RET call; the function will be called with the raised Error as an argument
 */
export function rest(
    method: string,
    url: string,
    body?: object | string,
    headers?: Headers,
    onSuccess?: (j: object) => void,
    onFailure?: (r: Response) => void,
    onError?: (e: Error) => void
): void {
    let bodyFinal: string;
    if (body instanceof Object) {
        bodyFinal = JSON.stringify(body);
    } else {
        bodyFinal = body;
    }

    let actualOnFailure: (r: Response) => void;
    let actualOnError: (e: Error) => void;

    if (onError === undefined) {
        actualOnError = defaultOnError;
    } else {
        actualOnError = onError;
    }
    if (onFailure === undefined) {
        actualOnFailure = (r: Response) => defaultOnFailure(r, actualOnError);
    } else {
        actualOnFailure = onFailure;
    }

    // TODO add default headers

    fetch(
        url,
        {
            method,
            headers,
            body: bodyFinal
        }
    ).then(
        (response) => {
            if ( 200 <= response.status && response.status < 300) {
                // successful call
                if (onSuccess !== undefined) {
                    response.json().then(
                        onSuccess
                    ).catch(
                        actualOnError
                    );
                }
            } else {
                // open alert box showing the error message
                actualOnFailure(response);
            }
        }
    ).catch(
        actualOnError
    );
}
