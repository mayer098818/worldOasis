import supabase from "./superbase"

export async function getUserMenus(userId: string) {
    // 1. 获取用户角色 ID
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("role_id")
        .eq("id", userId)
        .single();

    if (userError) {
        throw new Error(userError.message);
    }

    const roleId = user?.role_id;
    if (!roleId) return [];

    // 2. 根据角色 ID 获取可访问的菜单 ID 列表
    const { data: roleMenus, error: roleMenusError } = await supabase
        .from("role_menus")
        .select("menu_id")
        .eq("role_id", roleId);

    if (roleMenusError) {
        throw new Error(roleMenusError.message);
    }

    const menuIds = roleMenus?.map((rm) => rm.menu_id) ?? [];
    if (menuIds.length === 0) return [];

    // 3. 根据菜单 ID 列表查询菜单详情
    const { data: menus, error: menusError } = await supabase
        .from("menus")
        .select(`
      id,
      name,
      label,
      path
    `)
        .in("id", menuIds);

    if (menusError) {
        throw new Error(menusError.message);
    }

    return menus; // 返回可访问菜单数组
}
