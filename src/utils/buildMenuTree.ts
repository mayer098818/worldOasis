type MenuItem = {
    id: number;
    name: string;
    path: string;
    parentId?: number | null;
    children?: MenuItem[];
};

export function buildMenuTree(flatMenus: MenuItem[]) {
    const map = new Map<number, MenuItem>();
    const tree: MenuItem[] = [];

    // 先把所有节点放进 map
    flatMenus.forEach(menu => {
        map.set(menu.id, { ...menu, children: [] });
    });


    // 再建立父子关系
    flatMenus.forEach(menu => {
        const node = map.get(menu.id)!;

        if (menu.parentId === null || menu.parentId === undefined) {
            tree.push(node);
        } else {
            const parent = map.get(menu.parentId);
            if (parent) {
                parent.children!.push(node);
            }
        }
    });

    return tree;
}
