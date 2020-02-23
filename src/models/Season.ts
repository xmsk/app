/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the Season object as used in the application
REST requests that return Season objects are mapped to this class
*/

import { property } from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { Model } from './Model';
import { ModelFactory } from './ModelFactory';
import { ModelListFactory } from './ModelListFactory';

@jsonObject
export class Season extends Model {
    public static factory: ModelFactory<Season> =
        new ModelFactory("/season/");
    public static listFactory: ModelListFactory<Season> =
        new ModelListFactory("/season/");
    // Match fields
    @property
    @jsonMember
    public SeasonId: number;
    @property
    @jsonMember
    public SeasonName: string;
    @property
    @jsonMember
    public Year: number;

    get Id(): number {
        return this.SeasonId;
    }
}
