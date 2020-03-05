/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the Score object as used in Matches
*/

import { property } from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { Model } from './Model';

@jsonObject
export class Score extends Model {
    // Score fields
    @property
    @jsonMember
    public HomeScore: number;
    @property
    @jsonMember
    public AwayScore: number;

    /**
     * pretty representation of the Score
     *
     * @returns a string representing the Score
     */
    @property
    get Pretty(): string {
        return String(this.HomeScore) + " : " + String(this.AwayScore);
    }
}
