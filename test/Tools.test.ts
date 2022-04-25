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
      ],
      [
        `ANCD<img alt="laugh and cry" referrerpolicy="no-referrer" class="vemoji" src="//2018new_xiaoku_thumb.png"/>ANCD ANCD`,
        `ANCD<img alt="laugh and cry" referrerpolicy="no-referrer" atk-emoticon src="//2018new_xiaoku_thumb.png"/>ANCD ANCD`,
      ]
    ]

    samples.forEach((item) => {
      const result = Tools.ConvertToAtkEmoticon(item[0])
      expect(result).equal(item[1])
    })
  })

  it("RemoveAtTag", () => {
    const samples = [
      [
        // Valine Marked (@date 2022-4-25)
        `<p><a class="at" href="#625a63ad1122b910ec64d01d">@Anonymous </a> , TestTest</p>\n`,
        `<p>TestTest</p>\n`
      ],
      [
        // Waline Marked (@date 2022-4-25)
        `<p><a href="#614931205e0db15b17e47848" xlink:show="new">@TEST</a>: AAAAA</p>\n`,
        `<p>AAAAA</p>\n`,
      ],
      [
        // Waline (@date 2022-4-25)
        `[@TEST](#614931205e0db15b17e47848): AAAAA`,
        `AAAAA`,
      ],
    ]

    samples.forEach((item) => {
      const result = Tools.RemoveAtTag(item[0])
      expect(result).equal(item[1])
    })
  })
})
