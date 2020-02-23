/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

abstract base class of RESTFactories which should dcreate TypeScript class
objects from data retrieved from a REST endpoint

the subclasses should implement functions to retrieve the data and attach it to
views; however, since the definitions of the functions vary based on the data
they cannot be defined here
*/

import { restHostname } from '../utils/rest';

// type that the TypedJSON class constructor needs (as defined in the source)
// tslint:disable-next-line: no-any
export type Constructor<T> = new (...args: any[]) => T;

export abstract class RESTFactory {
    protected restHostname: string = restHostname;
    protected restEndpoint: string;

    /*
    construct a ModelFactory instance; unfortunately we have to pass the
    endpoint here because there is no reasonable way of infering it statically
    from anywhere
        * we cannot access static properties of the T class because generics
          only provide the instance side of a class, not the static side
        * if we make the ModelFactory class abstract we have to create a new
          factory class for each new model, this is quite anoying

    arguments:
        endpoint: string representing the relative path of the endpoint where a
            T type json object can be retrieved, e.g. /player/ - must include
            leading and trailing slash
    */
    constructor(endpoint: string) {
        this.restEndpoint = endpoint;
    }
}
