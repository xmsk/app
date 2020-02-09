/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

Filter class for filtering Player lists
*/

import { List } from "tabris-decorators";
import {
    jsonMember,
    jsonObject,
    TypedJSON
} from "typedjson";
import { Player } from "../Player";
import { Filter } from "./Filter";

@jsonObject
export class PlayerFilter extends Filter {
    /**
     * PlayerFilter factory to construct an instance from a JSON object using
     * TypedJSON
     *
     * @param object JSON object to create the Filter from
     *
     * @returns PlayerFilter instance
     */
    public static construct(object: object): PlayerFilter {
        let serializer: TypedJSON<PlayerFilter> = new TypedJSON(PlayerFilter);

        return serializer.parse(object);
    }

    // filter members
    @jsonMember
    public PlayerId: number;
    @jsonMember
    public FirstName: string;
    @jsonMember
    public LastName: string;
    @jsonMember
    public TeamId: number;
    @jsonMember
    public TeamName: string;

    get qsp(): string {
        let qsp = "?";
        if (this.PlayerId !== undefined) {
            qsp += "PlayerId=" + String(this.PlayerId) + "&";
        }
        if (this.FirstName !== undefined) {
            qsp += "FirstName=" + String(this.FirstName) + "&";
        }
        if (this.LastName !== undefined) {
            qsp += "LastName=" + String(this.LastName) + "&";
        }
        if (this.TeamId !== undefined) {
            qsp += "TeamId=" + String(this.TeamId) + "&";
        }

        // strip last symbol whichi is either a "&" or a "?" if all members are
        // undefined
        qsp = qsp.slice(0, qsp.length - 1);

        return qsp;
    }

    public filterModel(player: Player): boolean {
        return Filter.compareUndefined(this.PlayerId, player.PlayerId) &&
            Filter.compareUndefined(this.FirstName, player.FirstName) &&
            Filter.compareUndefined(this.LastName, player.LastName) &&
            Filter.compareUndefined(this.TeamId, player.Team.TeamId) &&
            Filter.compareUndefined(this.TeamName, player.Team.TeamName);
    }

    public filterList(players: List<Player>): List<Player> {
        // need to convert to Array because Lsit does not have a 'filter' method
        let playersArray: Player[] = Array.from(players);
        playersArray = playersArray.filter(
            (el) => this.filterModel(el)
        );

        return List.from(playersArray);
    }
}
