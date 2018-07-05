import * as path from 'path'
//配置文件
const config = {
    //token加密密钥
    secret: '666cdec0-0b05-4ac1-a01c-45530317f49c',
    //token过期时间,7天
    expiresIn: '7d',
    //小程序AppID
    appID: 'wx6e564de8b33a0a78',
    //小程序AppSecret密钥
    appSecret: '',
    //商户号
    mch_id: '1501796621',
    //商户密钥
    mch_key: '',
    //测试用
    openid: 'oGNbS5CZWRt2pUR1TJivONVjxs2k',
    //文件上载的目录
    uploadDir: path.join(__dirname, '..', '..', 'temp'),
    //静态文件目录
    static: path.join(__dirname, '..', '..', 'upload'),
    //水印
    watermark: path.join(__dirname, '..', '..', 'sy.png')
}

export default config