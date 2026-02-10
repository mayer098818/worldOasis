import { menuConfig } from "./generateRoute"
export const renderMenuTree = (tree) => {
    return tree.map((menu: any) => {
        const config = menuConfig.find(config => config.name === menu.name)
        if (!config || config?.hidden) return null
        return {
            id: menu.id,
            name: config.name,
            path: config.path,
            icon: config.icon,
            label: config.label,
            children: menu.children ? renderMenuTree(menu.children) : undefined
        }
    }).filter(Boolean)
}