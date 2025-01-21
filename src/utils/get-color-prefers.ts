export function getColorPrefers(): 'light' | 'dark' {
  const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)').matches
  if (prefersLightScheme) return 'light'
  else return 'dark'
}
