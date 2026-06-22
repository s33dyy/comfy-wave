const fs = require('fs');
const path = require('path');

const srcAdmin = '/Users/pratikchoudhuri/Documents/Adhunik Mahal/src/pages/admin';
const destAdmin = '/Users/pratikchoudhuri/Documents/comfy-wave/src/app/admin';

// Mapping React Router to Next.js
const transformContent = (content, fileName) => {
  // Replace imports
  let newContent = content
    .replace(/import \{.*?Link.*?\} from "react-router-dom";/g, 'import Link from "next/link";')
    .replace(/import \{.*?(useNavigate|NavLink).*?\} from "react-router-dom";/g, 'import { useRouter } from "next/navigation";')
    .replace(/useNavigate\(\)/g, 'useRouter()')
    .replace(/navigate\(/g, 'router.push(')
    .replace(/<NavLink.*?to=\{n\.to\}.*?>/g, '<Link href={n.to} className={/* TODO */ ""}>')
    .replace(/<\/NavLink>/g, '</Link>')
    .replace(/to=/g, 'href=')
    .replace(/<img /g, '<img ') // Next.js image not strictly required for admin
    .replace(/@\/components\/admin\/AdminLayout/g, '@/components/admin/AdminLayout');
    
    // Add "use client" since these are heavily interactive client components
    if (!newContent.startsWith('"use client"') && !newContent.startsWith("'use client'")) {
      newContent = '"use client";\n' + newContent;
    }
    
  return newContent;
};

const pages = [
  { src: 'AdminDashboard.tsx', dest: 'page.tsx' },
  { src: 'AdminProducts.tsx', dest: 'products/page.tsx' },
  { src: 'AdminCategories.tsx', dest: 'categories/page.tsx' },
  { src: 'AdminFeatured.tsx', dest: 'featured/page.tsx' },
  { src: 'AdminHero.tsx', dest: 'hero/page.tsx' },
  { src: 'AdminOrders.tsx', dest: 'orders/page.tsx' },
  { src: 'AdminSettings.tsx', dest: 'settings/page.tsx' },
  { src: 'AdminLogin.tsx', dest: 'login/page.tsx' }
];

pages.forEach(({ src, dest }) => {
  const srcPath = path.join(srcAdmin, src);
  const destPath = path.join(destAdmin, dest);
  
  if (fs.existsSync(srcPath)) {
    const content = fs.readFileSync(srcPath, 'utf-8');
    const newContent = transformContent(content, src);
    
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, newContent);
    console.log(`Copied and transformed ${src} to ${dest}`);
  }
});

// Copy AdminLayout
const srcLayout = '/Users/pratikchoudhuri/Documents/Adhunik Mahal/src/components/admin/AdminLayout.tsx';
const destLayoutDir = '/Users/pratikchoudhuri/Documents/comfy-wave/src/components/admin';
if (fs.existsSync(srcLayout)) {
  let content = fs.readFileSync(srcLayout, 'utf-8');
  content = transformContent(content, 'AdminLayout.tsx');
  fs.mkdirSync(destLayoutDir, { recursive: true });
  fs.writeFileSync(path.join(destLayoutDir, 'AdminLayout.tsx'), content);
  console.log('Copied AdminLayout.tsx');
}
