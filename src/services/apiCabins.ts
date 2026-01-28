import supabase from "./superbase";
export async function getCabins() {
    const {data,error}=await supabase.from('cabins').select('*')
    if(error) throw new Error(error.message)
    return data
}