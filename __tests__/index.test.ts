import { exec } from 'child_process';

const cli = (command: string, cwd: string) =>
  new Promise<{ stdout: string }>((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout });
    });
  });

test('cli integration test', () => {
  const script = 'src/bin/getdiff.ts';
  const before = '__tests__/__fixtures__/before.json';
  const after = '__tests__/__fixtures__/after.json';
  return cli(`npm run ts-node -- ${script} ${before} ${after}`, '.').then(({ stdout }) => {
    expect(stdout.length).toBeGreaterThan(0);
  });
});
