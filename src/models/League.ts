/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the league object as used in the application
REST requests that return league objects are mapped to this class
*/

import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { Model } from './Model';
import { ModelFactory } from './ModelFactory';

@jsonObject
export class League extends Model {
    public static factory: ModelFactory<League> = new ModelFactory("/league/");
    // League fields
    @jsonMember
    public LeagueId: number;
    @jsonMember
    public LeagueName: string;
}
