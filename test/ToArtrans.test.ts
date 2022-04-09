import { assert, describe, expect, it } from 'vitest'

import * as fs from 'fs'
import ValineEncoder from '../src/encoder/ValineEncoder'
import WordPressEncoder from '../src/encoder/WordPressEncoder'
import DisqusEncoder from '../src/encoder/DisqusEncoder'
import TwikooEncoder from '../src/encoder/TwikooEncoder'

const checkEncoders = [ValineEncoder, WordPressEncoder, DisqusEncoder, TwikooEncoder]

function getFileSample(name: string) {
  return fs.readFileSync(`${__dirname}/sample/${name}.sample`, {encoding:'utf8', flag:'r'})
}

function getFileArtrans(name: string) {
  return fs.readFileSync(`${__dirname}/sample/${name}.artrans`, {encoding:'utf8', flag:'r'})
}

describe('Encoder', () => {
  checkEncoders.forEach(EncoderClass => {
    const EncoderName = EncoderClass.name.replace(/Encoder$/, '')
    it(EncoderName, () => {
      const artrans = new EncoderClass().encode(getFileSample(EncoderName)).toArtrans()
      expect(JSON.parse(JSON.stringify(artrans))).toMatchObject(JSON.parse(getFileArtrans(EncoderName)))
    })
  })
})
