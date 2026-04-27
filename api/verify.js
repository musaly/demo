// 读取服务端兑换码文件（前端无法访问）
const validCodes = require('./codes.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false });
  }

  try {
    const { code } = req.body;
    // 服务端核对：5000个码毫秒级匹配
    const isValid = validCodes.includes(code?.trim());
    
    return res.status(200).json({ valid: isValid });
  } catch (error) {
    return res.status(200).json({ valid: false });
  }
}
