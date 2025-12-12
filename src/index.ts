/**
 * CSS Minifier
 * Minify CSS code
 *
 * Online tool: https://devtools.at/tools/css-minifier
 *
 * @packageDocumentation
 */

function beautifyCss(css: string, indentSize: number = 2): string {
  let beautified = css;
  const indent = ' '.repeat(indentSize);

  // First minify to normalize
  beautified = minifyCss(beautified);

  // Add newlines after opening braces
  beautified = beautified.replace(/{/g, ' {\n');

  // Add newlines after closing braces
  beautified = beautified.replace(/}/g, '\n}\n');

  // Add newlines and semicolons after properties
  beautified = beautified.replace(/;/g, ';\n');

  // Add space after colon in properties
  beautified = beautified.replace(/:/g, ': ');

  // Clean up multiple newlines
  beautified = beautified.replace(/\n\s*\n/g, '\n');

  // Indent properties
  const lines = beautified.split('\n');
  let indentLevel = 0;
  const indentedLines = lines.map(line => {
    line = line.trim();
    if (!line) return '';

    // Decrease indent before closing brace
    if (line.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const indentedLine = indent.repeat(indentLevel) + line;

    // Increase indent after opening brace
    if (line.endsWith('{')) {
      indentLevel++;
    }

    return indentedLine;
  });

  return indentedLines.join('\n').trim();
}

function calculateSavings(original: string, minified: string): {
  originalSize: number;
  minifiedSize: number;
  savedBytes: number;
  savedPercent: number;
} {
  const originalSize = new Blob([original]).size;
  const minifiedSize = new Blob([minified]).size;
  const savedBytes = originalSize - minifiedSize;
  const savedPercent = originalSize > 0 ? (savedBytes / originalSize) * 100 : 0;

  return { originalSize, minifiedSize, savedBytes, savedPercent };
}

// Export for convenience
export default { encode, decode };
