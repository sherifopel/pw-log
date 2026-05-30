/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chalk } from 'chalk';

// Construct with explicit level=3 (truecolor) so GitHub Actions CI renders colours correctly.
const chalk = new Chalk({ level: 3 });

type Row = Record<string, string | number | boolean | null | undefined>;

// Set LOG_LEVEL=silent to suppress ok/info/navigate/section output (e.g. in CI).
// warn and fail always print regardless.
const silent = process.env.LOG_LEVEL === 'silent';

export const Log = {
  section(title: string) {
    if (silent) return;
    const line = '─'.repeat(Math.max(12, title.length + 4));
    console.log('\n' + chalk.cyanBright(line) + '\n' + chalk.bold.white(`■ ${title}`) + '\n' + chalk.cyanBright(line));
  },

  kv(label: string, value: any) {
    const key = chalk.rgb(255, 165, 0)(label.padEnd(5, ' '));
    const val = chalk.whiteBright(value ?? '');
    console.log(` ${key}: ${val}`);
  },

  info(msg: string) {
    if (silent) return;
    console.log(chalk.grey(`ℹ️  ${msg}`));
  },

  ok(msg: string) {
    if (silent) return;
    console.log(chalk.grey(`✅ ${msg}`));
  },

  warn(msg: string) {
    console.log(chalk.yellow(`⚠️  ${msg}`));
  },

  fail(msg: string) {
    console.log(chalk.redBright(`❌ ${msg}`));
  },

  table(title: string, rows: Row[]) {
    if (!rows.length) return;
    console.log(chalk.bold.blue(`\n📊 ${title}`));
    console.table(rows);
  },

  navigate(msg: string) {
    if (silent) return;
    console.log(chalk.grey.bold(`🌍 ${msg}`));
  },

  check(name: string, pass: boolean, extra: string = '') {
    const symbol = pass ? chalk.greenBright('✅') : chalk.redBright('❌');
    const label = chalk.white(name);
    const info = extra ? chalk.gray(` — ${extra}`) : '';
    console.log(`${symbol} ${label}${info}`);
  },

  diff(label: string, expected: string | number, actual: string | number, pass: boolean) {
    const symbol = pass ? chalk.greenBright('✅') : chalk.redBright('❌');
    const lbl = chalk.white(label.padEnd(25, ' '));
    const exp = chalk.gray(`Expected: ${expected}`);
    const act = pass ? chalk.green(`Actual: ${actual}`) : chalk.redBright(`Actual: ${actual}`);
    console.log(`${symbol} ${lbl}${exp} → ${act}`);
  },

  list(title: string, lines: Array<string | number>) {
    const line = '─'.repeat(Math.max(12, title.length + 4));
    console.log('\n' + chalk.cyanBright(line) + '\n' + chalk.rgb(255, 165, 0)(`${title}`) + '\n' + chalk.cyanBright(line));
    for (const l of lines) console.log(`• ${chalk.white(String(l))}`);
  },

  raw(msg: string) {
    process.stdout.write(msg + '\n');
  },

  group(title: string, rows: Record<string, string | number | boolean>) {
    const line = '─'.repeat(Math.max(12, title.length + 4));
    console.log('\n' + chalk.cyanBright(line) + '\n' + chalk.bold.white(`▸ ${title}`) + '\n' + chalk.cyanBright(line));
    for (const [k, v] of Object.entries(rows)) {
      const key = chalk.rgb(255, 165, 0)(k.padEnd(20, ' '));
      const val = chalk.whiteBright(String(v));
      console.log(`  ${key} ${val}`);
    }
  },
};
