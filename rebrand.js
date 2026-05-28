import fs from 'fs';
import path from 'path';
import readline from 'readline';

// ANSI escape codes for styling
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m"
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      env[match[1]] = value.trim();
    }
  });
  return env;
}

function writeEnv(filePath, envObj) {
  let content = '';
  for (const [key, val] of Object.entries(envObj)) {
    content += `${key}=${val}\n`;
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.gemini') {
        walkDir(fullPath, callback);
      }
    } else {
      callback(fullPath);
    }
  }
}

const allowedExtensions = ['.js', '.jsx', '.html', '.css', '.json', '.md', '.env', '.txt', '.jsmap'];
const isAllowedFile = (filePath) => {
  const ext = path.extname(filePath);
  const base = path.basename(filePath);
  return base === '.env' || allowedExtensions.includes(ext);
};

const kebabCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const getBrandPrefix = (brandName) => {
  return brandName.split(' ')[0];
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#",""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
  
  const clamp = (val) => Math.max(0, Math.min(255, val));
  return "#" + (0x1000000 + clamp(R)*0x10000 + clamp(G)*0x100 + clamp(B)).toString(16).slice(1);
}

async function main() {
  console.log(`\n${colors.magenta}${colors.bright}===========================================`);
  console.log(`          PORTFOLIO REBRAND PROTOCOL       `);
  console.log(`===========================================${colors.reset}\n`);

  const envPath = path.join(process.cwd(), '.env');
  const env = parseEnv(envPath);

  // Default parameters
  const currentBrandName = env.VITE_BRAND_NAME || 'ZenByte Labs';
  const currentBrandId = env.VITE_BRAND_ID || 'ZenByteLabs';
  const currentEmail = env.VITE_EMAIL || 'zenbytelabsofficial@gmail.com';
  const currentWhatsapp = env.VITE_WHATSAPP || '916374066541';
  const currentWhatsappDisplay = env.VITE_WHATSAPP_DISPLAY || '+91 63740 66541';

  // Load colors from index.css
  const indexCssPath = path.join(process.cwd(), 'src/index.css');
  let indexCssContent = '';
  if (fs.existsSync(indexCssPath)) {
    indexCssContent = fs.readFileSync(indexCssPath, 'utf8');
  }

  let currentLightPrimaryHex = '#0FA4AF';
  const lightMatch = indexCssContent.match(/:root\s*\{[^}]*--color-primary-rgb:\s*(\d+)\s+(\d+)\s+(\d+)/s);
  if (lightMatch) {
    currentLightPrimaryHex = rgbToHex(parseInt(lightMatch[1]), parseInt(lightMatch[2]), parseInt(lightMatch[3]));
  }

  let currentDarkPrimaryHex = '#00FFD1';
  const darkMatch = indexCssContent.match(/\.dark\s*\{[^}]*--color-primary-rgb:\s*(\d+)\s+(\d+)\s+(\d+)/s);
  if (darkMatch) {
    currentDarkPrimaryHex = rgbToHex(parseInt(darkMatch[1]), parseInt(darkMatch[2]), parseInt(darkMatch[3]));
  }

  // Ask questions
  const newBrandName = (await askQuestion(`Enter Brand Name [${colors.cyan}${currentBrandName}${colors.reset}]: `)).trim() || currentBrandName;
  const newBrandId = (await askQuestion(`Enter Brand ID (no spaces) [${colors.cyan}${currentBrandId}${colors.reset}]: `)).trim() || currentBrandId;
  const newEmail = (await askQuestion(`Enter Contact Email [${colors.cyan}${currentEmail}${colors.reset}]: `)).trim() || currentEmail;
  const newWhatsapp = (await askQuestion(`Enter WhatsApp Raw Number (e.g. 916374066541) [${colors.cyan}${currentWhatsapp}${colors.reset}]: `)).trim() || currentWhatsapp;
  const newWhatsappDisplay = (await askQuestion(`Enter WhatsApp Display String (e.g. +91 63740 66541) [${colors.cyan}${currentWhatsappDisplay}${colors.reset}]: `)).trim() || currentWhatsappDisplay;
  
  const updateColors = (await askQuestion(`Would you like to update the primary theme colors? (y/n) [${colors.cyan}n${colors.reset}]: `)).trim().toLowerCase() === 'y';
  
  let newLightPrimaryHex = currentLightPrimaryHex;
  let newDarkPrimaryHex = currentDarkPrimaryHex;
  
  if (updateColors) {
    newLightPrimaryHex = (await askQuestion(`Enter Light Theme Primary Color Hex [${colors.cyan}${currentLightPrimaryHex}${colors.reset}]: `)).trim() || currentLightPrimaryHex;
    newDarkPrimaryHex = (await askQuestion(`Enter Dark Theme Primary Color Hex [${colors.cyan}${currentDarkPrimaryHex}${colors.reset}]: `)).trim() || currentDarkPrimaryHex;
  }

  console.log(`\n${colors.yellow}${colors.bright}Pending Changes Summary:${colors.reset}`);
  console.log(`- Brand Name:      ${colors.green}${currentBrandName}${colors.reset} -> ${colors.green}${newBrandName}${colors.reset}`);
  console.log(`- Brand ID:        ${colors.green}${currentBrandId}${colors.reset} -> ${colors.green}${newBrandId}${colors.reset}`);
  console.log(`- Contact Email:   ${colors.green}${currentEmail}${colors.reset} -> ${colors.green}${newEmail}${colors.reset}`);
  console.log(`- WhatsApp Raw:    ${colors.green}${currentWhatsapp}${colors.reset} -> ${colors.green}${newWhatsapp}${colors.reset}`);
  console.log(`- WhatsApp Disp:   ${colors.green}${currentWhatsappDisplay}${colors.reset} -> ${colors.green}${newWhatsappDisplay}${colors.reset}`);
  if (updateColors) {
    console.log(`- Light Primary:   ${colors.green}${currentLightPrimaryHex}${colors.reset} -> ${colors.green}${newLightPrimaryHex}${colors.reset}`);
    console.log(`- Dark Primary:    ${colors.green}${currentDarkPrimaryHex}${colors.reset} -> ${colors.green}${newDarkPrimaryHex}${colors.reset}`);
  }

  const confirm = (await askQuestion(`\nApply these branding changes? (y/n) [${colors.cyan}n${colors.reset}]: `)).trim().toLowerCase();
  if (confirm !== 'y') {
    console.log(`\n${colors.red}Rebranding cancelled.${colors.reset}\n`);
    rl.close();
    return;
  }

  console.log(`\n${colors.cyan}Executing rebranding protocol...${colors.reset}`);

  // 1. Prepare branding strings replacement maps
  const replacements = [];

  // Helper to add mapping
  const addMapping = (oldVal, newVal) => {
    if (oldVal !== newVal) {
      replacements.push({ search: oldVal, replace: newVal });
    }
  };

  // Add specific mappings in descending order of length to prevent substring issues
  addMapping(currentEmail, newEmail);
  addMapping(currentWhatsappDisplay, newWhatsappDisplay);
  addMapping(currentWhatsapp, newWhatsapp);

  // Brand Name replacements
  addMapping(currentBrandName, newBrandName);
  addMapping(currentBrandName.toUpperCase(), newBrandName.toUpperCase());
  
  // Brand ID replacements
  addMapping(currentBrandId, newBrandId);
  addMapping(currentBrandId.toUpperCase(), newBrandId.toUpperCase());
  addMapping(currentBrandId.toLowerCase(), newBrandId.toLowerCase());
  addMapping(kebabCase(currentBrandId), kebabCase(newBrandId));

  // Brand Prefix replacements
  const currentPrefix = getBrandPrefix(currentBrandName);
  const newPrefix = getBrandPrefix(newBrandName);
  addMapping(currentPrefix, newPrefix);
  addMapping(currentPrefix.toLowerCase(), newPrefix.toLowerCase());
  addMapping(currentPrefix.toUpperCase(), newPrefix.toUpperCase());

  // Additional edge-cases
  addMapping(currentBrandId + '_Vanguard', newBrandId + '_Vanguard');

  let filesUpdated = 0;

  // Process all project files
  walkDir(process.cwd(), (filePath) => {
    if (!isAllowedFile(filePath)) return;
    
    // Do not modify rebrand.js itself
    if (filePath === path.join(process.cwd(), 'rebrand.js')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Apply replacements
    replacements.forEach(({ search, replace }) => {
      // Use split and join for simple global replacement
      content = content.split(search).join(replace);
    });

    // Special handling for index.css colors if requested
    if (filePath === indexCssPath) {
      if (updateColors) {
        // Replace RGB variables
        const lightRgb = hexToRgb(newLightPrimaryHex);
        if (lightRgb) {
          content = content.replace(
            /(--color-primary-rgb:\s*)\d+\s+\d+\s+\d+/g,
            `$1${lightRgb.r} ${lightRgb.g} ${lightRgb.b}`
          );
        }
        const darkRgb = hexToRgb(newDarkPrimaryHex);
        if (darkRgb) {
          // Look inside the .dark section for color-primary-rgb
          const darkSectionMatch = content.match(/\.dark\s*\{([^}]*)\}/);
          if (darkSectionMatch) {
            const darkSection = darkSectionMatch[0];
            const updatedDarkSection = darkSection.replace(
              /(--color-primary-rgb:\s*)\d+\s+\d+\s+\d+/g,
              `$1${darkRgb.r} ${darkRgb.g} ${darkRgb.b}`
            );
            content = content.replace(darkSection, updatedDarkSection);
          }
        }

        // Replace logo gradient variable values
        const logoGrad0 = adjustBrightness(newLightPrimaryHex, -20);
        const logoGrad50 = newLightPrimaryHex;
        const logoGrad100 = adjustBrightness(newLightPrimaryHex, 20);
        const holeGrad0 = adjustBrightness(newLightPrimaryHex, -70);
        const holeGrad100 = adjustBrightness(newLightPrimaryHex, -50);

        content = content.replace(/(--logo-grad-0:\s*)[^;\n]+/g, `$1${logoGrad0}`);
        content = content.replace(/(--logo-grad-50:\s*)[^;\n]+/g, `$1${logoGrad50}`);
        content = content.replace(/(--logo-grad-100:\s*)[^;\n]+/g, `$1${logoGrad100}`);
        content = content.replace(/(--hole-grad-0:\s*)[^;\n]+/g, `$1${holeGrad0}`);
        content = content.replace(/(--hole-grad-100:\s*)[^;\n]+/g, `$1${holeGrad100}`);
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      const relPath = path.relative(process.cwd(), filePath);
      console.log(`  ${colors.green}✓${colors.reset} Updated: ${relPath}`);
      filesUpdated++;
    }
  });

  // 2. Safely update .env file with the new values
  const updatedEnv = {
    ...env,
    VITE_BRAND_NAME: newBrandName,
    VITE_BRAND_ID: newBrandId,
    VITE_EMAIL: newEmail,
    VITE_WHATSAPP: newWhatsapp,
    VITE_WHATSAPP_DISPLAY: newWhatsappDisplay,
    GMAIL_USER: newEmail
  };
  writeEnv(envPath, updatedEnv);
  console.log(`  ${colors.green}✓${colors.reset} Updated: .env`);
  filesUpdated++;

  console.log(`\n${colors.green}${colors.bright}Success! ${filesUpdated} files updated during rebranding.${colors.reset}\n`);
  console.log(`Run ${colors.cyan}npm run dev${colors.reset} to verify the changes in your browser.\n`);

  rl.close();
}

main().catch(err => {
  console.error(`${colors.red}Rebranding failed: ${err.message}${colors.reset}`);
  rl.close();
});
