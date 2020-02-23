/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the Match object as used in the application
REST requests that return Match objects are mapped to this class
*/

import { property } from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { GameDay } from './GameDay';
import { Model } from './Model';
import { ModelFactory } from './ModelFactory';
import { ModelListFactory } from './ModelListFactory';
import { Team } from './Team';

@jsonObject
export class Match extends Model {
    public static factory: ModelFactory<Match> = new ModelFactory("/match/");
    public static listFactory: ModelListFactory<Match> =
        new ModelListFactory("/match/");
    // Match fields
    @property
    @jsonMember
    public MatchId: number;
    @property
    @jsonMember
    public AwayTeam: Team;
    @property
    @jsonMember
    public HomeTeam: Team;
    @property
    @jsonMember
    public RefereeTeam: Team;
    @property
    @jsonMember
    public Final: boolean;
    @property
    @jsonMember
    public GameDay: GameDay;
    @property
    @jsonMember
    public Time: string;

    get Id(): number {
        return this.MatchId;
    }
}
