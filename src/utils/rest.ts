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
