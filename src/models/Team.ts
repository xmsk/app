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

@jsonObject
export class Team extends Model {
    public static factory: ModelFactory<Team> = new ModelFactory("/team/");
    // team fields
    @jsonMember
    @property
    public TeamId: number;
    @jsonMember
    @property
    public TeamName: string;
    @jsonMember
    @property
    public HomeTown: string;
    @jsonMember
    @property
    public League: League;
}
