export default function parseNum(s, dot) {
    var m = Math.pow(10, dot || 2);
    var k = Math.round(parseFloat(s) * m);
    return k / m;
};

export { parseNum };