/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the stats object as used in the application
REST requests that return team objects are mapped to this class
*/

import { property } from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { MatchEventStats } from './MatchEventStats';
import { MatchStats } from './MatchStats';
import { Model } from './Model';
import { StatsFactory } from './StatsFactory';

@jsonObject
export class TeamStats extends Model {
    public static factory: StatsFactory<TeamStats>
        = new StatsFactory("/team/");
    // stats fields
    @property
    @jsonMember
    public MatchStats: MatchStats;
    @property
    @jsonMember
    public MatchEventStats: MatchEventStats;
}
