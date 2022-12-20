function countTo({ startVal = 0, endVal, duration = 3000, timestamp = 0, callback }) {
  if (endVal === undefined) throw new Error('missing parameter "endVal" ')
  const easingFn = (t, b, c, d) => (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
  const fn = (s) => countTo({ startVal, endVal, duration, timestamp: s, callback })

  let printVal = 0
  if (startVal < endVal) {
    printVal = easingFn(timestamp, startVal, endVal - startVal, duration)
  } else {
    printVal = startVal - easingFn(timestamp, 0, startVal - endVal, duration)
  }
  if (callback) {
    callback(timestamp > duration ? endVal : parseInt(printVal))
  }
  if (timestamp < duration) {
    window.requestAnimationFrame(fn)
  }
}
countTo({
  startVal: 0,
  endVal: 100,
  duration: 2600,
  callback(val) {
    console.log(val);
  }
})