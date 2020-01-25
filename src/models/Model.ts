/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

abstract class that all Models should extend, this is to make sure that all
Models are jsonObjects and can be parsed with TypedJSON
*/

import { ModelFactory } from "./ModelFactory";

export abstract class Model {
    // factory instance for the given class so we don't always have to
    // instanciate the factory
    // sub classes MUST override this with a factory for the given subclass
    public static factory: ModelFactory<Model>;
}
