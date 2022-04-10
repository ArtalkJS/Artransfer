import { ArtranFormat, Encoder } from '../common'
import { TryConvertLineJsonToArr } from '../tools'

interface ArtralkV1Format {
  id: string
  content: string
  nick: string
  email: string
  link: string
  ua: string
  page_key: string
  rid: string
  ip: string
  date: string
  is_pending: boolean
  is_collapsed: boolean
}

interface ArtralkV1EncoderOpts {}

class ArtralkV1Encoder extends Encoder<ArtralkV1EncoderOpts> {
  srcList!: ArtralkV1Format[]

  public encode(src: string) {
    let jsonArr: ArtralkV1Format[] = []
    try {
      jsonArr = JSON.parse(src)
    } catch (err) {
      jsonArr = TryConvertLineJsonToArr(src)
    }

    this.srcList = jsonArr

    return this
  }

  public toArtrans(): ArtranFormat[] {
    const destList: ArtranFormat[] = []

    this.srcList.forEach((c) => {
      const a: ArtranFormat = {
        id: c.id,
        rid: c.rid,
        content: c.content,
        ua: c.ua,
        ip: c.ip,
        is_collapsed: false,
        is_pending: c.is_pending,
        created_at: new Date(c.date),
        updated_at: new Date(c.date),
        nick: c.nick,
        email: c.email,
        link: c.link,
        page_key: c.page_key,
      }

      destList.push(a)
    })

    return destList
  }
}

export default ArtralkV1Encoder
