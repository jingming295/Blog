import { createHash } from 'crypto';

export class SHA256 {
  async hashPassword(password: string) {
    if (!password) {
      throw new Error("Password cannot be empty");
    }
    const hash = createHash('sha256');
    hash.update(password);

    const hashHex = hash.digest('hex');
    return hashHex;
  }
}
