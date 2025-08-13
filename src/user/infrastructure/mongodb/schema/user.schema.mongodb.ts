import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Types} from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserMongoose>;

/********************** 
 * User Entity Fields *
 **********************
 *
 *      public projectKey: string,
 *      public name: string,
 *      public email: string,
 *      public scopes: string[],
 *      public active: boolean = true,
 *      public id?: ID, 
 *      public password?: string,
 *      public createdAt?: Date,
 *      public updatedAt?: Date
 * 
 * 
 **/


@Schema({timestamps: true})
export class UserMongoose {
    @Prop({required: true, type: String})
    name: string;

    @Prop({required: true, type: String})
    projectKey: string;

    @Prop({required: true, type: String})
    email: string;

    @Prop({type: [String], required: true})
    scopes: string[]

    @Prop({type: Boolean, required: true, default: true})
    active: boolean

    @Prop({required: false})
    password?: string


    createdAt?: Date;
    updatedAt?: Date;
}



const UserSchema = SchemaFactory.createForClass(UserMongoose);

UserSchema.index({ email: 1, projectKey: 1 }, { unique: true });

export {UserSchema};