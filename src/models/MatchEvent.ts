/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 09.02.2020 17:43

implement the MatchEvent object as used in the application
REST requests that return MatchEvent objects are mapped to this class
*/

import {
    List,
    property
} from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { Model } from './Model';
import { ModelListFactory } from './ModelListFactory';
import { Player } from './Player';

@jsonObject
export class MatchEvent extends Model {

    /**
     * cannot provide a static factory because the changing
     * MatchId is part of the URL
     *
     * @param MatchId MatchId for which the MatchEvent factory should be created
     */
    public static constructMatchEventFactory(MatchId: number): ModelListFactory<MatchEvent> {
        return new ModelListFactory("/match/" + String(MatchId) + "/matchEvent");
    }

    // MatchEvent fields
    @property
    @jsonMember
    public MatchEventId: number;
    @property
    @jsonMember
    public MatchId: number;
    @property
    @jsonMember
    public Player: Player;
    @property
    @jsonMember
    public Score: number;
    @property
    @jsonMember
    public TeamId: number;
    @property
    @jsonMember
    public Type: string;

    get Id(): number {
        return this.MatchEventId;
    }

    /**
     * proxy for the PlayerId so we can safely access it, even if the Player is
     * undefined
     */
    get PlayerId(): number {
        if (this.Player === undefined) {
            return undefined;
        } else {
            return this.Player.PlayerId;
        }
    }
}

/**
 * indexes to be used for easier access to the MatchEventType List (enum is
 * automatically numerated starting at 0)
 */
export enum MatchEventTypeIndex {
    td,
    ep1,
    ep2,
    int,
    sack
}

/**
 * list of available MatchEvent types
 */
export let MatchEventType: List<string> = List.from([
    "Touchdown",
    "One-Point-Try",
    "Two-Point-Try",
    "Interception",
    "Sack",
    "Safety"
]);

export function typeToScore(type: string): number {
    switch (type) {
        case "Touchdown":
            return 6;

        case "One-Point-Try":
            return 1;

        case "Two-Point-Try":
            return 2;

        case "Safety":
            return 2;

        default:
            return 0;
    }
}
