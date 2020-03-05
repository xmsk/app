/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

Filter class for filtering Match lists
*/

import { List } from "tabris-decorators";
import {
    jsonMember,
    jsonObject,
    TypedJSON
} from "typedjson";
import { Match } from "../Match";
import { Filter } from "./Filter";

@jsonObject
export class MatchFilter extends Filter {
    /**
     * MatchFilter factory to construct an instance from a JSON object using
     * TypedJSON
     *
     * @param object JSON object to create the Filter from
     *
     * @returns MatchFilter instance
     */
    public static construct(object: object): MatchFilter {
        let serializer: TypedJSON<MatchFilter> = new TypedJSON(MatchFilter);

        return serializer.parse(object);
    }

    // filter members
    @jsonMember
    public MatchId: number;
    @jsonMember
    public HomeTeamName: string;
    @jsonMember
    public HomeTeamId: number;
    @jsonMember
    public AwayTeamName: string;
    @jsonMember
    public AwayTeamId: number;
    @jsonMember
    public RefereeTeamName: string;
    @jsonMember
    public RefereeTeamId: number;
    @jsonMember
    public GameDayId: number;
    @jsonMember
    public Final: boolean;

    get qsp(): string {
        let qsp = "?";
        if (this.HomeTeamId !== undefined) {
            qsp += "HomeTeamId=" + String(this.HomeTeamId) + "&";
        }
        if (this.AwayTeamId !== undefined) {
            qsp += "AwayTeamId=" + String(this.AwayTeamId) + "&";
        }
        if (this.RefereeTeamId !== undefined) {
            qsp += "RefereeTeamId=" + String(this.RefereeTeamId) + "&";
        }
        if (this.GameDayId !== undefined) {
            qsp += "GameDayId=" + String(this.GameDayId) + "&";
        }
        if (this.Final !== undefined) {
            qsp += "Final=" + String(this.Final) + "&";
        }

        // strip last symbol whichi is either a "&" or a "?" if all members are
        // undefined
        qsp = qsp.slice(0, qsp.length - 1);

        return qsp;
    }

    public filterModel(match: Match): boolean {
        return Filter.compareUndefined(this.MatchId, match.MatchId) &&
        Filter.compareUndefined(this.HomeTeamId, match.HomeTeam.TeamId) &&
        Filter.compareUndefined(this.HomeTeamName, match.HomeTeam.TeamName) &&
        Filter.compareUndefined(this.AwayTeamId, match.AwayTeam.TeamId) &&
        Filter.compareUndefined(this.AwayTeamName, match.AwayTeam.TeamName) &&
        Filter.compareUndefined(this.RefereeTeamName, match.RefereeTeam.TeamName) &&
        Filter.compareUndefined(this.RefereeTeamId, match.RefereeTeam.TeamId) &&
        Filter.compareUndefined(this.GameDayId, match.GameDay.GameDayId);
    }

    public filterList(matchs: List<Match>): List<Match> {
        // need to convert to Array because Lsit does not have a 'filter' method
        let matchsArray: Match[] = Array.from(matchs);
        matchsArray = matchsArray.filter(
            (el) => this.filterModel(el)
        );

        return List.from(matchsArray);
    }
}
