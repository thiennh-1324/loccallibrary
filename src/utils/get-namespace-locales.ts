import fs from 'fs'
import path from 'path'

const getNamespacesLocales = () => {
  const localesDir = path.join(__dirname, '../locales')
  if (fs.existsSync(localesDir)) {
    return fs.readdirSync(localesDir).filter((file) => {
      return fs.statSync(path.join(localesDir, file)).isDirectory()
    })
  } else {
    console.error('Folder `locales` not exist')
    return []
  }
}

export const namespaces = getNamespacesLocales()
