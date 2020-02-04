/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

abstract base class for filtering ModelArrays, either directly at the REST
request or by selecting a subset of an array to display

the Filter sub classes should implement the allowed filters as class members
that can be initialized using TypedJSON; they should also have a property
(getter?) that returns a string representation of the filets that are allowed as
query string parameters
*/

import { Model } from "../Model";

export abstract class Filter {
    /**
     * 'loosely' compare two objects; use this when comparing Model fields to
     * Filter properties because Filter properties that are not passed upon
     * creation are left undefined
     *
     * @typeparam T tpye of the objects to compare
     *
     * @param a object used to compare against; should be the Filter property -
     * can be `undefined`
     * @param b compare to `a`; should be the Model property
     *
     * @returns result of comparison; true even if `a` is `undefined`
     */
    protected static compareUndefined<T>(a: T, b: T): boolean {
        return a === undefined || a === b;
    }

    /**
     * get a representation of the Filter members that can be used as query
     * string parameters in a REST call to a REST endpoint returning a
     * ModelArray
     *
     * @returns a string representation of allwoed query string
     *  parameters, if there are not qllowed query string parameters set, an
     *  empty string is returned; for example
     *  ```
     *  "?parm1=val1&parm2=val2"
     *  ```
     *  or
     *  ```
     *  ""
     *  ```
     */
    abstract get qsp(): string;

    /**
     * filter a given Model with the parameters of the Filter
     *
     * @param model Model to filter
     *
     * @returns true if all undefined Filter members match the
     * corresponding fields in the massed model
     */
    public abstract filterModel(model: Model): boolean;

    /**
     * filter a given array of Models and return an array of elements matching
     * the filter
     *
     * @param models - an array of Model instances to be filtered
     *
     * @returns filteredArray - an array containing copies of the
     * Models matching the filter
     */
    public abstract filterArray(models: Model[]): Model[];
}
