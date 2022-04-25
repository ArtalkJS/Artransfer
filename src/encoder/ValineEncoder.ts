import { ArtranFormat, Encoder } from '../common'
import * as Tools from '../tools'

interface ValineFormat {
  objectId: string
  nick: string
  ip: string
  mail: string
  mailMd5: string
  isSpam: boolean
  ua: string
  link: string
  pid: string
  rid: string
  comment: string
  url: string
  createdAt: string
  updatedAt: string
}

interface ValineEncoderOpts {}

class ValineEncoder extends Encoder<ValineEncoderOpts> {
  srcList!: ValineFormat[]

  public encode(src: string) {
    this.srcList = JSON.parse(src)
    return this
  }

  public toArtrans(): ArtranFormat[] {
    const destList: ArtranFormat[] = []

    this.srcList.forEach((v) => {
      v.comment = Tools.RemoveAtTag(v.comment)
      v.comment = Tools.ConvertToAtkEmoticon(v.comment)

      const a: ArtranFormat = {
        id: v.objectId,
        rid: v.rid,
        content: v.comment,
        ua: v.ua,
        ip: v.ip,
        is_collapsed: false,
        is_pending: v.isSpam,
        created_at: new Date(v.createdAt),
        updated_at: new Date(v.updatedAt),
        nick: v.nick,
        email: v.mail,
        link: v.link,
        page_key: v.url,
      }

      destList.push(a)
    })

    return destList
  }
}

export default ValineEncoder
