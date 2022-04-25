import { assert, describe, expect, it } from 'vitest'
import * as Tools from '../src/tools'

describe('Tools', () => {
  it("ConvertToAtkEmoticon", () => {
    const samples = [
      [
        `ERTYUI OPSJD<img class="tk-owo-emotion" src="https://test1.png" alt=":tv_doge:">ABCD ABCD`,
        `ERTYUI OPSJD<img atk-emoticon src="https://test1.png" alt=":tv_doge:">ABCD ABCD`
      ],
      [
        `ERTYUI OPSJD<img alt=":tv_doge:" class="vemoji" src="https://test1.png">ABCD ABCD`,
        `ERTYUI OPSJD<img alt=":tv_doge:" atk-emoticon src="https://test1.png">ABCD ABCD`
      ],
      [
        `ABCD <b>ABCD</b> CDEFG`,
        `ABCD <b>ABCD</b> CDEFG`,
      ],
      [
        `GDK GDK <img src="???" class="abc" />`,
        `GDK GDK <img src="???" class="abc" />`,
      ],
      [
        `KKKK<img class="tk-owo-emotion" src="https://test1.png" alt=":tv_doge:">KK KK<img alt=":tv_doge:" class="vemoji" src="https://test1.png">ABCD ABCD`,
        `KKKK<img atk-emoticon src="https://test1.png" alt=":tv_doge:">KK KK<img alt=":tv_doge:" atk-emoticon src="https://test1.png">ABCD ABCD`,
      ],
      [
        `EEE<img src="https://test1.png" class="tk-owo-emotion" alt=":tv_doge:">KK KK<img src="https://test1.png">ABCD ABCD`,
        `EEE<img src="https://test1.png" atk-emoticon alt=":tv_doge:">KK KK<img src="https://test1.png">ABCD ABCD`,
      ]
    ]

    samples.forEach((item) => {
      const result = Tools.ConvertToAtkEmoticon(item[0])
      expect(result).equal(item[1])
    })
  })
})
