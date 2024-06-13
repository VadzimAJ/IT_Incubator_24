import { getGooglePoints, getPlayerPoints } from "../../../core/state-manager.js"

export function ResultPanelComponent() {

  const element = document.createElement('div')

  element.classList.add('result-panel')

  render(element);

  return {element}
}

async function render(element) {
  const googlePoints = await getGooglePoints ()
  const playersPoint1 = await getPlayerPoints (1)
  const playersPoint2 = await getPlayerPoints (2)

  element.append(` Player1 points: ${playersPoint1}, Player2 points: ${playersPoint2}, Goole points: ${googlePoints}`)
}