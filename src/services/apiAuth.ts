import supabase, { supabaseUrl } from "./superbase"
export async function Login({ email, password }: { email: string, password: string }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) {
        throw new Error(error.message);
    }
    return data
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

// 根据用户 id 获取其角色信息
export async function getUserRole(userId: string) {
    // 1. 先从 users 表中获取用户的 role_id
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("role_id")
        .eq("id", userId)
        .single();

    if (userError) throw new Error(userError.message);

    const roleId = user?.role_id;
    if (!roleId) return null;

    // 2. 再根据 role_id 从 roles 表中获取角色详情
    const { data: role, error: roleError } = await supabase
        .from("roles")
        .select("*")
        .eq("id", roleId)
        .single();

    if (roleError) throw new Error(roleError.message);

    return role;
}

export async function getAllUsers() {
    const { data, error } = await supabase
        .from("users")
        .select("*");
    if (error) throw new Error(error.message);
    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function signup({ fullName, email, password }: { fullName: string, email: string, password: string }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });
    console.log(data, 'signup data')
    if (error) throw new Error(error.message);
    return data;
}

export async function userUpadate({ fullName, avatarFile, password }: { fullName?: string, avatarFile?: File, password?: string }) {
    //1 Update password OR fullName to user
    let updateData;
    if (fullName) { updateData = { fullName } }
    if (password) { updateData = { password } }
    const { error: userError } = await supabase.auth.updateUser({
        data: updateData,
    });
    if (userError) throw new Error(userError.message);
    // 2.update avatar to storage
    if (!avatarFile) return
    const ext = avatarFile.name.split('.').pop();

    const fileName = `avatar-${Date.now()}.${ext}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatarFile);
    if (storageError) throw new Error(storageError.message);
    // 3.update avatar into user
    const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`

    const { data: updateUser, error: updateError } = await supabase.auth.updateUser({
        data: {
            avatar: avatarUrl,
        },
    });
    if (updateError) throw new Error(updateError.message);
    return updateUser;
}