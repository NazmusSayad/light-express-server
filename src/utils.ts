import { networkInterfaces } from 'os'

export function getNetworks() {
  const networks: { name: string; address: string }[] = []

  const networkEntries = Object.entries(networkInterfaces())
  for (const [key, addresses] of networkEntries) {
    const ipv4 = addresses?.find((x) => x.family === 'IPv4')
    ipv4 && networks.push({ name: key, address: ipv4.address })
  }

  return networks
}
