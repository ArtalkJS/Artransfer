import { XMLParser } from 'fast-xml-parser'
import { ArtranFormat, Encoder } from '../common'

interface DisqusEncoderOpts {}

class DisqusEncoder extends Encoder<DisqusEncoderOpts> {
  private disqusData!: DisqusFormat

  public encode(src: string) {
    const alwaysArray = [
      "disqus.category",
      "disqus.thread",
      "disqus.post",
    ]

    const xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix : "@_",
      allowBooleanAttributes: true,
      isArray: (name, jpath, isLeafNode, isAttribute) => {
        if(alwaysArray.includes(jpath)) return true
        return false
      }
    })

    this.disqusData = xmlParser.parse(src).disqus

    return this
  }

  public toArtrans(): ArtranFormat[] {
    const destList: ArtranFormat[] = []

    this.disqusData.thread.forEach(page => {
      if (typeof page.isDeleted == "boolean" && page.isDeleted == true) return

      const comments = this.disqusData.post.filter(c => c.thread['@_dsq:id'] == page['@_dsq:id'])

      comments.forEach((c) => {
        const a: ArtranFormat = {
          id: c['@_dsq:id'],
          rid: c.parent ? c.parent['@_dsq:id'] : '',
          content: c.message,
          ua: "",
          ip: "",
          is_collapsed: false,
          is_pending: c.isSpam,
          created_at: new Date(c.createdAt),
          updated_at: new Date(c.createdAt),
          nick: c.author.name,
          email: '',
          link: '',
          page_key: page.link,
          page_admin_only: page.isClosed
        }

        destList.push(a)
      })
    })

    return destList
  }
}

export default DisqusEncoder

interface DisqusFormat {
  category: DisqusCategory[]
  thread: DisqusThread[] // pages
  post: DisqusPost[] // comments
}

interface DisqusCategory {
  "@_dsq:id": string
  forum: string
  title: string
  isDefault: boolean
}

interface DisqusThread {
  "@_dsq:id": string
  forum: string
  category: { "@_dsq:id": string }
  link: string
  title: string
  message: string
  createdAt: string
  author: DisqusAuthor
  isClosed: boolean
  isDeleted: boolean
}

interface DisqusAuthor {
  name: string
  isAnonymous: boolean
  username: string
}

interface DisqusPost {
  "@_dsq:id": string
  message: string
  createdAt: string
  isDeleted: boolean
  isSpam: boolean
  author: DisqusAuthor
  thread: { "@_dsq:id": string }
  parent?: { "@_dsq:id": string }
}
