/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

Page used for browsing the schedule and the results
*/
import {
    Page,
    Properties,
  } from 'tabris';
import { MatchFilter } from '../../models/filters/MatchFilter';
import { GameDay } from '../../models/GameDay';
import { Match } from '../../models/Match';
import { SubView } from '../SubView';
import { Waitable } from '../Waitable';
import { GameDaysView } from './GameDaysView';
import { MatchesView } from './MatchesView';

export class ScheduleView extends Page implements Waitable {

    /** the current Composite that is appended to the ScheduleView */
    private currentComposite: SubView;

    constructor(properties: Properties<ScheduleView>) {
        super(properties);
        this.set(properties);
        console.log("schedule constructir");

        this.start();
    }

    public toggleWaitMode(state?: boolean): void {
        this.currentComposite.toggleWaitMode(state);
    }

    /**
     * transition from the GameDaysView to the specific MatchesView
     *
     * @param gameDay selected GameDay
     */
    public transitionGameDayToMatch(gameDay: GameDay): void {
        console.log("transitionGameDayToMatch");
        this.currentComposite.dispose();
        let matchesView: MatchesView = this.createMatchesView(gameDay);
        this.currentComposite = matchesView;
        this.append(this.currentComposite);
        console.log("finished MatchesView creation");
    }

    /**
     * restart with a native GameDaysView
     */
    public startOver(): void {
        this.currentComposite.dispose();
        this.start();
    }

    /**
     * create the RefereeInitView and append it to the ScheduleView
     */
    private start(): void {
        let gameDaysView: GameDaysView = <GameDaysView stretch/>;
        this.currentComposite = gameDaysView;
        gameDaysView.toggleWaitMode(true);
        GameDay.listFactory.constructToView("", gameDaysView, GameDay);
        this.append(
            this.currentComposite
        );
    }

    /**
     * create a MatchesView for the Matches of a given GameDay
     *
     * @param gameDay GameDay for which the MatchesView should be created
     */
    private createMatchesView(gameDay: GameDay): MatchesView {
        console.log("createMatchesView");
        let matchesView: MatchesView = <MatchesView stretch title={gameDay.Identification}/>;
        let matchFilter: MatchFilter = MatchFilter.construct({
            GameDayId: gameDay.GameDayId
        });
        matchesView.toggleWaitMode(true);
        Match.listFactory.constructToView(
            matchFilter.qsp,
            matchesView,
            Match
        );

        return matchesView;
    }
}
