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
