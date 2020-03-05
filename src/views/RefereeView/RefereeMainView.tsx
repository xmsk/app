/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 05.01.2020 10:40

Composite representing the main view in the Referee Page, it is used to keep
track of and manage MatchEvents for the given Match
*/
import {
    Action,
    ActivityIndicator,
    AlertDialog,
    Button,
    Composite,
    NavigationView,
    Page,
    Popover,
    Properties,
    TextView,
    Widget,
    WidgetTapEvent,
} from 'tabris';
import {
    Cell,
    component,
    ItemPicker,
    List,
    ListView,
    property,
} from 'tabris-decorators';
import { TypedJSON } from 'typedjson';
import { MatchEventFilter } from '../../models/filters/MatchEventFilter';
import { PlayerFilter } from '../../models/filters/PlayerFilter';
import { Match } from '../../models/Match';
import {
    MatchEvent,
    MatchEventType,
    typeToScore
} from '../../models/MatchEvent';
import { Model } from '../../models/Model';
import { ModelListFactory } from '../../models/ModelListFactory';
import { Player } from '../../models/Player';
import { Team } from '../../models/Team';
import * as fonts from '../../utils/fonts';
import {
    rest,
    restHostname,
} from '../../utils/rest';
import { ModelListSettable } from '../ModelListSettable';
import { ModelSettable } from '../ModelSettable';
import { SubView } from "../SubView";
import { RefereeView } from './RefereeView';

/**
 * team specific data that is need for each team
 */
class TeamDataModel {
    @property public matchEvents: List<MatchEvent> = new List();
    public players: List<Player> = new List();
    @property public score: number = 0;

    public updateScore(): void {
        let score: number = 0;
        for (const me of this.matchEvents) {
            score += me.Score;
        }
        this.score = score;
    }
}

/**
 * complete object for storing the team specific data in the view
 */
class DataModel {
    public home: TeamDataModel = new TeamDataModel();
    public away: TeamDataModel = new TeamDataModel();

    /**
     * return the TeamDataModel corresponding to the passed parameter
     *
     * @param team string indicating which TeamDataModel should be returnes
     */
    public get(team: string): TeamDataModel {
        if (team === 'home') {
            return this.home;
        } else if (team === 'away') {
            return this.away;
        } else {
            throw new Error("Unknown request for get method: " + team);
        }
    }

    /**
     * update changing properties on the DataModel; register all things that can
     * change - somehow Change Lsiteners don't work on Lists and Arrays
     */
    public update(): void {
        this.home.updateScore();
        this.away.updateScore();
    }
}

// @component invalidates public find(), apply(), children() methods, have to
// use protected ones with _ prefix
@component
export class RefereeMainView extends SubView implements ModelSettable, ModelListSettable {

    // make public property so it can be set via JSX
    @property public matchOTP: string;

    @property private match: Match;
    // smarter way to access the home and away data? possibly need more classes
    // -> access via this.data[class]
    @property private dataModel: DataModel = new DataModel();

    private font: fonts.CustomFont = fonts.large;

    private matchEventListFactory: ModelListFactory<MatchEvent>;

    constructor(properties: Properties<RefereeMainView>) {
        super(properties);
        // this.set(properties);

        console.debug("generating RefereMainView");
        console.debug(this.matchOTP);

        this.append(
            <$>
                <ActivityIndicator id='activity' class='waitMode' visible={false} center/>
                <Composite id='initPage' class='notWaitMode' stretchX top={0} bottom={{percent: 75}}>
                    <Composite class='home' stretchY left={0} right={{percent: 50}}>
                        <TextView class='home' id='homeTeam' centerY stretchX height={fonts.large.viewHeight} font={fonts.large} alignment='centerX' bind-text='match.HomeTeam.TeamName'/>
                        <TextView class='home' id='homeTeamScore' top='prev() 8' stretchX height={fonts.large.viewHeight} font={fonts.large} alignment='centerX' bind-text='dataModel.home.score'/>
                    </Composite>
                    <Composite class='away' stretchY left={{percent: 50}} right={0}>
                        <TextView class='away' id='awayTeam' centerY stretchX height={fonts.large.viewHeight} font={fonts.large} alignment='centerX' bind-text='match.AwayTeam.TeamName'/>
                        <TextView class='away' id='awayTeamScore' top='prev() 8' stretchX height={fonts.large.viewHeight} font={fonts.large} alignment='centerX' bind-text='dataModel.away.score'/>
                    </Composite>
                </Composite>
                <Composite class='notWaitMode' stretchX top='prev()' bottom={{percent: 25}}>
                    <Composite stretchY left={{percent: 1}} right={{percent: 51}}>
                        <ListView id='homeMatchEvents' class='home' stretchX top='prev()' bottom='next()' items={this.dataModel.home.matchEvents}>
                            <Cell class='home' highlightOnTouch stretch height={this.font.viewHeight + 5}>
                                <TextView centerY left={0} width={35} height={this.font.viewHeight} alignment='left' font={this.font} textColor='#212121' bind-text='item.Player.JerseyNumber'/>
                                <TextView centerY left='prev()' right='next()' height={this.font.viewHeight} alignment='left' font={this.font} textColor='#212121' bind-text='item.Type' background='#ffffff'/>
                                <TextView class='home' centerY right='next()' height={this.font.viewHeight} width={this.font.viewHeight} font={this.font} onTap={
                                    (ev) => this.deleteMatchEvent(ev)
                                }>{'\u2716'}</TextView>
                            </Cell>
                        </ListView>
                        <Button class='home' stretchX height={this.font.buttonHeight} font={this.font} bottom='next()' onTap={
                            (ev) => this.openAddMatchEventPopover(ev)
                        }>Add</Button>
                    </Composite>
                    <Composite stretchY left={{percent: 51}} right={{percent: 1}}>
                        <ListView id='awayMatchEvents' class='away' stretchX top='prev()' bottom='next()' items={this.dataModel.away.matchEvents}>
                            <Cell class='away' highlightOnTouch stretch height={this.font.viewHeight + 5}>
                                <TextView centerY left={0} width={35} height={this.font.viewHeight} alignment='left' font={this.font} textColor='#212121' bind-text='item.Player.JerseyNumber'/>
                                <TextView centerY left='prev()' right='next()' height={this.font.viewHeight} alignment='left' font={this.font} textColor='#212121' bind-text='item.Type' background='#ffffff'/>
                                <TextView class='away' centerY right='next()' height={this.font.viewHeight} width={this.font.viewHeight} font={this.font} onTap={
                                    (ev) => this.deleteMatchEvent(ev)
                                }>{'\u2716'}</TextView>
                            </Cell>
                        </ListView>
                        <Button class='away' stretchX height={this.font.buttonHeight} font={this.font} bottom='next()' onTap={
                            (ev) => this.openAddMatchEventPopover(ev)
                        }>Add</Button>
                    </Composite>
                </Composite>
                <Composite class='notWaitMode' stretchX top='prev()' bottom={0}>
                    <Button bottom={{percent: 5}} right={{percent: 5}} height={this.font.buttonHeight} font={this.font} onSelect={
                        () => this.finish()
                    }>Finish</Button>
                </Composite>
            </$>
        );
    }

    public setModel(model: Model): void {
        if ( model instanceof Match) {
            this.match = model;
            // initialize local Player Lists
            let homeTeamFilter = PlayerFilter.construct({
                TeamId: this.match.HomeTeam.TeamId
            });
            let awayTeamFilter = PlayerFilter.construct({
                TeamId: this.match.AwayTeam.TeamId
            });
            Player.listFactory.constructToView(
                homeTeamFilter.qsp,
                this,
                Player
            );
            Player.listFactory.constructToView(
                awayTeamFilter.qsp,
                this,
                Player
            );
            // initialize local MatchEvent factory and MatchEvents
            this.matchEventListFactory = MatchEvent.constructMatchEventFactory(
                this.match.MatchId
            );
            let matchEventFilter = MatchEventFilter.construct(
                {MatchId: this.match.MatchId}
            );
            this.matchEventListFactory.constructToView(
                matchEventFilter.qsp,
                this,
                MatchEvent
            );
        }
    }

    public setModelList(list: List<Model>): void {
        if (list.length === 0) {
            return;
        }

        // do better list type check List<??>
        if (list[0] instanceof Player) {
            // team filters
            let homeTeamFilter = PlayerFilter.construct({
                TeamId: this.match.HomeTeam.TeamId
            });
            let awayTeamFilter = PlayerFilter.construct({
                TeamId: this.match.AwayTeam.TeamId
            });
            let tempHomeTeams: List<Player> = homeTeamFilter.filterList(list as List<Player>);
            let tempAwayTeams: List<Player> = awayTeamFilter.filterList(list as List<Player>);

            // push newly added HomeTeam Players
            tempHomeTeams.forEach(
                (player) => {
                    if (!player.isInList(this.dataModel.home.players)) {
                        this.dataModel.home.players.push(player);
                    }
                }
            );
            // push newly added AwayTeam Players
            tempAwayTeams.forEach(
                (player) => {
                    if (!player.isInList(this.dataModel.away.players)) {
                        this.dataModel.away.players.push(player);
                    }
                }
            );
        } else if (list[0] instanceof MatchEvent) {
            // team filters
            let homeTeamFilter = MatchEventFilter.construct({
                TeamId: this.match.HomeTeam.TeamId
            });
            let awayTeamFilter = MatchEventFilter.construct({
                TeamId: this.match.AwayTeam.TeamId
            });
            // create new List to be assigned to local dataModel and ListViews
            let tempHomeMatchEvents: List<MatchEvent> = homeTeamFilter.filterList(list as List<MatchEvent>);
            let tempAwayMatchEvents: List<MatchEvent> = awayTeamFilter.filterList(list as List<MatchEvent>);

            // merge existing Lists with new Lists
            this.dataModel.home.matchEvents.forEach(
                (me) => {
                    if (!me.isInList(tempHomeMatchEvents)) {
                        tempHomeMatchEvents.push(me);
                    }
                }
            );
            this.dataModel.away.matchEvents.forEach(
                (me) => {
                    if (!me.isInList(tempAwayMatchEvents)) {
                        tempAwayMatchEvents.push(me);
                    }
                }
            );

            // reset ListView items because of the ghost cells
            this.dataModel.home.matchEvents = tempHomeMatchEvents;
            this.dataModel.away.matchEvents = tempAwayMatchEvents;
            this._find(ListView).filter('#homeMatchEvents').only().items = this.dataModel.home.matchEvents;
            this._find(ListView).filter('#awayMatchEvents').only().items = this.dataModel.away.matchEvents;

            // update views fields to reflect changes
            this.dataModel.update();
        }
    }

    private openAddMatchEventPopover(event: WidgetTapEvent): void {
        let teamClass: string = event.target.class;
        let players: List<Player> = this.dataModel.get(teamClass).players;

        // open selection popover
        const popover = Popover.open(
            <Popover>
              <NavigationView stretch>
                <Action placement='navigation' title='Close' onSelect={() => popover.close()}/>
                <Page title='Add Event'>
                    <ItemPicker id='type' stretchX centerY height={this.font.pickerHeight} font={this.font} items={MatchEventType}/>
                    <ItemPicker id='player' stretchX top='prev() 8' height={this.font.pickerHeight} font={this.font} items={players} textSource='Identification'/>
                    <Button id='addMatchEvent' stretchX top='prev() 8' height={this.font.buttonHeight} font={this.font} onTap={
                        (ev) => {
                            this.addMatchEvent(ev.target.parent(), teamClass);
                            popover.close();
                        }
                    }>Add</Button>
                </Page>
              </NavigationView>
            </Popover>
        );
    }

    private addMatchEvent(composite: Composite<Widget>, teamClass: string): void {
        let team: Team;
        if (teamClass === 'home') {
            team = this.match.HomeTeam;
        } else if (teamClass === 'away') {
            team = this.match.AwayTeam;
        } else {
            throw new Error("Team class matches neither 'home' nor 'away'.");
        }

        // create POST body
        let type: string = composite.find(ItemPicker).filter('#type').only().selection as string;
        let score: number = typeToScore(type);
        let player: Player = composite.find(ItemPicker).filter('#player').only().selection as Player;
        // if (player.PlayerId !== undefined) {
        //     body.Player = {
        //         PlayerId: player.PlayerId
        //     };
        // }
        // TODO figure out a method to select an "other" Player and how to pass
        // this to the REST backend
        let body: object = {
            TeamId: team.TeamId,
            Type: type,
            Score: Number(score),
            Player: {
                PlayerId: player.PlayerId
            }
        };

        // REST call to add MatchEvent
        this.toggleWaitMode();
        let url: string = restHostname + "/match/" + String(this.match.MatchId) + "/matchEvent/";
        let headers: Headers = new Headers({
            'nffl-match-auth': this.matchOTP,
            'Content-Type': 'application/json'
        });
        rest(
            'POST',
            url,
            body,
            headers,
            (j) => {
                this.toggleWaitMode();
                // add new MatchEvent to the appropriate List
                let serializer = new TypedJSON(MatchEvent);
                let matchEvents: List<MatchEvent> = this.dataModel.get(teamClass).matchEvents;
                matchEvents.push(serializer.parse(j));
                this.dataModel.update();
            },
            () => this.toggleWaitMode(),
            () => this.toggleWaitMode()
        );

        return;
    }

    private deleteMatchEvent(event: WidgetTapEvent): void {
        let cell = event.target.parent();
        let meIndex: number = 0;
        if (cell instanceof Cell) {
            meIndex = cell.itemIndex;
        } else {
            throw new Error("event target was not the child of a Cell");
        }
        let meList: List<MatchEvent> = this.dataModel.get(event.target.class).matchEvents;

        // REST call for deletion
        this.toggleWaitMode();
        let url: string = restHostname + "/match/" + String(this.match.MatchId) + "/matchEvent/" + String(meList[meIndex].MatchEventId) + "/";
        let headers: Headers = new Headers({
            'nffl-match-auth': this.matchOTP
        });
        rest(
            'DELETE',
            url,
            undefined,
            headers,
            () => {
                this.toggleWaitMode();
                // pop matchEvent from the list
                meList.splice(meIndex, 1);
                this.dataModel.update();
            },
            () => this.toggleWaitMode(),
            () => this.toggleWaitMode()
        );

        return;
    }

    private finish(): void {
        // submit game to set status to "finished"
        let alert: AlertDialog = new AlertDialog();

        // send submit request
        // this.toggleWaitMode();
        // let url: string = restHostname + "/match/" + String(this.match.MatchId) + "/confirm/";
        // let headers: Headers = new Headers({
        //     'nffl-match-auth': this.matchOTP
        // });
        // rest(
        //     'POST',
        //     url,
        //     undefined,
        //     headers,
        //     () => {
        //         this.toggleWaitMode();
        //         // open success popup
        //         alert = new AlertDialog({
        //             title: 'Finished',
        //             message: 'The game has sucessfully been officiated!',
        //             buttons: {
        //                 ok: 'restart',
        //                 cancel: 'close'
        //             }
        //         });
        //         alert.onCloseOk(
        //             () => this.parent(RefereeView).startOver()
        //         );
        //         alert.open();
        //     },
        //     () => this.toggleWaitMode(),
        //     () => this.toggleWaitMode()
        // );

        alert = new AlertDialog({
            title: 'Finished',
            message: 'The game has sucessfully been officiated!',
            buttons: {
                ok: 'restart',
                cancel: 'close'
            }
        });
        alert.onCloseOk(
            () => this.parent(RefereeView).startOver()
        );
        alert.open();
    }
}
