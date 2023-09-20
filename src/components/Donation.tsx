import { Show, createSignal, onMount } from 'solid-js'

interface InfoType { request_count: number, used_quota: number }

export default () => {
  const [info, setInfo] = createSignal<InfoType>({ request_count: 0, used_quota: 0 })
  const [show, setShow] = createSignal(0)

  onMount(async() => {
    getInfo()
  })

  const getInfo = async() => {
    const response = await fetch('/api/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJson = await response.json()
    if (responseJson.code === 200)
      setInfo(responseJson.data)
  }

  return (
    <div class="mt-2">
      <div onClick={() => { setShow(show() ? 0 : 1) }}>
        <p mt-1 text-sm op-60>
          <span>为了能持久运营,我们需要你的</span>
          <span class="border-1 px-2 py-1 mx-1 rounded-md transition-colors bg-slate/20 cursor-pointer hover:bg-slate/50">捐赠</span>
          <span>🙏🏻</span>
        </p>
        <Show when={show() === 1}>
          <div my-4>
            <span op-60>使用微信扫一扫</span>
            <img class="w-4/5 mt-2 max-w-[300px]" src="https://gzgptnb.oss-cn-guangzhou.aliyuncs.com/chatphp/202307/1690812533321.jpg" />
          </div>
        </Show>
        <p
          mt-1
          text-xs
          op-60
          w-full
          class={show() === 0 ? 'line-clamp-2' : ''}
        >感谢捐赠 <span gpt-subtitle text-xs>匿名x65,Wink,至此,Slug Cat,egabrag,郭超,小路人,苏安心,菲小羊x5,</span>nek0-3166z,Blur,I'm (a)Mason.,黄莲微苦,TEL,Hz.....哈哈, Komorebi.,Dream_chasing BOY,T,🌟人生路遥,欢喜,liver,グCrave,I'm fine!,思绪云骞,砖住,蘑菇菌,Gvelin9,心飞杨,Mustand🐴,小白白,时光清浅,Lucine,三明樣,化合物bwl,哈哈,说书人,Firefly,陈小猫🐱,是只乌鸦,HJ-blurred,初南十五,****#!,加号,二拾三,卖粉笔的黑皮,Asuka,Chuan,LLL,Chuan,六疯一,lily,半途而菲,Victoria,HJ-blurred,SfD,Slug Cat,Old six does evil,白日梦想家,羊驼,陈,Dulua,命若琴弦aliosha,Tifika非常想排练,世哲,Domingo(,grey,海东青,Tim.ding,重炮三角,2021.10.11,太空垃圾x2,扒拉拉小魔芋,浩劫余生,LKL,iiNotFound,H$,小青蛙,TT,D,大梦,192.168.0.1x2,花开富贵🌸,凌乱_,難唸的經,lll,我推研磨天下第一,顾锦,Su_XH,大饼,MBKB,Su-27,Slug Cat,蔡晨威,Z,SfD,北欢南依,云追月,曹昕宇,.,蒋文彬,H,Pacino,锦帘,rumia,步欲不諪,小狗凯,XCalico,H,神不隆東,顺风车🍃,天南地北,系雾阁,久有凌云志,星月弥天,192.168.0.1,M,Accelerator,宥季,RoR,Ss🧸,Chrissie,Y,koil,samuraidog,心碎土豆丝,灼逝年华 阿康,.,海洋,龙王,凡死了.,LKJ,会游泳的鱼,七弦万木,随便你,随便你,路西法,蒂和平,🤐,长安.,学习,燚焱川,朱沐,麦芒,Joe,Melody,狐翎,方源,🍊,Wu Qiqian,天生猴子必有用,王越泽,天气日记,我的喵.cn,暖暖,一人一,Yuang,头绿心黄大菠萝OvO,菲小羊,吕刑褶,MYBEA***ASY,学习,姜*凡,E*s,二*三,SK**小明,Li**He,我被**包围了,你你你,雷,太阳保安,达不溜,Fe*ix,我叫孔子,neko**6z,巉巉,【那一段回忆、*】,缥缈,我在故我思,贰拾叁かい,zzzzy,Axis,腥白吆,C-c.减少期待,SD,Eurek4,哈哈,夏之星,chopsticks0253,I'm fine!,菲小羊,云,乏味,玖玖Rae
        </p>
        <p mt-2 op-60 class={show() === 0 ? 'hidden' : ''} text-xs>感谢B站UP主:叫憨子吧,木木子灵的推荐</p>

        <Show when={info().request_count > 0}>
          <p mt-3 text-xs op-60>共处理{info().request_count}次,消耗{(info().used_quota / 1000).toFixed(1)}K≈${(info().used_quota / 500000).toFixed(1)} token</p>
        </Show>
      </div>
      <Show when={show() === 1}>
        <div>

          <div mt-2 op-60>
            感谢您的支持! <br />
            发送任意内容到 <a gpt-subtitle text-sm href="mailto:free2gpt@gmail.com">free2gpt@gmail.com</a> 可订阅最新地址<br />
            联系我们: <a gpt-subtitle text-sm href="mailto:free2gpt@gmail.com">free2gpt@gmail.com</a>
          </div>

          <button onClick={() => { setShow(0) }} class="w-1/3 h-12 mt-2 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 rounded-sm">
            关闭
          </button>
        </div>
      </Show>

    </div>
  )
}
