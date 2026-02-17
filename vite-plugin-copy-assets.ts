import { Plugin } from 'vite';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import path from 'path';

export function copyAssetsPlugin(): Plugin {
  return {
    name: 'copy-assets',
    closeBundle() {
      const sourceDir = path.resolve(import.meta.dirname, 'attached_assets');
      const targetDir = path.resolve(import.meta.dirname, 'dist', 'assets');

      // Create target directory
      mkdirSync(targetDir, { recursive: true });

      // Copy all files from attached_assets to dist/assets
      function copyRecursive(src: string, dest: string) {
        const files = readdirSync(src);

        for (const file of files) {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file);
          const stat = statSync(srcPath);

          if (stat.isDirectory()) {
            mkdirSync(destPath, { recursive: true });
            copyRecursive(srcPath, destPath);
          } else {
            copyFileSync(srcPath, destPath);
            console.log(`Copied: ${file} -> dist/assets/`);
          }
        }
      }

      copyRecursive(sourceDir, targetDir);
      console.log('✅ Assets copied successfully!');
    }
  };
}
