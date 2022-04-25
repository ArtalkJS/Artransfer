import WordPressEncoder from './encoder/WordPressEncoder'
import ValineEncoder from './encoder/ValineEncoder'
import DisqusEncoder from './encoder/DisqusEncoder'
import CommentoEncoder from './encoder/CommentoEncoder'
import TwikooEncoder from './encoder/TwikooEncoder'
import ArtralkV1Encoder from './encoder/ArtralkV1Encoder'
import RemoveReplyAtTagEncoder from './encoder/RemoveReplyAtTagEncoder'

export default {
  encoders: {
    WordPressEncoder, ValineEncoder, DisqusEncoder,
    CommentoEncoder, TwikooEncoder, ArtralkV1Encoder,
    RemoveReplyAtTagEncoder
  }
}
