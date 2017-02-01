import path from 'path'
import { shell } from 'electron'

const { APPDATA, ProgramData, USERPROFILE } = process.env

const parseFile = (filePath) => {
  try {
    const details = shell.readShortcutLink(filePath)
    return {
      path: details.target,
      description: details.description
    }
  } catch (e) {
    return {
      path: filePath
    }
  }
}

export const DIRECTORIES = [
  USERPROFILE && `${USERPROFILE}\\Desktop\\`,
  APPDATA && `${APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\`,
  ProgramData && `${ProgramData}\\Microsoft\\Windows\\Start Menu\\Programs\\`
].filter(dir => !!dir)

export const EXTENSIONS = ['lnk', 'exe']

export const openApp = (appPath) => shell.openItem(appPath)

export const toString = (app) => `${app.name} ${app.filename}`

export const formatPath = (filePath) => ({
  ...parseFile(filePath),
  // TODO: check if file is hidden or not
  hidden: false,
  filename: path.basename(filePath),
  name: path.basename(filePath).replace(/\.(exe|lnk)/, ''),
})
