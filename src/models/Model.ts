/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

abstract class that all Models should extend, this is to make sure that all
Models are jsonObjects and can be parsed with TypedJSON

the fields have to be @jsonMember so they can be parsed using typedJSON and they
have to be @property so the bind to widget properties works
*/

import { List } from "tabris-decorators";
import { ModelFactory } from "./ModelFactory";

export abstract class Model {
    // factory instance for the given class so we don't always have to
    // instanciate the factory
    // sub classes MUST override this with a factory for the given subclass
    public static factory: ModelFactory<Model>;

    /**
     * alias for the Model's id field
     *
     * @returns the Model's unique Id
     */
    abstract get Id(): number;

    /**
     * check if a given model is in a list by comparing all items in the list to
     * the Model's (hopefully unique) Id
     *
     * @returns true if the given List contains a Model with the same Id
     */
    public isInList(list: List<Model>): boolean {
        for (const model of list) {
            // need to check type because we have it implemented in the base
            // class
            if (typeof(model) === typeof(this) && model.Id === this.Id) {
                return true;
            }
        }

        return false;
    }
}
