/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 01.03.2020 18:56

View to list matches including results in a schedule
*/
import {
    Button,
    Composite,
    Properties,
    TextView,
} from 'tabris';
import {
    Cell,
    component,
    List,
    ListView,
    property,
} from 'tabris-decorators';
import { Match } from '../../models/Match';
import * as fonts from '../../utils/fonts';
import { ModelListSettable } from '../ModelListSettable';
import { SubView } from '../SubView';
import { ScheduleView } from './ScheduleView';

@component
export class MatchesView extends SubView implements ModelListSettable {

    @property public matches: List<Match> = new List<Match>();
    private matchesListView: ListView<Match>;
    private listFont: fonts.CustomFont = fonts.large;
    // private listHeadingFont: fonts.CustomFont = fonts.largeBold;

    constructor(properties: Properties<MatchesView>) {
        super();

        // need to set properties before we reference them (e.g. the model)
        this.set(properties);

        this.append(
            <$>
                <TextView id='heading' stretchX top='prev()' height={fonts.largeBold.viewHeight} font={fonts.largeBold} alignment='left'>Matches</TextView>
                {/* <Composite id='listHeaders' stretchX top='prev()' height={this.listHeadingFont.viewHeight}>
                        <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='TeamName'/>
                        <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='HomeTown'/>
                        <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='League'/>
                </Composite> */}
                <ListView id='matchesList' stretchX bottom='next()' top='prev()' items={this.matches}>
                    <Cell>
                        <Composite id='homeTeamComposite' stretchX top={0} height={this.listFont.viewHeight}>
                            <TextView left={{percent: 5}} right={{percent: 10}} height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.HomeTeam.TeamName'/>
                            <TextView left={{percent: 90}} right={{percent: 5}} height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.Score.HomeScore'/>
                        </Composite>
                        <Composite id='awayTeamComposite' stretchX top='prev()' height={this.listFont.viewHeight}>
                            <TextView left={{percent: 5}} right={{percent: 10}} height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.AwayTeam.TeamName'/>
                            <TextView left={{percent: 90}} right={{percent: 5}} height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.Score.AwayScore'/>
                        </Composite>
                        <Composite id='refTeamComposite' stretchX top='prev()' height={this.listFont.viewHeight}>
                            <TextView left={{percent: 5}} width={100} height={this.listFont.viewHeight} font={this.listFont} alignment='left'>Referee:</TextView>
                            <TextView left='prev()' right={0} height={this.listFont.viewHeight} font={this.listFont} alignment='left' bind-text='item.RefereeTeam.TeamName'/>
                        </Composite>
                        <Composite stretchX top='prev()' height={this.listFont.viewHeight}/>
                    </Cell>
                </ListView>
                <Button stretchX bottom={0} height={this.listFont.buttonHeight} font={this.listFont} onTap={
                    () => this.parent(ScheduleView).startOver()
                }>Gamedays</Button>
            </$>
        );
        // assign ListView for easier handling
        this.matchesListView = this._find(ListView).filter('#matchesList').only();
    }

    public setModelList(list: List<Match>): void {
        console.log("list", list.length);
        this.matches = list;
        // have to update ListView items because assignment destroys the object?
        this.matchesListView.items = this.matches;
    }

}
