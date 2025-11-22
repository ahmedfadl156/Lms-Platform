'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

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