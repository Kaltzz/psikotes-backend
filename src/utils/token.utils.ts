import crypto from 'crypto'

export function generateTestToken(length = 5) {
  return crypto
    .randomBytes(length)
    .toString('hex')
    .toUpperCase()   // opsional, biar enak dibaca
}