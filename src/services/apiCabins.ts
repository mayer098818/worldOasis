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

export async function createNewCabin(newCabin:any) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
    );
    console.log(newCabin,'newCabin')
    // https://lfvrvjnnobpkhjbgprup.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const supabaseUrl='https://lfvrvjnnobpkhjbgprup.supabase.co'
     const imagePath = 
   `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { data, error } = await supabase
    .from('cabins')
    .insert([
        { ...newCabin, image: imagePath }
    ])
  .select()
    if (error) throw new Error(error.message)
    
    // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
     // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
    return data
}
