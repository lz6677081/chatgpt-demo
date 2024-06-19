// src/global.js
export let deny_ip = ''
export let deny_num = 0
export function updateDenyIp(new_value) {
  // 在这里更新deny_ip的值,例如:
  deny_ip = new_value
  return deny_ip
}
export function updateDenyNum() {
  deny_num = deny_num + 1
  if (deny_num > 99999)
    deny_num = 0
  return deny_num
}
