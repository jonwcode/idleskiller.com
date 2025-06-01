const IP_ADDR = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress;

export default IP_ADDR;
