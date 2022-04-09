import { ArtranFormat, Encoder } from '../common'

interface ExampleFormat {
  id: string
  //...
}

interface ExampleEncoderOpts {}

class ExampleEncoder extends Encoder<ExampleEncoderOpts> {
  srcList!: ExampleFormat[]

  public encode(src: string) {
    this.srcList = JSON.parse(src)
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
        created_at: new Date(c.created_at),
        updated_at: new Date(c.updated_at),
        nick: c.nick,
        email: c.mail,
        link: c.link,
        page_key: c.page_key,
      }

      destList.push(a)
    })

    return destList
  }
}

export default ExampleEncoder
