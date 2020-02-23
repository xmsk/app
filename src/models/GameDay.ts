/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the GameDay object as used in the application
REST requests that return GameDay objects are mapped to this class
*/

import { property } from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { Model } from './Model';
import { ModelFactory } from './ModelFactory';
import { ModelListFactory } from './ModelListFactory';
import { Season } from './Season';
import { Team } from './Team';

@jsonObject
export class GameDay extends Model {
    public static factory: ModelFactory<GameDay> =
        new ModelFactory("/gameDay/");
    public static listFactory: ModelListFactory<GameDay> =
        new ModelListFactory("/gameDay/");
    // Match fields
    @property
    @jsonMember
    public GameDayId: number;
    @property
    @jsonMember
    public Date: string;
    @property
    @jsonMember
    public Description: string;
    @property
    @jsonMember
    public HostingTeam: Team;
    @property
    @jsonMember
    public Location: string;
    @property
    @jsonMember
    public Season: Season;

    get Id(): number {
        return this.GameDayId;
    }
}
