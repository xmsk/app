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

@jsonObject
export class MatchStats extends Model {
    // stats fields
    @property
    @jsonMember
    public Games: number = 0;
    @property
    @jsonMember
    public Wins: number = 0;
    @property
    @jsonMember
    public Losses: number = 0;
    @property
    @jsonMember
    public WinningPercentage: number = 0;
}
