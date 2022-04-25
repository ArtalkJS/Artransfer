import { ArtranFormat, Encoder } from '../common'
import { TryConvertLineJsonToArr } from '../tools'
import * as Tools from '../tools'

interface TwikooFormat {
  _id: string
  uid: string
  nick: string
  mail: string
  mailMd5: string
  link: string
  ua: string
  ip: string
  master: string
  url: string
  href: string
  comment: string
  pid: string
  rid: string
  isSpam: boolean
  created: string
  updated: string
}

interface TwikooEncoderOpts {}

class TwikooEncoder extends Encoder<TwikooEncoderOpts> {
  srcList!: TwikooFormat[]

  public encode(src: string) {
    let jsonArr: TwikooFormat[] = []
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

    // @see https://github.com/imaegoo/twikoo/blob/c528c94105449c6b10c63bded6f813ceaee4bf74/src/vercel/api/index.js#L1155
	  // rid 对应 _id @see https://github.com/imaegoo/twikoo/blob/c528c94105449c6b10c63bded6f813ceaee4bf74/src/vercel/api/index.js#L343
    this.srcList.forEach((tc) => {
      tc.comment = Tools.ConvertToAtkEmoticon(tc.comment)

      const a: ArtranFormat = {
        id: tc._id,
        rid: tc.rid,
        content: tc.comment,
        ua: tc.ua,
        ip: tc.ip,
        is_collapsed: false,
        is_pending: tc.isSpam,
        created_at: new Date(tc.created),
        updated_at: new Date(tc.updated),
        nick: tc.nick,
        email: tc.mail,
        link: tc.link,
        page_key: tc.url,
      }

      destList.push(a)
    })

    return destList
  }
}

export default TwikooEncoder
