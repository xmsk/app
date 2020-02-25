/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the ModelFactory that serves as factory for single JSON objects
retrieved via a REST interface; it also servers as a base class for all REST
object factories; these factories should be used to create Model objects

use some module like https://github.com/JohnWeisz/TypedJSON to parse JSON to
class objects?
*/

import { TypedJSON } from 'typedjson';
import { restGET } from '../utils/rest';
import { ModelSettable } from '../views/ModelSettable';
import { Model } from './Model';
import {
    Constructor,
    RESTFactory
} from './RESTFactory';

// type that we allow to be used to construct a model (number for getById and
// JSON object for an existing JSON object)
export type ModelType = object | number;

export class ModelFactory<T extends Model> extends RESTFactory {
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
        add the created Model to view
    */
    public constructToView(
        model: ModelType,
        view: ModelSettable,
        cls: Constructor<T>
    ): void {
        let serializer = new TypedJSON(cls);

        if (typeof(model) === "object") {
            // no need to fetch the data from the server
            view.setModel(serializer.parse(model));
        } else {
            this.getJsonPromiseById(model).then(
                (p) => {
                    view.setModel(serializer.parse(p));
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            );
        }
    }

    /*
    get a json representation of the model given the id

    arguments:
        id: id of the model to get

    returns:
        jsonObj: JSON object of the model with the given id
    */
    protected async getJsonPromiseById(id: number): Promise<Model> {
        return restGET(this.restHostname + this.restEndpoint + String(id) + "/");
    }
}
