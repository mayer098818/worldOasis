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
    const { data: userData, error: userError } = await supabase.auth.updateUser({
        data: updateData,
    });
    if (userError) throw new Error(userError.message);
    // 2.update avatar to storage
    if (!avatarFile) return
    const ext = avatarFile.name.split('.').pop();

    const fileName = `avatar-${Date.now()}.${ext}`;
    // const fileName = `avatar-${userData.user.id}-${Math.random()}`;

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