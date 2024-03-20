import { MeFollowed } from "./follow";
import { MeLiked } from "./product";

export interface Market{
    _id:string;
    mb_nick:string;
    mb_phone:string;
    mb_password:string;
    mb_type:string;
    mb_status:string;
    mb_image:string;
    mb_point:number;
    mb_top:string;
    mb_views:number;
    mb_likes:number;
    mb_follow_cnt:number;
    mb_subscriber_cnt:number;
    createdAt:Date;
    me_liked:MeLiked[]; // me liked 
}

export interface Member{
    _id:string;
    mb_nick:string;
    mb_phone:string;
    mb_password:string;
    mb_type:string;
    mb_status:string;
    mb_image:string;
    mb_point:number;
    mb_top:string;
    mb_views:number;
    mb_likes:number;
    mb_follow_cnt:number;
    mb_subscriber_cnt:number;
    createdAt:Date;
    me_liked:MeLiked[]; // me liked 
    me_followed:MeFollowed[];
}

