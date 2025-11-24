'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { Suspense } from "react";

export const createCompanion = async (formData: CreateCompanion) => {
    // Get Clerk user id from auth and supabase
    const {userId: author} = await auth();
    const supabase = createSupabaseClient();

    // insert into companions table
    const {data , error} = await supabase.from("companions").insert({...formData , author}).select();
    // check if error happen throw error message
    if(error || !data) throw new Error(error?.message || "Failed To Create Companion");
    // if there is no error return data
    return data[0];
}

export const getAllCompanions = async ({limit = 10 , page = 1 , subject , topic} : GetAllCompanions) => {
    const supabse = createSupabaseClient();
    
    // make query to filter companions based on subject or topic
    let query = supabse.from("companions").select();

    if(subject && query){
        query = query.ilike("subject" , `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    else if(subject){
        query = query.ilike("subject" , `%${subject}%`)
    }
    else if(topic){
        query = query.ilike("topic" , `%${topic}%`)
    }

    // add pagination
    // 0 * 10 = 0 => 1 * 10 - 1 = 9 => 0 => 9
    query = query.range((page - 1) * limit , page * limit - 1);

    const {data: companions , error} = await query;
    if(error) throw new Error(error?.message || "Failed To Fetch Companions");
    return companions;
}

export const getCompanion = async (id: string) => {
    const supabse = createSupabaseClient();

    const {data ,  error} = await supabse.from("companions").select("*").eq("id" , id).single();
    if(error) throw new Error(error?.message || "Failed To Fetch Companion");
    return data;
}

export const addToSessionHistory = async (companionId: string) => {
    const {userId} = await auth();
    const supabase = createSupabaseClient();

    const {data , error} = await supabase.from("session_history").insert({
        companion_id: companionId,
        user_id: userId
    })
    if(error) throw new Error(error?.message || "Failed To Add To Session History");
    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();

    const {data , error} = await supabase.from("session_history").select(`companions: companion_id (*)`).order("created_at" , {ascending: false}).limit(limit);
    if(error) throw new Error(error?.message || "Failed To Fetch Recent Sessions");
    return data.map(({companions}) => companions);
}

export const getUserSessions = async (userId: string , limit = 10) => {
    const supabase = createSupabaseClient();

    const {data , error} = await supabase.from("session_history").select(`companions: companion_id (*)`).eq("user_id" , userId).order("created_at" , {ascending: false}).limit(limit);
    if(error) throw new Error(error?.message || "Failed To Fetch User Sessions");
    return data.map(({companions}) => companions);
}

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();

    const {data , error} = await supabase.from("companions").select().eq("author" , userId);
    if(error) throw new Error(error?.message || "Failed To Fetch User Companions");
    return data;
}

export const newCompanionPermisions = async () => {
    const {userId , has} = await auth();
    const supabase = createSupabaseClient();

    let limit = 0

    if(has({plan: 'pro_companion'})){
        return true;
    } else if(has({feature: "10_active_companions"})){
        limit = 10;
    } else if(has({feature: "3_active_companions"})){
        limit = 3;
    }

    const {data , error} = await supabase.from("companions").select('id' , {count: 'exact'}).eq("author" , userId);
    if(error) throw new Error(error?.message || "Failed To Fetch User Companions");
    const companionCount = data?.length || 0;

    if(companionCount >= limit) return false;
    return true;
}