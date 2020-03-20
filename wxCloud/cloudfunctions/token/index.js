// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
const access_token = require('AccessToken');//引入AccessToken类
cloud.init()
let appid ='wx178113d8e30063a2';
let secret ='34a5177d446625cb55c440111d0ed9cd';
// 云函数入口函数
exports.main = async (event, context) => {
  let at = new access_token({
    appid,
    secret
  });
  return at.getCachedWechatAccessToken();
}