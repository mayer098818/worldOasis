import supabase from "./superbase";
export async function getCabins() {
    const {data,error}=await supabase.from('cabins').select('*')
    if(error) throw new Error(error.message)
    return data
}

export async function deleteCabin(id:string){
 const { data,error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if(error) throw new Error(error.message)
    console.log(data,'data')
    return data
}