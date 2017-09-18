import { JumpFm, Item } from 'jumpfm-api'

import * as path from 'path'

const icons = {}
const exts = require('./icons.json') as { [icon: string]: string[] }
Object.keys(exts).forEach(icon => {
    exts[icon].forEach(ext => icons[ext] = icon)
})

const getIcon = (item: Item) => {
    try {
        const icon = icons[path.extname(item.name).substr(1)]
        if (icon) return `file_type_${icon}.svg`

        return item.isDirectory()
            ? 'default_folder.svg'
            : 'default_file.svg'
    } catch (e) {
        console.log(e)
        return 'default_file.svg'
    }
}

export const load = (jumpFm: JumpFm) => {
    jumpFm.panels.forEach(panel => {
        panel.onItemsAdded(newItems => {
            newItems.forEach(item => {
                const icon = getIcon(item)
                item.setIcon(path.join(__dirname, 'icons', icon))
            })
        })
    })
}