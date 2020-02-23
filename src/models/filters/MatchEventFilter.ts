/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

Filter class for filtering MatchEvent lists
*/

import { List } from "tabris-decorators";
import {
    jsonMember,
    jsonObject,
    TypedJSON
} from "typedjson";
import { MatchEvent } from "../MatchEvent";
import { Filter } from "./Filter";

@jsonObject
export class MatchEventFilter extends Filter {
    /**
     * MatchEventFilter factory to construct an instance from a JSON object
     * using TypedJSON
     *
     * @param object JSON object to create the Filter from
     *
     * @returns MatchEventFilter instance
     */
    public static construct(object: object): MatchEventFilter {
        let serializer: TypedJSON<MatchEventFilter> =
            new TypedJSON(MatchEventFilter);

        return serializer.parse(object);
    }

    // filter members
    @jsonMember
    public MatchEventId: number;
    @jsonMember
    public MatchId: number;
    @jsonMember
    public Type: string;
    // TeamId and PlayerId can only be used for List filtering, not for query
    // string filtering because the qsps are not implemented in the back end
    @jsonMember
    public TeamId: number;
    @jsonMember
    public PlayerId: number;

    get qsp(): string {
        let qsp = "?";
        if (this.MatchId !== undefined) {
            qsp += "MatchId=" + String(this.MatchId) + "&";
        }
        if (this.Type !== undefined) {
            qsp += "Type=" + String(this.Type) + "&";
        }

        // strip last symbol whichi is either a "&" or a "?" if all members are
        // undefined
        qsp = qsp.slice(0, qsp.length - 1);

        return qsp;
    }

    public filterModel(matchEvent: MatchEvent): boolean {
        return Filter.compareUndefined(this.MatchEventId, matchEvent.MatchEventId) &&
            Filter.compareUndefined(this.MatchId, matchEvent.MatchId) &&
            Filter.compareUndefined(this.Type, matchEvent.Type) &&
            Filter.compareUndefined(this.PlayerId, matchEvent.PlayerId) &&
            Filter.compareUndefined(this.TeamId, matchEvent.TeamId);
    }

    public filterList(matchEvents: List<MatchEvent>): List<MatchEvent> {
        // need to convert to Array because Lsit does not have a 'filter' method
        let matchEventsArray: MatchEvent[] = Array.from(matchEvents);
        matchEventsArray = matchEventsArray.filter(
            (el) => this.filterModel(el)
        );

        return List.from(matchEventsArray);
    }
}
