import puppeteer from 'puppeteer';
import fs from 'fs';

const FB_URL = "https://www.facebook.com/share/18aE3NF9KW/";

async function scrapeFacebook() {
  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set a realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log("Navigating to URL...");
  await page.goto(FB_URL, { waitUntil: 'networkidle2' });
  
  // Wait a bit for dynamic content
  await new Promise(r => setTimeout(r, 5000));
  
  console.log("Extracting content...");
  
  // Attempt to extract the text description
  const description = await page.evaluate(() => {
    // Look for the main post text element. Facebook changes classes often.
    // Try to find the user text content in elements that typically hold post text.
    const messageElements = Array.from(document.querySelectorAll('div[data-ad-comet-preview="message"]'));
    return messageElements.map(el => el.innerText).join('\n\n');
  });
  
  // Attempt to extract images and videos
  const media = await page.evaluate(() => {
    const mediaUrls = [];
    
    // Images
    const imgElements = document.querySelectorAll('img[src*="scontent"]');
    imgElements.forEach(img => {
      // Avoid small UI icons
      if (img.width > 200 || img.height > 200) {
        mediaUrls.push({ type: 'IMAGE', url: img.src });
      }
    });
    
    // Videos (Facebook uses custom video players, sometimes the <video> tag is present)
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(vid => {
      if (vid.src) {
         mediaUrls.push({ type: 'VIDEO', url: vid.src });
      }
    });
    
    return mediaUrls;
  });
  
  console.log(`Extracted description length: ${description?.length}`);
  console.log(`Extracted media count: ${media.length}`);
  
  const result = {
    description: description || "Extracted Description",
    media: media
  };
  
  fs.writeFileSync('prisma/scraped_fb_post.json', JSON.stringify(result, null, 2));
  console.log("Saved to prisma/scraped_fb_post.json");
  
  await browser.close();
}

scrapeFacebook().catch(console.error);
