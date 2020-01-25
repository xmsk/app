/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the abstract ModelFactory that serves as base class for all REST
object factories; these factories should be used to create Model objects

use some module like https://github.com/JohnWeisz/TypedJSON to parse JSON to
class objects?
*/

import { TypedJSON } from 'typedjson';
import { restGET } from '../utils/rest';
import { View } from '../views/View';
import { Model } from './Model';

// type that the TypedJSON class constructor needs (as defined in the source)
// tslint:disable-next-line: no-any
export type Constructor<T> = new (...args: any[]) => T;
// type that we allow to be used to construct a model (number for getById and
// JSON object for an existing JSON object)
export type ModelType = object | number;

export class ModelFactory<T extends Model> {
    protected restHostname: string = "http://intra.xmsk.ch:8081";
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

    /*
    construct an object of a Model subclass by calling the REST endpoint and
    initializing the class fields and return it
    arguments:
        model: ModelType representing the Model instance that should be created
        cls: class of the subclass to construct (e.g. Player)

    returns:
        model: the Model that was constructed
    */
    public construct(
        model: ModelType,
        cls: Constructor<T>
    ): T {
        let serializer = new TypedJSON(cls);

        if (typeof(model) === "object") {
            // no need to fetch the data from the server
            return serializer.parse(model);
        } else {
            return serializer.parse(this.getJsonById(model));
        }
    }

    /*
    construct an object of a Model subclass by calling the REST endpoint and
    initializing the class fields and append it to a View
    arguments:
        model: ModelType representing the Model instance that should be created
        view: View to which the model should be added
        cls: class of the subclass to construct (e.g. Player)

    returns:
        void

    actions:
        add the created Model to view by calling the setModel function
    */
    public constructToView(
        model: ModelType,
        view: View,
        cls: Constructor<T>
    ): void {
        let constructed: Model = this.construct(model, cls);
        view.setModel(constructed);
    }

    /*
    get a json representation of the model given the id

    arguments:
        id: id of the model to get

    returns:
        jsonObj: JSON object of the model with the given id
    */
    protected getJsonById(id: number): object {
        return restGET(this.restHostname + this.restEndpoint + String(id));
    }
}
