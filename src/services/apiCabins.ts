import supabase, { supabaseUrl } from "./superbase";
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
  return data
}

export async function createEditCabin(newCabin: any, id: any) {
  // 判断 image 是 URL 字符串还是 File 对象
  const isImageUrl = typeof newCabin.image === 'string';

  let imagePath = newCabin.image; // 默认使用原值
  let imageName: string | null = null;

  // 如果是 File 对象，需要上传
  if (!isImageUrl && newCabin.image) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. Create/edit cabin
  // 移除 id 字段，避免创建时出现 duplicate key 错误
  const { id: _ignoreId, ...cabinData } = newCabin;
  const cabinToSave = { ...cabinData, image: imagePath };

  // A) CREATE
  if (!id) {
    const { data, error } = await supabase.from("cabins").insert([cabinToSave]).select().single();
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created");
    }
    // 如果有新文件需要上传
    if (imageName) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);
      if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded and the cabin was not created");
      }
    }
    return data;
  }

  // B) EDIT
  const { data, error } = await supabase.from("cabins").update(cabinToSave).eq("id", id).select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  // 如果有新文件需要上传（编辑时上传新图片）
  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);
    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }

  return data;
}
