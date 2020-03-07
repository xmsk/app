import { AlertDialog } from "tabris";

/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

utility functions for REST calls to the back end server
*/

export let restHostname: string = "https://nffl.xmsk.ch:443";

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
function errorAlert(): AlertDialog {
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
function failureAlert(): AlertDialog {
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
 */
function defaultOnFailure(response: Response): void {
    console.debug(response);
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
 * * `onSuccess` if the HTTP return code is 2xx
 * * `defaultOnFailure` if the HTTP return code is not 2xx
 * * `defaultOnError` if there is an Error during the REST call
 * if `popup` is true, simple Alerts are opened upon Failure/Error before the
 * corresponding postprocessing functions are called (default or the passed
 * ones); if `popup` is false, the postprocessing functions are called directly;
 * non-standard postprocessing functions can be passed as an argument
 *
 * @param popup boolean indicating whether to open the default Alerts upon
 * Failure/Error
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
function _rest(
    popup: boolean,
    method: string,
    url: string,
    body?: object | string,
    headers?: Headers,
    onSuccess?: (j: object | Array<number | string | object>) => void,
    onFailure?: (r: Response) => void,
    onError?: (e: Error) => void
): void {
    let bodyFinal: string;
    if (body instanceof Object) {
        bodyFinal = JSON.stringify(body);
    } else {
        bodyFinal = body;
    }

    let definedOnFailure: (r: Response) => void;
    let actualOnFailure: (r: Response) => void;
    let definedOnError: (e: Error) => void;
    let actualOnError: (e: Error) => void;

    // define functions that should be executed after a possible alert
    if (onError === undefined) {
        definedOnError = defaultOnError;
    } else {
        definedOnError = onError;
    }
    if (onFailure === undefined) {
        definedOnFailure = defaultOnFailure;
    } else {
        definedOnFailure = onFailure;
    }

    // actual functions that will be executed on Failure/Error
    if (popup) {
        actualOnError = (e: Error) => {
            let alert: AlertDialog = errorAlert();
            alert.open();
            alert.onClose(
                () => definedOnError(e)
            );
        };

        actualOnFailure = (response: Response) => {
            let alert: AlertDialog = failureAlert();
            // set error message on alert box
            response.json().then(
                (j) => {
                    alert.message = j.message;
                    alert.open();
                }
            ).catch(
                (e) => {
                    alert.close();
                    actualOnError(e);
                }
            );
            alert.onClose(
                () => definedOnFailure(response)
            );
        };
    } else {
        actualOnError = definedOnError;
        actualOnFailure = definedOnFailure;
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

/**
 * execute a REST call and open an Alert on Failure/Error
 *
 * the function is simply a proxy for the internal _rest function
 */
export function rest(
    method: string,
    url: string,
    body?: object | string,
    headers?: Headers,
    onSuccess?: (j: object | Array<number | string | object>) => void,
    onFailure?: (r: Response) => void,
    onError?: (e: Error) => void
): void {
    _rest(true, method, url, body, headers, onSuccess, onFailure, onError);
}

/**
 * execute a REST call and do **not** open an Alert on Failure/Error; e.g. if
 * the call will be automatically retried or is not crucial
 *
 * the function is simply a proxy for the internal _rest function
 */
export function restNoAlert(
    method: string,
    url: string,
    body?: object | string,
    headers?: Headers,
    onSuccess?: (j: object | Array<number | string | object>) => void,
    onFailure?: (r: Response) => void,
    onError?: (e: Error) => void
): void {
    _rest(false, method, url, body, headers, onSuccess, onFailure, onError);
}
