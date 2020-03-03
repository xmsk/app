/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 01.03.2020 18:56

view for a page to display a list of teams in the app;
implement filter mechanisms to filter the teams and allow selecting a team to
display detailed information
*/
import {
  Action,
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
  List,
  ListView,
  property,
} from 'tabris-decorators';
import { Team } from '../models/Team';
import { TeamStats } from '../models/TeamStats';
import * as fonts from '../utils/fonts';
import { ModelListSettable } from './ModelListSettable';
import {TeamView} from './TeamView';

@component
export class TeamsView extends Page implements ModelListSettable {

  @property public teams: List<Team> = new List<Team>();
  private _teamsListView: ListView<Team>;
  private listFont: fonts.CustomFont = fonts.large;
  private listHeadingFont: fonts.CustomFont = fonts.largeBold;

  constructor(properties: Properties<TeamsView>) {
    super();

    // need to set properties before we reference them (e.g. the model)
    this.set(properties);

    this.append(
      <$>
        <TextView id='heading' stretchX top='prev()' height={fonts.largeBold.viewHeight} font={fonts.largeBold} alignment='left'>NFFL Teams</TextView>
        <Composite id='listHeaders' stretchX top='prev()' height={this.listHeadingFont.viewHeight}>
            <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='TeamName'/>
            <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='HomeTown'/>
            <TextView centerY left='prev()' right='next()' height={this.listHeadingFont.viewHeight} font={this.listHeadingFont} alignment='left' textColor='#212121' text='League'/>
        </Composite>
        <ListView id='teamsList' stretchX bottom='next()' top='prev()' items={this.teams}>
          <Cell highlightOnTouch onTap={
            (ev) => {
              console.log('click Team');
              console.log(ev.target);
              this._openTeamPopover(ev);
            }
          }>
            <TextView centerY left='prev()' right='next()' height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.TeamName'/>
            <TextView centerY left='prev()' right='next()' height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.HomeTown'/>
            <TextView centerY left='prev()' right='next()' height={this.listFont.viewHeight} font={this.listFont} alignment='left' textColor='#212121' bind-text='item.League.LeagueName'/>
          </Cell>
        </ListView>
      </$>
    );
    // assign ListView for easier handling
    this._teamsListView = this._find(ListView).filter('#teamsList').only();
  }

  public setModelList(list: List<Team>): void {
    this.teams = list;
    // have to update ListView items because assignment destroys the object?
    this._teamsListView.items = this.teams;
  }

  public refreshteams() {
    Team.listFactory.constructToView("", this, Team);
  }

  private _openTeamPopover(ev: WidgetTapEvent<Widget>) {
    console.log("function open Team popover");
    const teamIndex: number = this._teamsListView.itemIndex(ev.target);
    const team: Team = this.teams[teamIndex];
    const teamView: TeamView = <TeamView stretch/>;
    Team.factory.constructToView(team, teamView, Team);
    TeamStats.factory.constructToView(team.TeamId, teamView, TeamStats);
    const popover = Popover.open(
      <Popover>
        <NavigationView stretch>
          <Action placement='navigation' title='Close' onSelect={() => popover.close()}/>
          <Page title={team.Identification}/>
        </NavigationView>
      </Popover>
    );
    let page = popover.contentView.find(Page).only();
    teamView.appendTo(page);
  }
}
