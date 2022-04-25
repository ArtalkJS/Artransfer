export abstract class Encoder<T> {
  public opts: T = {} as T
  public constructor(opts?: T) {
    this.opts = { ...this.opts, ...opts }
  }
  public static DisplayName = ""
  public abstract encode(src: string): Encoder<T>
  public abstract toArtrans(): ArtranFormat[]
}

export interface ArtranFormat {
  id: string
  rid: string

  content: string
  ua: string
  ip: string

  created_at: Date
  updated_at: Date

  is_collapsed: boolean
  is_pending: boolean

  vote_up?: number
  vote_down?: number

  nick: string
  email: string
  link: string
  password?: string

  badge_name?: string
  badge_color?: string

  page_key: string
  page_title?: string
  page_admin_only?: boolean

  site_name?: string
  site_urls?: string
}
