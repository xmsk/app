/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the team object as used in the application
REST requests that return team objects are mapped to this class
*/

import { property } from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import {League} from './League';
import {Model} from './Model';
import { ModelFactory } from './ModelFactory';
import { ModelListFactory } from './ModelListFactory';

@jsonObject
export class Team extends Model {
    public static factory: ModelFactory<Team> = new ModelFactory("/team/");
    public static listFactory: ModelListFactory<Team> =
        new ModelListFactory("/team/");
    // team fields
    @property
    @jsonMember
    public TeamId: number;
    @property
    @jsonMember
    public TeamName: string;
    @property
    @jsonMember
    public HomeTown: string;
    @property
    @jsonMember
    public League: League;

    get Id(): number {
        return this.TeamId;
    }

    get Identification() {
        return this.TeamName + " - " + this.HomeTown;
    }
}
