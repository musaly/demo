// 仅在服务端运行，兑换码从环境变量读取，绝不硬编码、不泄露
export default async function handler(req, res) {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ valid: false });
    }

    try {
        const { code } = req.body;
        // 从 Vercel 环境变量读取合法兑换码（支持多个，逗号分隔）
        const validCodes = process.env.VALID_CODES.split(',');
        
        // 服务端核对，只返回结果
        const isValid = validCodes.includes(code);
        return res.status(200).json({ valid: isValid });
    } catch (error) {
        return res.status(200).json({ valid: false });
    }
}
