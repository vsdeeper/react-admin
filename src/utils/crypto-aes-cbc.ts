import CryptoJS from 'crypto-js'

/**
 * 生成aes密钥
 * @param bit 多少位
 * @returns
 */
export const genAesKey = (bit?: number) => {
  // 生成一个128位的AES密钥
  const key = CryptoJS.lib.WordArray.random((bit ?? 128) / 8)

  // 将密钥转换为字符串形式
  const keyString = CryptoJS.enc.Hex.stringify(key)

  return keyString
}

/**
 * aes加密
 * @param msg 加密密文
 * @param key aes对称加密的密钥，必须是16长度，为了和后端交互key字符串必须是16进制字符串，否在给golang进行string -> []byte带来困难
 */
export const aseCbcEncrypt = (msg: string, key: string) => {
  const _key = CryptoJS.enc.Utf8.parse(
    PaddingLeft(key, 16) /** 保证key的长度为16byte，进行'0'补位) */
  )
  // 加密结果返回的是CipherParams object类型
  // key 和 iv 使用同一个值
  const encrypted = CryptoJS.AES.encrypt(msg, _key, {
    iv: _key,
    mode: CryptoJS.mode.CBC, // CBC算法
    padding: CryptoJS.pad.Pkcs7 // 使用pkcs7 进行padding 后端需要注意
  })
  // ciphertext是密文,toString()内传编码格式,比如Base64,这里用了16进制
  // 如果密文要放在 url的参数中 建议进行 base64-url-encoding 和 hex encoding, 不建议使用base64 encoding
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex) // 后端必须进行相反操作
}

/**
 * aes解密
 * @param msg 需要被对称加密的明文
 * @param key aes对称加密的密钥，必须是16长度，为了和后端交互，key字符串必须是16进制字符串，否在给golang进行string -> []byte带来困难
 */
export const aesCbcDecrypt = (msg: string, key: string) => {
  const _key = CryptoJS.enc.Utf8.parse(
    PaddingLeft(key, 16) /** 保证key的长度为16byte,进行'0'补位 */
  )
  const _msg = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(msg))
  // key 和 iv 使用同一个值
  const encrypted = CryptoJS.AES.decrypt(_msg, _key, {
    iv: _key,
    mode: CryptoJS.mode.CBC, // CBC算法
    padding: CryptoJS.pad.Pkcs7 // 使用pkcs7 进行padding 后端需要注意
  })
  return encrypted.toString(CryptoJS.enc.Utf8) // 后端必须进行相反操作
}

/**
 * 确保key的长度,使用 0 字符来补位
 * length 建议 16 24 32
 * @param key
 * @param length
 */
function PaddingLeft(key: string, length: number) {
  let pkey = key.toString()
  const l = pkey.length
  if (l < length) {
    pkey = new Array(length - l + 1).join('0') + pkey
  } else if (l > length) {
    pkey = pkey.slice(length)
  }
  return pkey
}
