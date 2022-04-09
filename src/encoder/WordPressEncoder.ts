import { XMLParser } from 'fast-xml-parser'
import { ArtranFormat, Encoder } from '../common'

interface WordPressEncoderOpts {}

class WordPressEncoder extends Encoder<WordPressEncoderOpts> {
  private channel!: ChannelWXR
  private pages!: ItemWXR[]

  public encode(src: string) {
    const xmlParser = new XMLParser();

    let channel = xmlParser.parse(src).rss.channel
    channel = JSON.parse(JSON.stringify(channel).replace(/"wp:/g, '"')); // 去掉字段前缀

    this.channel = channel
    this.pages = this.channel.item

    return this
  }

  public toArtrans(): ArtranFormat[] {
    const destList: ArtranFormat[] = []

    this.pages.forEach((page) => {
      if (!page.comment) return

      page.comment.forEach((w) => {
        const a: ArtranFormat = {
          id: String(w.comment_id),
          rid: String(w.comment_parent),
          content: w.comment_content,
          ua: "",
          ip: w.comment_author_ip,
          is_collapsed: false,
          is_pending: w.comment_approved == 0,
          created_at: new Date(w.comment_date),
          updated_at: new Date(w.comment_date),
          nick: w.comment_author,
          email: w.comment_author_email,
          link: w.comment_author_url,
          page_key: page.link,
        }

        destList.push(a)
      })
    })

    return destList
  }
}

export default WordPressEncoder

/**
 * WordPress eXtended RSS Format
 */
interface CommentWXR {
  comment_id: number
  comment_author: string
  comment_author_email: string
  comment_author_url: string
  comment_author_ip: string
  comment_date: string
  comment_date_gmt: string
  comment_content: string
  comment_approved: number
  comment_type: string
  comment_parent: number
  comment_user_id: number
}

interface ChannelWXR {
  title: string
  link: string
  description: string
  pubDate: string
  language: string
  wxr_version: string
  base_site_url: string
  base_blog_url: string
  generator: string
  author: AuthorWXR[]
  category: CategoryWXR[]
  tag: TagWXR[]
  item: ItemWXR[]
}

interface AuthorWXR {
  author_id: number
  author_login: string
  author_email: string
  author_display_name: string
  author_first_name: string
  author_last_name: string
}

interface CategoryWXR {
  term_id: number
  category_nicename: string
  category_parent: string
  cat_name: string
}

interface TagWXR {
  term_id: number
  tag_slug: string
  tag_name: string
}

interface ItemWXR {
  title: string
  link: string
  pubDate: string
  creator: string
  guid: string
  description: string
  content: string
  excerpt: string
  post_id: number
  post_date: string
  post_date_gmt: string
  comment_status: string
  ping_status: string
  post_name: string
  status: string
  post_parent: number
  menu_order: number
  post_type: string
  post_password: string
  is_sticky: boolean
  attachment_url: string
  category: ItemCategoryWXR[]
  postmeta: PostMetaWXR[]
  comment?: CommentWXR[]
}

interface ItemCategoryWXR {
  domain: string
  nicename: string
  displayname: string
}

interface PostMetaWXR {
  meta_key: string
  meta_value: string
}
