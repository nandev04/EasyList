export default function formatIp(ip?: string) {
  return ip?.replace('::ffff:', '');
}
