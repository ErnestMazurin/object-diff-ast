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

test('cli app test', () => {
  const script = 'src/bin/getdiff.ts';
  const before = '__tests__/__fixtures__/before.json';
  const after = '__tests__/__fixtures__/after.json';
  return cli(`npm run ts-node -- ${script} ${before} ${after} -f plain`, '.').then(({ stdout }) => {
    const total = stdout.match(/Property/g);
    expect(total).toHaveLength(6);

    const updated = stdout.match(/updated/g);
    expect(updated).toHaveLength(4);

    const removed = stdout.match(/removed/g);
    expect(removed).toHaveLength(1);

    const added = stdout.match(/added/g);
    expect(added).toHaveLength(1);
  });
});
