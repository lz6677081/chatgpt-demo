import { createSignal, onMount } from 'solid-js'
export default () => {
  onMount(async() => {
    // getCount()
    getRealTime()
  })
  const [online, setOnline] = createSignal(0)
  const [lastMonth, setLastMonth] = createSignal(0)
  const getCount = async() => {
    const response = await fetch('/api/count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const countResponseJson = await response.json()
    setLastMonth(countResponseJson?.results?.visitors?.value)
  }
  const getRealTime = async() => {
    const response = await fetch('/api/realtime', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const RealTimeResponseJson = await response.json()
    setOnline(RealTimeResponseJson)
  }
  return (
    <footer>
      <div mt-6 text-xs>
        <div op-60>完全免费 无需魔法 无需登录 😎</div>
        <div op-60>为了更好的满足大家的AI需求,本站点已升级为理解能力更强的gemini-pro 😎</div>
        <div mt-2 op-60>收藏不迷路: <a href="https://freegpts2.aifree.site" class="gpt-subtitle text-xs" target="_blank" rel="noreferrer">https://freegpts2.aifree.site</a></div>
        <div mt-2 op-60>中转地址: <span class="gpt-subtitle text-xs" >https://nav.aifree.site</span></div>
        <div mt-2><a target="_blank" class=" gpt-subtitle text-xs" href="https://chat11.aichats.site" rel="noreferrer">赞助商: 体验GPT4(已支持gpt-4o)点击进入</a>😎</div>
        <div mt-2><a target="_blank" class=" gpt-subtitle text-xs" href="https://claude.aichats.site" rel="noreferrer">赞助商: 体验claude3(已支持claude-3-opus)点击进入</a>😎</div>
      </div>
      <div mt-6 text-xs>
        {/* <div op-60>当前在线人数:{online()}</div>
        <div op-60>近三个月访问人数:{lastMonth()}</div> */}
        <div op-60>问题反馈:<a gpt-subtitle="" text-sm="" href="mailto:wanglihong996@gmail.com">wanglihong996@gmail.com</a></div>
      </div>
    </footer>
  )
}
