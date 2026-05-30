# pw-log

Colourful Playwright test logger — structured console output with sections, diffs, tables and pass/fail checks.

```
──────────────
■ Login flow
──────────────
🌍 https://example.com/login
✅ Page loaded
 User : test@example.com

──────────────
■ Assertions
──────────────
✅ Redirected to dashboard
✅ Welcome message visible
❌ Logout button present — element not found after 5s

────────────────
■ Style parity
────────────────
✅ font-size                Expected: 14px → Actual: 14px
❌ font-weight              Expected: 500 → Actual: 400
❌ color                    Expected: rgb(0,0,0) → Actual: rgb(51,51,51)

────────────
■ Summary
────────────

📊 Results
┌─────────┬───────────────────────┬───────┐
│ (index) │ test                  │ pass  │
├─────────┼───────────────────────┼───────┤
│ 0       │ 'Login redirects'     │ true  │
│ 1       │ 'Welcome message'     │ true  │
│ 2       │ 'Logout button'       │ false │
│ 3       │ 'Font weight matches' │ false │
└─────────┴───────────────────────┴───────┘
⚠️  2 assertions failed — see above
```

---

## Install

```bash
npm install pw-log
# or
pnpm add pw-log
```

> **Peer dependency:** requires `chalk` v5+, which is installed automatically.

## Quick start

```ts
// In your Playwright test or page object:
import { Log } from 'pw-log';

test('login flow', async ({ page }) => {
  Log.section('Login flow');

  await page.goto('https://example.com/login');
  Log.navigate('https://example.com/login');

  await page.fill('#email', 'test@example.com');
  await page.click('button[type=submit]');

  const redirected = page.url().includes('/dashboard');
  Log.check('Redirected to dashboard', redirected);
});
```

## Usage

```ts
import { Log } from 'pw-log';

Log.section('Cart tests');
Log.info('Navigating to cart page');
Log.navigate('https://example.com/cart');
Log.ok('Cart loaded');
Log.warn('Discount code not applied');
Log.fail('Total mismatch');

Log.check('Price displays correctly', true);
Log.check('CTA is visible', false, 'element not found');

Log.diff('font-size', '14px', '16px', false);
Log.diff('color', 'rgb(0,0,0)', 'rgb(0,0,0)', true);

Log.kv('URL', 'https://example.com/cart');

Log.table('Results', [
  { test: 'Add to cart', pass: true },
  { test: 'Remove item', pass: false },
]);

Log.group('Computed styles', {
  fontSize: '14px',
  fontWeight: '500',
  color: 'rgb(0,0,0)',
});

Log.list('Locales tested', ['en-gb', 'en-us', 'de-de']);
```

## Silence in CI

```bash
LOG_LEVEL=silent npx playwright test
```

`warn` and `fail` always print regardless of `LOG_LEVEL`.

## License

MIT
