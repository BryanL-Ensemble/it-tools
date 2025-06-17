import { describe, expect, it } from 'vitest';
import { decompress } from './gzip-decompressor.service';
import testPayloads from './response.json';

describe('decompress', () => {
  it('correctly decompresses player1 payload', async () => {
    const result = await decompress(testPayloads.data.player1.payload);
    expect(result).toContain('__typename');
  });

  it('correctly decompresses player2 payload', async () => {
    const result = await decompress(testPayloads.data.player2.payload);
    expect(result).toContain('"__typename":"ShotDetails"');
  });

  it('throws error on invalid base64 string', async () => {
    await expect(() =>
      decompress('not-a-valid-gzip-base64'),
    ).rejects.toThrow();
  });
});
