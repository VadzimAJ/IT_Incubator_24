
import { GridComponent } from './Grid/Grid.component.js'
import { ResultPanelComponent } from './ResultPanel/ResultPanel.component.js'
import { SettingsComponent } from './Settings/Settings.component.js'


export function AppComponents() {

  const element = document.createElement('div')

  render(element);

  return {element};
}

async function render(element) {
  
  const settingsComponent = await SettingsComponent()
  const resultPanelComponent = await ResultPanelComponent()
  const gridComponent = await GridComponent()


  element.append(settingsComponent.element, resultPanelComponent.element, gridComponent.element)
}