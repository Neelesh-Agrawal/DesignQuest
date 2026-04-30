/**
 * Browser calls to Anthropic must send anthropic-dangerous-direct-browser-access.
 * Claude 4 models may use extended thinking by default; a low max_tokens (e.g. 300) then
 * fails validation (thinking budget vs max_tokens). We disable thinking for these short UI calls.
 *
 * Override model: VITE_ANTHROPIC_MODEL (e.g. claude-haiku-4-5)
 */

const API_BASE = 'https://api.anthropic.com/v1/messages';

export function getAnthropicApiKey() {
  return (import.meta.env.VITE_ANTHROPIC_API_KEY || '').trim();
}

/** Default to current Sonnet alias; avoid deprecated snapshot IDs if your key rejects them. */
export function getAnthropicModel() {
  return (import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-sonnet-4-5').trim();
}

/**
 * @param {string} prompt
 * @param {number} [maxTokens=1024]
 * @returns {Promise<string>} Assistant text (empty if none)
 */
export async function createMessage(prompt, maxTokens = 1024) {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    throw new Error('Missing VITE_ANTHROPIC_API_KEY');
  }

  const model = getAnthropicModel();
  const baseBody = {
    model,
    max_tokens: maxTokens,
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: prompt }],
      },
    ],
  };

  /** Claude 4: disable extended thinking so small max_tokens stays valid (see Anthropic extended-thinking docs). */
  const tryBodies = [
    { ...baseBody, thinking: { type: 'disabled' } },
    baseBody,
  ];

  let res;
  let data;
  for (let i = 0; i < tryBodies.length; i++) {
    const body = tryBodies[i];
    res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify(body),
    });
    data = await res.json().catch(() => ({}));
    if (res.ok) break;
    if (res.status !== 400) break;
    if (i === tryBodies.length - 1) break;
  }

  if (!res.ok) {
    const msg =
      data?.error?.message ||
      data?.message ||
      (typeof data?.error === 'string' ? data.error : null) ||
      res.statusText ||
      'Anthropic request failed';
    const err = new Error(msg);
    err.status = res.status;
    err.body = data;
    throw err;
  }

  const textBlock = data.content?.find((b) => b.type === 'text');
  return textBlock?.text || '';
}
