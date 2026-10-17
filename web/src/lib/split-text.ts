export interface SplitResult {
  chars: HTMLElement[]
  words: HTMLElement[]
  revert: () => void
}

export function splitText(
  target: HTMLElement | string,
  options: {
    type?: 'words' | 'chars' | 'words,chars'
    mask?: 'words' | 'chars'
    wordsClass?: string
    charsClass?: string
  } = {}
): SplitResult {
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!element) {
    return { chars: [], words: [], revert: () => {} }
  }

  const originalHTML = element.innerHTML
  const text = element.textContent || ''
  const wordsList: HTMLElement[] = []
  const charsList: HTMLElement[] = []

  const words = text.split(/\s+/).filter(Boolean)
  element.innerHTML = ''

  words.forEach((wordText, wordIndex) => {
    const wordMask = document.createElement('span')
    wordMask.className = 'split-word-mask inline-block overflow-hidden align-top'

    const wordSpan = document.createElement('span')
    wordSpan.className = `split-word inline-block ${options.wordsClass || ''}`

    if (options.type === 'chars' || options.type === 'words,chars') {
      const chars = wordText.split('')
      chars.forEach((char) => {
        const charMask = document.createElement('span')
        charMask.className = 'split-char-mask inline-block overflow-hidden align-top'

        const charSpan = document.createElement('span')
        charSpan.className = `split-char inline-block ${options.charsClass || ''}`
        charSpan.textContent = char

        charMask.appendChild(charSpan)
        wordSpan.appendChild(charMask)
        charsList.push(charSpan)
      })
    } else {
      wordSpan.textContent = wordText
    }

    wordMask.appendChild(wordSpan)
    element.appendChild(wordMask)
    wordsList.push(wordSpan)

    if (wordIndex < words.length - 1) {
      element.appendChild(document.createTextNode(' '))
    }
  })

  return {
    chars: charsList,
    words: wordsList,
    revert: () => {
      element.innerHTML = originalHTML
    },
  }
}
