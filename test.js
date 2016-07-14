import test from 'tapava';
import resolveNpmVersion from './lib/index';

test('dist-tag', t => {
  const pkg = {
    'dist-tags': {
      latest: '1.0.0'
    },
    'versions': {
      '2.0.0-beta1': {
        version: '2.0.0-beta1'
      },
      '1.0.0': {
        version: '1.0.0'
      },
      '0.5.0': {
        version: '0.5.0'
      },
      '0.5.1': {
        version: '0.5.1'
      }
    }
  };
  const actual = resolveNpmVersion(pkg, 'latest');
  const expected = {version: '1.0.0'};
  t.deepEqual(actual, expected);
});

test('version', t => {
  const pkg = {
    versions: {
      '1.0.0': {
        version: '1.0.0'
      },
      '0.5.0': {
        version: '0.5.0'
      },
      '0.5.1': {
        version: '0.5.1'
      }
    }
  };
  const actual = resolveNpmVersion(pkg, '^0.5.0');
  const expected = {version: '0.5.1'};
  t.deepEqual(actual, expected);
});

test('unknown version', t => {
  const pkg = {
    versions: {
      '1.0.0': {
        version: '1.0.0'
      },
      '0.5.0': {
        version: '0.5.0'
      },
      '0.5.1': {
        versions: '0.5.1'
      }
    }
  };
  const actual = resolveNpmVersion(pkg, '^0.5.2');
  const expected = undefined;
  t.is(actual, expected);
});

test('unknown tag', t => {
  const pkg = {
    versions: {
      '1.0.0': {
        version: '1.0.0'
      },
      '0.5.0': {
        version: '0.5.0'
      },
      '0.5.1': {
        versions: '0.5.1'
      }
    }
  };
  const actual = resolveNpmVersion(pkg, 'none-existing-tag');
  const expected = undefined;
  t.is(actual, expected);
});
