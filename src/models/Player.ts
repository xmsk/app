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
import { Team } from './Team';

@jsonObject
export class Player extends Model {
    public static factory: ModelFactory<Player> = new ModelFactory("/player/");
    // Player fields
    @jsonMember
    @property
    public PlayerId: number;
    @jsonMember
    @property
    public FirstName: string;
    @jsonMember
    @property
    public LastName: string;
    @jsonMember
    @property
    public Team: Team;
    @jsonMember
    @property
    public JerseyNumber: number;
    @jsonMember
    @property
    public Position: string;
    @jsonMember
    @property
    public RefereeCertificateion: string;
}
