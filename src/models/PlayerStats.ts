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
import {Model} from './Model';
import { StatsFactory } from './StatsFactory';

@jsonObject
export class PlayerStats extends Model {
    public static factory: StatsFactory<PlayerStats>
        = new StatsFactory("/player/");
    // team fields
    @jsonMember
    @property
    public Games: number = 0;
    @jsonMember
    @property
    public Touchdowns: number = 0;
    @jsonMember
    @property
    public OnePointTrys: number = 0;
    @jsonMember
    @property
    public TwoPointTrys: number = 0;
    @jsonMember
    @property
    public Interceptions: number = 0;
    @jsonMember
    @property
    public Sacks: number = 0;
}
