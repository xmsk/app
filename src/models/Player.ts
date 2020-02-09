/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the player object as used in the application
REST requests that return player objects are mapped to this class
*/

import { property } from 'tabris-decorators';
import {
    jsonMember,
    jsonObject
} from 'typedjson';
import { Model } from './Model';
import { ModelFactory } from './ModelFactory';
import { ModelListFactory } from './ModelListFactory';
import { Team } from './Team';

@jsonObject
export class Player extends Model {
    public static factory: ModelFactory<Player> = new ModelFactory("/player/");
    public static listFactory: ModelListFactory<Player> =
        new ModelListFactory("/player/");
    // Player fields
    @property
    @jsonMember
    public PlayerId: number;
    @property
    @jsonMember
    public FirstName: string;
    @property
    @jsonMember
    public LastName: string;
    @property
    @jsonMember
    public Team: Team;
    @property
    @jsonMember
    public JerseyNumber: number;
    @property
    @jsonMember
    public Position: string;
    @property
    @jsonMember
    public RefereeCertificateion: string;
}
