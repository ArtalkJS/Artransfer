import { ArtranFormat, Encoder } from '../common'

interface CommentoFormat {
  commentHex: string
  html: string
  markdown: string
  creationDate: string
  url: string
  parentHex: string
  state: string
}

interface Commenters {
  commenterHex: string
  name: string
  email: string
  link: string
}

interface CommentoEncoderOpts {}

class CommentoEncoder extends Encoder<CommentoEncoderOpts> {
  comments!: CommentoFormat[]
  commenters!: Commenters[]

  public encode(src: string) {
    const srcObj = JSON.parse(src)
    this.comments = srcObj.comments
    this.commenters = srcObj.commenters

    return this
  }

  public toArtrans(): ArtranFormat[] {
    const destList: ArtranFormat[] = []

    this.comments.forEach((c) => {
      let commenter = this.commenters.find(o => o.commenterHex == c.commenterHex)
      if (!commenter) {
        commenter = { commenterHex: c.commentHex, name: '', email: '', link: '' }
      }

      const a: ArtranFormat = {
        id: c.commentHex,
        rid: c.parentHex !== 'root' ? c.parentHex : '0',
        content: c.markdown || c.html,
        ua: '',
        ip: '',
        is_collapsed: false,
        is_pending: c.state !== 'approved',
        created_at: new Date(c.creationDate),
        updated_at: new Date(c.creationDate),
        nick: commenter.name,
        email: commenter.email,
        link: commenter.link,
        page_key: c.url,
      }

      destList.push(a)
    })

    return destList
  }
}

export default CommentoEncoder
