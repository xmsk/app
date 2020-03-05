/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 01.03.2020 18:56

view for a page to display a list of gameDays in the app;
implement filter mechanisms to filter the gameDays and allow selecting a gameDay to
display detailed information
*/
import {
    Composite,
    Properties,
    TextView,
    Widget,
    WidgetTapEvent,
} from 'tabris';
import {
    Cell,
    component,
    List,
    ListView,
    property,
} from 'tabris-decorators';
import { GameDay } from '../../models/GameDay';
import * as fonts from '../../utils/fonts';
import { ModelListSettable } from '../ModelListSettable';
import { SubView } from '../SubView';
import { ScheduleView } from './ScheduleView';

@component
export class GameDaysView extends SubView implements ModelListSettable {

    @property public gameDays: List<GameDay> = new List<GameDay>();
    private gameDaysListView: ListView<GameDay>;
    private listFont: fonts.CustomFont = fonts.large;
    // private listHeadingFont: fonts.CustomFont = fonts.largeBold;

    constructor(properties: Properties<GameDaysView>) {
        super();

        // need to set properties before we reference them (e.g. the model)
        this.set(properties);

        this.append(
            <$>
                <TextView id='heading' stretchX top='prev()' height={fonts.largeBold.viewHeight} font={fonts.largeBold} alignment='left'>NFFL GameDays</TextView>
                {/* <Composite id='listHeaders' stretchX top='prev()' height={this.listHeadingFont.viewHeight}>
                        <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='GameDayName'/>
                        <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='HomeTown'/>
                        <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='League'/>
                </Composite> */}
                <ListView id='gameDaysList' stretchX bottom='next()' top='prev()' items={this.gameDays}>
                    <Cell highlightOnTouch onTap={
                        (ev) => {
                            console.log('click GameDay');
                            console.log(ev.target);
                            this.openMatches(ev);
                        }
                    }>
                        <TextView stretchX top='prev()' height={this.listFont.viewHeight} font={this.listFont} alignment='centerX' textColor='#212121' bind-text='item.Location'/>
                        <Composite stretchX top='prev()' height={2 * this.listFont.viewHeight}>
                            <TextView centerY left={0} right={{percent: 50}} height={this.listFont.viewHeight} font={this.listFont} alignment='right' textColor='#212121' bind-text='item.Date'/>
                            <TextView centerY left={{percent: 50}} right={0} height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.HostingTeam.TeamName'/>
                        </Composite>
                    </Cell>
                </ListView>
            </$>
        );
        // assign ListView for easier handling
        this.gameDaysListView = this._find(ListView).filter('#gameDaysList').only();
    }

    public setModelList(list: List<GameDay>): void {
        console.debug("detting gameDays");
        this.gameDays = list;
        // have to update ListView items because assignment destroys the object?
        this.gameDaysListView.items = this.gameDays;
    }

    private openMatches(ev: WidgetTapEvent<Widget>) {
        console.log("function open Matches");
        const gameDayIndex: number = this.gameDaysListView.itemIndex(ev.target);
        const gameDay: GameDay = this.gameDays[gameDayIndex];
        this.parent(ScheduleView).transitionGameDayToMatch(gameDay);
    }
}
