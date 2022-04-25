/** 尝试将一行一行的 Obj 转成 Arr */
export function TryConvertLineJsonToArr(str: string) {
  str = String(str).trim()
  const arrTmp: any[] = []
  const splitted = str.split('\n')
  splitted.forEach((line) => {
    const tmp = JSON.parse(String(line).trim())
    arrTmp.push(tmp)
  })
  return arrTmp
}

export function ConvertToAtkEmoticon(content: string) {
  return content
    .replace(/(<img[^>]*)(class=['"]vemoji['"])/ig, '$1atk-emoticon') // class="vemoji"
    .replace(/(<img[^>]*)(class=['"]tk-owo-emotion['"])/ig, '$1atk-emoticon') // class="tk-owo-emotion"
}

export function RemoveAtTag(content: string) {
  return content
    .replace(/<a\s+(?:[^>]*?\s+)?href="#([a-zA-Z0-9]+)?"[^>]*>@(.*?)<\/a>(: | , )?/ig, '')
    .replace(/\[@(.*?)\]\(#[a-zA-Z0-9]+?\)(: | , )?/ig, '')
}
