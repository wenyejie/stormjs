<!--
 - icon
 -
 - @author: Storm
 - @date: 2017/12/20
 -->
<template>
  <i
    :style="styles"
    :class="classes"
    class="s-icon" />
</template>

<script>
const isTheme = name => /^(primary|success|info|danger|default)$/.test(name)

export default {
  name: 'SIcon',
  props: {

    // 类型
    type: {
      required: true,
      type: String
    },

    // 大小
    size: {
      type: [String, Number],
      default: ''
    },

    // 颜色
    color: {
      type: [String],
      default: ''
    },

    fill: {
      type: [Boolean, Number],
      default: false
    }
  },
  computed: {
    styles () {
      const result = {}

      // 判断是否为number类型
      if (typeof this.size === 'number') { // 是
        result.fontSize = `${this.size}px`
      } else if (typeof this.size === 'string' && /\d/.test(this.size)) {
        result.fontSize = this.size
      }

      // 填充颜色区域大小
      if (Number.isSafeInteger(this.fill)) {
        result.width = `${this.fill}px`
        result.height = `${this.fill}px`
        result.fontSize = `${this.fill * 0.6666666666666666}px`
      }

      // 判断是否有颜色
      if (this.color && !isTheme(this.color)) {
        result[this.fill ? 'background-color' : 'color'] = this.color
      }
      return result
    },
    classes () {
      return {
        [`icon-${this.type}`]: !!this.type,
        [`s-icon-fill`]: !!this.fill,
        [`${this.fill ? 'bg' : 'c'}-${this.color}`]: isTheme(this.color),
        [`s-icon-${this.fill}`]: !!this.fill
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variable.scss";

  @font-face {font-family: "iconfont";
    src: url('./font/iconfont.eot?t=1544527003819'); /* IE9*/
    src: url('./font/iconfont.eot?t=1544527003819#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAB0cAAsAAAAAMIAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8vEnzY21hcAAAAYAAAAHSAAAEtpZnzwJnbHlmAAADVAAAFeAAACNcFzr5+GhlYWQAABk0AAAALwAAADYTjr8yaGhlYQAAGWQAAAAeAAAAJAfjA7RobXR4AAAZhAAAABQAAADU1AEAAGxvY2EAABmYAAAAbAAAAGzgOuhibWF4cAAAGgQAAAAfAAAAIAFQAN1uYW1lAAAaJAAAAUUAAAJtPlT+fXBvc3QAABtsAAABrQAAAujvV1mteJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByeOT3/x9zwv4EhhrmZoQUozAiSAwD1wg0reJzl1MlOVEEYxfF/Ny1O7YgKTjgPOA/EB3BhfAYW7ngD9vAYPAQqQWWBsyBrAhsSnCGejRskwRk4dQ9bfQFv5dfpW5VUVec7XwMbgBa7YA2od1LzN2odnq1V8y1sqeYbfPH7IXZ6pvn5pnrVpwENa1STmtKMZrWgJa2srsL6ar+GNKIxr057dU6LWi6rf31q3j2jk9Nc4pbHbY8e7lSrdZ/c8I1b2cgmNvteW2myje3sYLfv1cYu9rCXfZ5rp8Nr+znAQe932Dse4SjHOM4JTnLK+5/hLF2c47x/40WfdpkrXOUa1+n2Ya3/uOf/8jTLR31w/e1GqWuUZKg3XBXUFyVJ6o+SJg1ESZmGwtVDd8N1RPfCFUX3w7VFw1HSp5FwvdGDKLfTw3C90aNwGtBoOBdoLJwQ9DicFfQknBr0NJwf9CycJPQ8nCn0Ipwu9DKqc1+FE4fGw9lDE1Hd83U4j2gynEw0Fc4omg6nFc2Ec4tmwwlGc+EsozfhVKO34Xyjd+Gko/fhzKMP4fSjj+E+QJ/CHYHmw72BFsJdghbD/YK+hjsHLYV7CC1H+SfRt3Bfoe/hDkM/wr2Gfoa7Dv0K9x/6He5E9Cfck2gl6F4DsLf0SgAAeJydWgtsHMd5nn9mX3e8vd3l3t3y7sh7knfi6yjdU6JMUpYsk3qcH5JJPUwpktJQliVbVu0YgZwm58RGa6uBJEMuIAZNUkewYxm2U1BB5CZ2FDuuaUdM6iCW4FZG4DaQjSZokKJNCkS36j+7R+lIpU1T3t08/pnd/f+Z73/NklBCrtYEwmpEIxlCIOkH2YiBlRyGipEDJmWyOagMgxWSZClG3RabqhdXbaV06yp63qn/vPc3Tx0fX5Iav2kwnAmMPnBPOLFu/a3LWA2nNE+98s0l48ef+k1v97Jb169LhO95YDSQCQ/eNE4IQz5m2ByrkhYSIAnkRCJyiFhlUskQlsoUy/lQQKoEpFSmZPBOkJI37booAnvzTWCiaNfftNrbc+3tTpFrZ1VOappSX94+EI0OtM+1RaNtQHCyRdznXmZ7WYSoJEqWEGKWUHJcgCAuRA4glckGsYe0kh+ybuXSptk7J0++w5wSPrnvtRG3P/LaPqf8CSfQQnXNOKXja7ACGLc/m8uNuYSxXG4jVlty+LdlzTgRCGdmmn6E8reRLlImpCvJxS4kueBmDtLJlBQIYbe8oAOVcjGT0kAKxCGULxezfHO4iPQ8lu0QbbOdLmAXsHd9sD62V4sv0Z/U8bskrkVwbXCFYMpdRljfxler3f75FB/FKfqTfDqy+Xt4rThcph2OYQF7zR2GdX4EysUByKQ4w9MOky5PtG0RrwuY/bCZ1b01dyudXWzm9XMLWJ1CNoHzSs/QXxJEepcHoApT9nQADsABd4y10DhBqboQWUXkLY/LiCgbwJn8ZhfxZhf5zWZ+rSey+kUdv9mEPkOu3buGEMJ7m0mjRpFEG3RWpGcQUQTSfE1WQomDtgMKfJ16IegAGebmOAznUIZrDag29+YaMG0866v0COcVuDpwPnHbHa7h0ALmaGEh63ip5PD0BL1AFNyzJFlGBsl6lHoYinwrQl24gRzzfAuHYBj++AFWCVhW1rLqh+k50wKwzPqqgAVhevqPo4+DlbHw+3nLnDAtp6j9n0hEdmQ858jY6mjzMnIzlxIGQC4Y+BGDHIglBKQVA74FxXI2WSyPAFJkHKtcp+bLQygox24HNA2wgtJ7bvu741dqVoASmwSsmsn5sFbDVySpVr9ghMHa1yA5IgbqE1g2SPADdeC9q7ibNWT4tGU2pHhUMuS/XCDXozeK2pDv+yifREIkTrpJntxE1qJ8cpaLxzHGzQUy7KgiMp3nxkFCc873CEetHPC9y5ezztxg8yx27gdv7rxw5T0U7Brf85sBx75Sf44T55k5PS/+tRnkvfeAoGjj83xbw67M9urTTn/c7X7sSN4YIyLa3/fZX7Fe4iEm4nKADCEq5WzFBXhWo4HQCOvihjcHWbTJ3Brncceu2WEUyakKpREqsSdi22Nq0h/zPRM7HRPZ/idusQ8ee1UQXj12/FXGXj3eP5F+buBv/+XlZfL3jh16eRlSMjGhd/BKbFtMVWPeTiP2wn6msNiXbvk23T1259huitX42I6LPs9z2worVxYOrv1EPwwWD47tBuNetVdp+JAfsxrrRx8aI/24H12ZYqWrnLfEUEAWpZSFHhX73KHKIrqRrowkGyEcRVIxA7+wZz0eKHgtLxZee04OJiCgQjEAWNlzXt8qe07lHSh6LfDB9IzcJs/IsluttqfVFnlGDcMerF+WQu0vyy2qPR3xnZG8KuxVHftBr/lXg3Q4iHEtcChfQXuMPp6hs0WXmyHZMqEvXUKjn+DGVgeiafqS1+Z9bMOhUvHSbm5yjmgaEJxlUli+yN82P7OFZPGZTU8wZdcVWNxlDcz7MIcnCx37woc9uJ8/6sB+btQOHOAWbf8BbuducPH26hvm7HeudXzW1fPsDCsiL1HSS1YiPwgax8mjW2eoNkHDVRseX3TDwr65aJxe3vIQpQ9tmeDlGihwM23zyMLeAAXus2zHcje1WWF++sSWh+zS75nhtGGucaM2flPCrf3VxzE+ewQl8GIvSNpJCjU/R0oowyoySm4jd5HtZA/Kg0oSZIVSOgZZLP1g8iaEgoUcGkAssiGzgHPSEuMqwyM8FN/EOVamEsReAbtY8XUpZErJdBBnszS/vAtHCsVyBQqJHeXXX78sGMHLr2vGP88kdsCfxOeERPzs0wOPVYeGno8nhDn5EzjL/tAsxtd9vvC0M/Dr8o7EciRUH81f2Y3Tn4/TAr9Dgt+rvrU9LcyZPjozsc8zW5+7PPzwx5fzD9dfnJ3YR//9wOHhh/OF4Z3WcH1r/uHhw/AWnzV4d8zaOVyf5vRPz6r7NrkECOPkA4fxatiKt8njBUMPlhs6WmPTGOf6SMSN82KQKFfcMG+hfTEXBH1TK38KoZ+uFD9+8cWP4ekXPxadFi+PNKgizqg+Pjw6Ovy4g4oncaenXHxgZf9wnr4F55AGL59lP2Rf/P/YC4xJP7KPtLTAQV97CzzQ0mIfUyJZaNPhYBiwso/71Kp9XG8DCOOcKAUV/uaC0uG5oCgXPB3KBeV2+y7dJ1/QY/ANzSe/q0RS78o+zd4c0y9gDS9q7YvjjS43InLjIx510KML4o25G8INtDLk6nuCgHZdQo3TiYUWoJ8UyAj6q/XkDrKF7CRTZD85Qv4BH4ZLj+stI9aKjOPN5GhNh9gwrOSoLpZLOJQpd7mwxjIQEpEhSXNGM9k0hy8UcLc4pAtlOS3JHLyOdxgADnF+V64PXdmMRqWQVfDTbEZOp6Q0mhx3s/GKrnTJbWCiU0Evkx+mlTxGb/lQAefg+pczWcyIGF4nSzIyI+MXO3EhNAKBDH1Q742sujc7/cx3zz4VWf/KsywW+lL4r6UwLng8JHxnFaP2he8+49Ujz3xXhz+TRK/XFzSTurCz2jlk2e8e71/vG7q357PJ3BN58VnQPpW9d1WkV88+y6LhJ7za5eOR9fRrqyQ5nGWi3CPf/lC/JKuMMlmOrMlumGrpkUX7G70sbAqCl/E/rJBRJqtSEJt6VJV1WQJPol/yqKrkbZVUVUFqJCVkZJEFxYwgS6tEWlu6MWzeVuw9dx90vzC6zf50ZVf3Zvtbfj1WCqht3nNM+vBc9y77Z+eKu16lkq51yH6P5LnvBXllP73phZZtm61qedeRzfdVdtl3FW8zOzb0/6K4p6dvl/310+u3ffNOWU4NCAos30D7RBBkQ4p0AN2zAZSYEBkwmMSAfwTBKQTdK1MP8p2QeB9/itTqtW7u9AhhYUCUpDspBrc8jvgxDvagd5skB8jj5ATilm8QKjMPl3GPHeOXgxFaRr8ndaUdZCG2hgFxPQIcbBjSupuMaQvfYgywg84mBxtb7Qe8FnGRMdFrdmVSqK4BVMx8BZOyBlpLXGtRYTFw4cBmC709+22Pcu9t2bUdkqrLoVJi5SZlQBJZJiJJq7zM/lrWEZrJTBBEJZDvECLFgLtp0ZsT2VvCfoXifjMGkoD7Swdw2xAQqzy0D0OHtzGGsGd9PliOjW0eqoZ1NfjIJh5GzAYgqD7GJOEDe9YNJpbzYOKxDXtotEMyVBQD1g2CIgykZPlOQUkiZpgs4VO8giAJsh5q1SXwSoZktbVbqg8fLnkkpkiCxLyaBzwMt/VOBZ7jQYkgNEIU+7LaEdVv2yEcd2MU+6Tqlap4LWy8MUrh8cL32H+w1RgL/gi3tIQLl2mtlCwRV1VKO46ap+YBibupEo/by5hPWa625itlNFGNjUOjmUJFzZT5DnNi1hlpDArpHMsWc0x2ZvIvSo82AbMy2fngZIpkDbhDCCAmCiEnYZD5/A50kAgCK4RFpVzJx6gVspyxQChOcSLLlytoN1IFJhz82grpsXd+VT9uruxJJDbdQ+n+2+/ch7lOKB9ptwzF4+qpt02VZBFUVcXVlhSmxvR42MSllRDSzIdayiFgyHxU1cJR3dsW0SRRllUTtQeXX5aZJAFlIl4SjqsdKlPwjjJTESqA2xgJe30+r5mQ+eNk/Ige1RcwPXqrXw4AlRQAZoQ9qGZ+XfVIkmpojBb+Qih/0gTV/MyFqdzOrIq8uxKkh0OqIfREur0SB6tX8LUKPtksRFSGkRgiMmIm0Kqg6UF+fcwnIl8gCmK4zVSkltagT/CitKIoIHxQOtknYyOG8rW2BCQmop5jJC/LYRQ6giBT/QE1Go+qUZTH2+HVvJoiyWioONeSIkUivjBaM1xJw4s6gaqC4WO4zev42avsBazCpEhuRz/DfTw/4QqmFx5zZdG2uy4OUYJxjoMo9+QlzT1KqnG0USlkG6m3AwdGYGmnfbpzKYx3LgNY1klPu7W9N6xGkuonZVRmZwOROXDyogx2UFj7NO/8qmkWrfXiffB+vfyePW4bLmBtr4uoyai6R8a74P7JLQIDTJx/gA0Bawirqcj86MIzjYa3dn03Z5vOLPTUVFt8qMHX7HX2d2wDSaO3Xo33wFSMWzpu6OJcUZwCrZlVxhDFjd15kJJGO9tVQU1ArczK1/sY47OvHjqEkfHRXM4+Go3yNv/BIQv/wO2V7KOCT1A8zD56YpbT3xA/uEZ4I5d74wS8tHyFMWictayzWK1YjoVL8AB45kn/elYAEM6O7fZQ6tk9tJ/3Zsb2WNaeMffcCmPAOYwBIyjbEEbOGHnxhJjz75roAqouBoMl5+iTk7kUmayBVH5+w8U2QDQQJSVTyouYEWhg4PI46WoM2An7lBaJRTT7FIbytAKToQ4tosFke4fQ0QZt9imlRVMF++sYnbXBDp/uF2CyDeqbgHyoB0S052sC+iXd/uUlPa0jhT4/KyuKPKvn4/b+ofisxtvLovB0PG/HY/pbAqXCWxjIHcO2gnHArIbzoHrCvlhTkgEgAlwlZrylBkOG5ys1RakpHWTx+VQD0RUXKw09kPlhRwXOXuIwuXSJo+ZSUxtqN5DctmPDr5+nOjmW4SZZBkZXC3qM9A4CDPY6pd3b1GERuqKvPt23gmJNp9y6ue/gFIs54GeQFmLViSFd9+AH8X9osyn3IX3OE+9vfvxBh9bndCAyT/5fykZOfRlzighpJXEn/+LhQyVUQRm5t8rIzBUYQYTyAslumhjv3Lhjsprd3HPra+smq1MWP5Md4AW9HA2Ho0WAok0iYXmbDCVaXHAE6uDXfZ6GzxvAWJpAsrGkycYKL+r/oXE6BcQ9F75KHF4wf3Ub1lV3AH7+B2dUr7fbFo25/R9dv9padDenP5+fOe8h+H4uWXT+37yHIT9kBnC33dcAGDiS9+2fofNLvv8+JCXJ/tn7TTlaWBf50YEi8zcCNT7YNPnKgWupHKZ2KxDFolYTWxX35cAvuZ5cnWGPsippQ374ya2MtjQLjiPAp1dwMYMG/d0mVHIbLatuz2jt1iZM5J+22uFhfLB9Stdh0t+Pkp5yxbUn589FpvG+DLN5UkkGkxDk+UUw6WQfpSZxp1jxynlK5hD7WK/om7t1M7Cj999/lMHmyF54aRRpU1xDRhOHNyEVxzYdJs3PiPP3Ol3uOW0RwxL+iPl3HM6P8fAKMyM2PQ83BCQ9tN0F+/ZDlCPU3ovt8zBYc07cUZC5T325U3OVRkt8ed8citf+c+z0DV7DaRzjOIt0kR5cvcr8gTVDn9DwSRWrws+hGqfuclY25QpY9OgYLuV+XR89MnZA047xztjomN05hrSjvLd6rHpoNggXZ+jsqI4zl+hj9gejvD6K3bGxMVgz1tSrfxiYxcmO3bv6n+wN1kKW8jP0ay9NRsBwe0Gj0XffUKBpd3rcHxSzbLfeZ7wrCBtFXTxaP2P06dV4fEzv03/CaYZwlG5E2pimx+nvNO0nOGujIBy1d9MxTRuL5+xiLj52nQ6n6jNI17sDcD4Xd/frQ0e3/bhijt0MYZ6adaGACouEcsXiZ7UVzl25kgOY5TAoBSJr77r/GGVf2j/9tiC8Pf3I5CnF1AOKrp8aBeFtOkOP3X/X2niw6ADn2D6ccvIdBrd+XcE/Paufmnxk+u3GGSG3qfQjtGcpQsyMH0JOboMe0clpssDP/A0XS9x8PK9HdVWD7vQdWejWVOzZF9HLn2BFF+1Xzjs13a2o8ahS0/WaEo2rSk3TQESsTTumbYobAJ6/zaD+V9G2mSSAWVyX+zYS9yTEw7QSz52SRlJMz59XW2nXjrG5K/ydlcWmsVx/5Twr2lNTsGLrCvz+8DyH6DS6lOp1dizO3pUf0QJqFZ/29w2D7p4RzrGi8/ag0zmZmX8fWgh2NWJFmH8ZWbihwV+9uSpxEkTIOc36Z6KpVCWZ/EesyqnUP7Unk5VUihXwmTZBvT15kvs0dIX2PXx84Xd+T7iv9pAg8hMsyGgl0pVSs02EAy+dgeBrrzz8hZcYe+kLTkkjxUu5wgc5uzBPwdLF2bydXbfQyppShqdC3IdhMjMAaaycd78chMUMZmPuq2BEXqUcapgQ3BxuRULSDWY4q3eApIZozOMzqgOxzhgsHS11+tQw9QUEUbBMjfrUTopJi+KjD0xs/lPWItC42uK7wU7X90p51hoPGabRo4K/lUYpXRpq9Qtah0+QBZaX1GI0MaBYhuwF6e7DlB6+mzEtJ3X293Q34j4XWwyxFeVn0aaRNMAx35i4JV1nAoVGQrDI/J50gGU5IIPPcUDZUzD4VFM4QKv1OVoAsghi9WlnQqk5amDX7LKIXoVbRn7UGIcmn1xJOrFkl5OfBJvorIoW2joD/XG7kOgD6EtA55LEScVXL9KpDeiG+xJ2Id4POIFOTaNagWgfcCdSfkF8WolqdnXDFI00URdiYtUiTDjpsQYFuZKuYILrQKDsHJdgRu38cwDPg3McI5WlZR7/x270yCYI0Lqc6tUT6aGAlVm6TIhqnvDSeGvr6EisbZmHQseSO7ar3w+rMSq2fGLr1i0P3QACe53gUTJ3C/G3npxUMKnN0rSXCQomfJhh0cFOGpC8hslGdP94ygPdmVTH0vn3HvOyLV0km5Pnw/w5guue/MAPAmLg+qTfI0tKK799z623aVqLHo7pQ5qmCYjhaHd5pEU3lwaGNHojfhP6sjX7Rk+MWD2+gKYNGfmALnhkX7mnGFI10xwyBvj72aun0fZMYNxsoKaH0QJimMvXn4ORv6gw0pAsYaxw/WdaASmILcRwwSggBUuOn1KyWJ4JlxPh6gPJW8ysWYUCrLW/0/w7XsUwx/6tV57bWZ/a+x3wSvZ/gaHAbzPrk9Xt7z2Y6t+dQ1iFJz6a+Gj833bQXynhvvAtkW6zfmbtWroxkAtsDPAFlpvWN0qWkZVkLeZVW9GgO+95Ks47H9M9WnddGIqTLbgENB4yh0zB/RcT598drhlUp5XlBe/Jro1FdbhhR26mu0ZHJwF2bIjFV+jtyZmg/+CGzffR7nRgTdowg7g/MNmh+HyKz+/f5dSq+i38tbW2fs7X2mr5BbXWHD/i/eHbN22icMfISiw9sYI1+MrwBrzLaPfN0aFORJ+vtWXNxOdV3efTVbc867f8+C3wqsXnx6X5b4YUY814nGNgZGBgAGIt49i8eH6brwzcLAwgcMN072wE/b+GhYW5GcjlYGACiQIACaYJtgB4nGNgZGBgbvjfwBDDAmT9/8vCwgCkUYApAHJLBJ8AAHicY2FgYGChFWakodl4MABauwDWAAAAAABEAIAAxAEaAXABfgGeAaoB1AH0AmYC1gNAA6ID9AQuBHQE0AV0BboGDAYsB2QIRgluCegKCAp2CvoLKAtcC54L1gxEDI4MugzsDSoNdg3EDgYORA6GDtAO+A9yD7gQAhBwEMQRIBGueJxjYGRgYDBluMggyAACTEDMBYQMDP/BfAYAI9ECLgB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxtUoly2jAQ9Usa5OBgkjRJ7/tOekFD/0eADxlXwhEaL/76rmwoQ6aakebte7ur3ZWCg6Bb/eD/a4IDHOIBjtCDQIhj9BHhBAPEGOIUZzjHQ1zgEld4hMd4gqd4hud4gZd4hdd4g7d4h/f4gI/4hM/4gmvc4Cu+4Tt+4CdGGOMXbjHB70DMldS5k6KWd1rpLLa5K9zCZVKVUpOwuXGVorDJpV5IRedW6kJJw1uvjGucocEGW3bJ7juQkhSuVMtRxO5bPkpdzZlTOXV02uEuAesUd4QP9uawLSpLdNbkfNBgzZWujc7aaGHdbJZY25tzeHJ3lrFQuKk0ZcIZ2P2yZqF0phP+sdtO99irbep9WqR+Sor6Kzfl5haORjs43sHbHZzszWUdL1XJdtbpdFKoyumNcTQrjU3Cht39ZdEsd6VqcuMvrk0qeRKiclJzs8dzqVqZIkaFSvwDUZ+x5dEs2ZF8RkXDRs19K1z/yieK60T9aaXWFJYL48cLfZ8Z02Ip1dS/uK+S40WTt/ZhVVG40ca91DHNRXBmvyncfB//QVqXkajbkVEQ/AWL3/CZAAAA') format('woff'),
    url('./font/iconfont.ttf?t=1544527003819') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('./font/iconfont.svg?t=1544527003819#iconfont') format('svg'); /* iOS 4.1- */
  }
  .s-icon {
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    speak: none;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;

    &-fill {
      width: 30px;
      height: 30px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #fff;
      border-radius: 3px;
    }

    &-sm {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
    }

    &-loading:before {
      content: '';
      border-radius: 50%;
      border-bottom: 1px solid #fff;
      width: 1em;
      height: 1em;
    }

    &-info {
      transform: rotate(180deg);
    }

    &-info:before {
      content: "\e765";
    }

    &-dianhua:before { content: "\e642"; }

    &-warning:before { content: "\e765"; }

    &-shujukugailanx:before { content: "\e774"; }

    &-shouqix:before { content: "\e77f"; }

    &-zhankaix:before { content: "\e780"; }

    &-sanjiaojiantouzuox:before { content: "\e7ac"; }

    &-jiantoushangx:before { content: "\e7ad"; }

    &-sanjiaojiantouxiax:before { content: "\e7ae"; }

    &-tianjiax:before { content: "\e7af"; }

    &-zuojiantoux:before { content: "\e7b0"; }

    &-fuwuqifabux:before { content: "\e7b2"; }

    &-fuwuqishangxianx:before { content: "\e7b3"; }

    &-fuwuqixiaxianx:before { content: "\e7b4"; }

    &-shujugengzhengx:before { content: "\e7b5"; }

    &-yingyongfabux:before { content: "\e7b6"; }

    &-success:before { content: "\e7bb"; }

    &-danger:before { content: "\e7bd"; }

    &-gongjubaoleixingx:before { content: "\e7ba"; }

    &-wangluogongjuleixingx:before { content: "\e7bc"; }

    &-shujukugongjuleixingx:before { content: "\e7be"; }

    &-yingyonggongjuleixingx:before { content: "\e7bf"; }

    &-fanhuix:before { content: "\e7c0"; }

    &-tubiaokux:before { content: "\e7c1"; }

    &-tubiaokux1:before { content: "\e7c2"; }

    &-tubiaokux2:before { content: "\e7c3"; }

    &-tubiaokux3:before { content: "\e7c4"; }

    &-tubiaokux4:before { content: "\e7c5"; }

    &-tubiaokux5:before { content: "\e7c6"; }

    &-jiantoushangy:before { content: "\e7d0"; }

    &-piliangtubiaox:before { content: "\e7d2"; }

    &-jiquntubiaox:before { content: "\e7d3"; }

    &-close:before { content: "\e7d8"; }

    &-zantingx:before { content: "\e7db"; }

    &-chulizhongx:before { content: "\e7dc"; }

    &-wofaqix:before { content: "\e7dd"; }

    &-quanbux:before { content: "\e7de"; }

    &-daichulix:before { content: "\e7df"; }

    &-daijieshoux:before { content: "\e7e0"; }

    &-daishenpix:before { content: "\e7e1"; }

    &-xiaoxix:before { content: "\e7e2"; }

    &-zidingyixitongx:before { content: "\e7e3"; }

    &-weimiaoxitongx:before { content: "\e7e4"; }

    &-sousuox:before { content: "\e7f1"; }

    &-gonggaox:before { content: "\e7f2"; }

    &-paibanx:before { content: "\e7f3"; }

    &-lianxix:before { content: "\e7f6"; }

    &-zhibanx:before { content: "\e7f7"; }

    &-qqx:before { content: "\e7f8"; }

    &-paibanx2:before { content: "\e7f9"; }

    &-fuzhix:before { content: "\e7fa"; }

    &-dingdingx:before { content: "\e7fb"; }

    &-dianhuax:before { content: "\e7fc"; }

    &-zhibanx1:before { content: "\e7fd"; }

    &-weixinx:before { content: "\e7fe"; }

  }
</style>

<style>
  @import "./font/iconfont.css";
</style>
