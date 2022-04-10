import { Encoder } from '../common';
import Artransfer from '../main'

// 外观选项
;(() => {
  if (window.location.search.includes('iframe')) {
    document.body.classList.add('iframe-mode')
  }
  if (window.location.search.includes('dark')) {
    document.body.classList.add('dark-mode')
  }
})();

// 初始化 Encoder 列表
;(() => {
  const $encoderList = document.querySelector<HTMLSelectElement>('.encoder-list')!

  Object.entries(Artransfer.encoders).forEach(([name, encoder]) => {
    const $option = document.createElement('option')
    $option.value = name
    $option.innerText = name.replace(/Encoder$/, '')
    $encoderList.append($option)
  })
})();

// 获取源文件格式
function getFileFormat() {
  const $srcFormat = document.querySelector<HTMLSelectElement>("#srcFormat")!
  return $srcFormat.value
}

interface FileInputData {
  content: string
  name: string
}

// 获取源文件内容
function getFileInput(): Promise<FileInputData> {
  return new Promise((resolve, reject) => {
    const $fileInput = document.querySelector<HTMLInputElement>("#importFile")!.files![0]
    if ($fileInput) {
      const reader = new FileReader()
      reader.readAsText($fileInput, "UTF-8")
      reader.onload = (evt) => {
        resolve({
          content: String(evt?.target?.result),
          name: $fileInput.name,
        })
      }
      reader.onerror = (evt) => {
        reject('读取文件失败')
      }
    } else {
      reject('请选择文件')
    }
  })
}

// 导出 Artrans 按钮
document.querySelector<HTMLButtonElement>('#exportBtn')!.onclick = async () => {
  const srcFormat = getFileFormat()
  if (String(srcFormat) == "") { alert("请选择格式"); return }

  let srcFile = null
  try {
    srcFile = await getFileInput()
  } catch (err) { alert(err); return }

  const Encoder = (new (Artransfer.encoders as any)[srcFormat] as Encoder<any>)

  let artrans = []
  try {
    artrans = Encoder.encode(srcFile.content).toArtrans()
  } catch (err) { alert(err); return }

  downloadJSON(`${srcFile.name}.artrans`, JSON.stringify(artrans))
}

function downloadJSON(name: string, str: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(
      new Blob([str], {type: "application/json"})
  )
  a.download = name
  a.click()
}
