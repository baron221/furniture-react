import { MeLiked } from "./product";
import { Member } from "./user";

export interface Community{
    _id:string;
    art_subject:string;
    art_image?:string | null;
    art_content: string;
    bo_id:string;
    art_status: string;
    art_likes: number;
    art_views: number;
    mb_id: string;
    createdAt:Date;
    updatedAt:Date;
    member_data:Member;
    me_liked:MeLiked[];  

}

export interface SearchArticlesObj {
    page: number;
    limit:number;
    bo_id:string;
    order?:number | null;


}