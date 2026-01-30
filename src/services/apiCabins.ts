import supabase, { supabaseUrl } from "./superbase.ts";
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')
  if (error) throw new Error(error.message)
  return data
}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
  console.log(data, 'data')
  return data
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // https://lfvrvjnnobpkhjbgprup.supabase.co/storage/v1/object/public/cabin-images/0.3044176254811811-cabin-005.jpg
  // "https://lfvrvjnnobpkhjbgprup.supabase.co/storage/v1/object/public/cabin-images/0.5835239360702766-cabin-007.jpg"
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
console.log(imagePath,id,'imagePath')
  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

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

  return data;
}
