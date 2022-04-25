import { ArtranFormat, Encoder } from '../common'
import * as Tools from '../tools'

interface RemoveReplyAtTagOpts {}

class RemoveReplyAtTagEncoder extends Encoder<RemoveReplyAtTagOpts> {
  public static DisplayName = "@AT 标签删除"

  srcList!: ArtranFormat[]

  public encode(src: string) {
    this.srcList = JSON.parse(src)
    return this
  }

  public toArtrans(): ArtranFormat[] {
    const destList: ArtranFormat[] = []

    this.srcList.forEach((c) => {
      c.content = Tools.ConvertToAtkEmoticon(c.content)
      c.content = Tools.RemoveAtTag(c.content)

      destList.push(c)
    })

    return destList
  }
}

export default RemoveReplyAtTagEncoder
