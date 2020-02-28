/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the StatsFactory that generates the ifferent Stats Models;
need to have specific class because the REST endpoint is non-standard (id in the
middle)

REST endpoint should be of the pattern
    /<object>/{id}/stats
upon creation of the factory the <object> path should be given as endpoint

the generic type T should be the kind of stats that we want to generate, e.g.
PlayerStats
*/

import { Model } from './Model';
import { ModelFactory } from './ModelFactory';

export class StatsFactory<T extends Model> extends ModelFactory<T> {
    /*
    override method of base class to handle non-standard REST endpoint
    */
    protected getUrlWithId(id: number): string {
        return this.restHostname + this.restEndpoint + String(id) + "/stats/";
    }
}
