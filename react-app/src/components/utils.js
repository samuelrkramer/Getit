import humanizeDuration from 'humanize-duration';

export function ago (s) {
  const now = new Date();
  const date = new Date(Date.parse(s))

  console.log(humanizeDuration(now-date));
  // const months = [31,28+!(now.getFullYear()%4)-!(now.getFullYear()%100)+!(now.getFullYear()%1000),31,30,31,30,31,31,30,31,30,31]

  // const diff = {
  //   yr: now.getFullYear()-date.getFullYear(),
  //   mo: now.getMonth()-date.getMonth(),
  //   d: now.getDate()-date.getDate(),
  //   h: now.getHours()-date.getHours(),
  //   m: now.getMinutes()-date.getMinutes(),
  //   s: now.getSeconds()-date.getSeconds(),
  // }

  // if (diff.s<0) {
  //   diff.s += 60;
  //   diff.m--;
  // }
  // if (diff.m<0) {
  //   diff.m += 60;
  //   diff.h--;
  // }
  // if (diff.h<0) {
  //   diff.h += 24;
  //   diff.d--;
  // }
  // if (diff.d<0) {
  //   diff.d += months[now.getMonth()+1];
  //   diff.mo--;
  // }
  // if (diff.mo<0) {
  //   diff.mo += 12;
  //   diff.yr--;
  // }

  // // let yAgo = new Date(now);
  // // yAgo.setFullYear(now.getFullYear()-1);
  
  // // console.log(yy)
  // console.log(diff)
  // if (diff.yr) return `${diff.yr} year${diff.yr>1?"s":""} ago`;
  // let mm = now.getMonth()
  return s;
}