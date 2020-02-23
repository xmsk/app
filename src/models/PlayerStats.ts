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
    @property
    @jsonMember
    public Games: number = 0;
    @property
    @jsonMember
    public Touchdowns: number = 0;
    @property
    @jsonMember
    public OnePointTrys: number = 0;
    @property
    @jsonMember
    public TwoPointTrys: number = 0;
    @property
    @jsonMember
    public Interceptions: number = 0;
    @property
    @jsonMember
    public Sacks: number = 0;
}
