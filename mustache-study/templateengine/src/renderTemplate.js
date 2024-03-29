/*
*  函数的功能是让tokens数组变为dom字符串
*/
import lookup from './lookup.js';
import parseArray from './parseArray.js';
export default function renderTemplate(tokens, data) {
  // console.log(tokens, data);
  let resultStr = '';
  // 结果字符串
  // 遍历tokens
  for(let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    // 看类型
    if(token[0] == 'text') {
      resultStr += token[1];
    } else if (token[0] == 'name') {
      // 如果是name类型，那么就直接使用它的值，当然要用lookup
      // 因为防止这里是"a.b.c"有点的形式
      resultStr += lookup(data, token[1]);
    } else if (token[0] == '#') {
      // 递归，解析下一层
      resultStr += parseArray(token, data);
    }
  }
  return resultStr;
}