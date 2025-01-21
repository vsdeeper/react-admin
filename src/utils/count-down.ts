/**
 * 简易倒计时
 * @param seconds 倒计时总秒数
 * @param change 每秒变化时的回调
 * @param done 倒计时完成时的回调
 */
export function countDown(
  seconds: number,
  change: (seconds: number) => void,
  done?: () => void
) {
  const timer = setInterval(() => {
    if (seconds--) change(seconds);
    else {
      if (done) done();
      clearInterval(timer);
    }
  }, 1000);
}
