/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the team object as used in the application
REST requests that return team objects are mapped to this class
*/

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
    public TeamId: number;
    @jsonMember
    public TeamName: string;
    @jsonMember
    public HomeTown: string;
    @jsonMember
    public League: League;
}
