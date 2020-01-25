/*
Author: Max Kessler <max.e.kessler@gmail.com>
Date: 22.01.2020 18:15

implement the player object as used in the application
REST requests that return player objects are mapped to this class
*/

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
    public PlayerId: number;
    @jsonMember
    public FirstName: string;
    @jsonMember
    public LastName: string;
    @jsonMember
    public Team: Team;
    @jsonMember
    public JerseyNumber: number;
    @jsonMember
    public Position: string;
    @jsonMember
    public RefereeCertificateion: string;

    // Model fields
    protected restEndpoint: string = "/player/";
}
