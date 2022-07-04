export function ago (s) {
  const now = new Date();
  let d = new Date(Date.parse(s))
  let yAgo = new Date(now);
  yAgo.setFullYear(now.getFullYear()-1);
  
  // console.log(yy)
  if (yy) return `${yy} year${yy>1?"s":""} ago`;
  let mm = now.getMonth()
  return s;
}