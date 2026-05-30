import { Log } from './src/index';

Log.section('Login flow');
Log.navigate('https://example.com/login');
Log.ok('Page loaded');
Log.kv('User', 'test@example.com');

Log.section('Assertions');
Log.check('Redirected to dashboard', true);
Log.check('Welcome message visible', true);
Log.check('Logout button present', false, 'element not found after 5s');

Log.section('Style parity');
Log.diff('font-size',   '14px', '14px', true);
Log.diff('font-weight', '500',  '400',  false);
Log.diff('color',       'rgb(0,0,0)', 'rgb(51,51,51)', false);

Log.section('Summary');
Log.table('Results', [
  { test: 'Login redirects',     pass: true  },
  { test: 'Welcome message',     pass: true  },
  { test: 'Logout button',       pass: false },
  { test: 'Font weight matches', pass: false },
]);

Log.warn('2 assertions failed — see above');
