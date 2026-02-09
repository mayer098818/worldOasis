import {getCurrentUser} from "../services/apiAuth.ts";
import {redirect} from "react-router-dom";

const authLoader =async ()=>{
    // export async function getCurrentUser() {
    //     const { data: session } = await supabase.auth.getSession();
    //     if (!session.session) return null;
    //
    //     const { data, error } = await supabase.auth.getUser();
    //
    //     if (error) throw new Error(error.message);
    //     return data?.user;
    // }
const user =await getCurrentUser()
    if(!user){
        return redirect('/login')
    }
    return user
}
export default authLoader;