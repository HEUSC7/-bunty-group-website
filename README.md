# Bunty Group Website

A complete, responsive website for Bunty Group - a real estate development company based in Pune, India. This website features project showcases, company information, contact forms, and career opportunities.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Project Showcase**: Detailed project pages with galleries and specifications  
- **Contact Forms**: Lead capture with email notifications
- **Career Portal**: Job listings with resume upload functionality
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized CSS and JavaScript

## Technology Stack

### Frontend
- HTML5 (semantic markup)
- CSS3 (responsive design, flexbox, grid)
- Vanilla JavaScript (ES6+)
- Progressive Web App ready

### Backend
- PHP 7.4+ (form handling)
- File upload management
- Email notifications
- Input validation and sanitization

## File Structure

```
bunty-group-website/
├── index.html              # Homepage
├── about-us.html           # About company page
├── projects.html           # Projects listing page
├── career.html             # Career opportunities
├── contact-us.html         # Contact information and form
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   ├── images/             # Project and company images
│   └── pdf/                # Project brochures
├── backend/
│   ├── contact-form-handler.php    # Contact form processor
│   ├── resume-upload-handler.php   # Resume upload handler
│   ├── uploads/                    # File upload directory
│   └── logs/                       # Application logs
└── README.md
```

## Quick Start

### 1. Clone or Download
```bash
git clone [your-repo-url]
cd bunty-group-website
```

### 2. Local Development
For static files only, you can open `index.html` directly in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### 3. Production Deployment

#### GitHub Pages (Frontend Only)
1. Push files to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Your site will be available at `https://yourusername.github.io/repo-name`

#### Full Stack Hosting (Recommended)

**Requirements:**
- PHP 7.4 or higher
- Web server (Apache/Nginx)
- Mail function enabled
- File upload permissions

**Setup Steps:**
1. Upload all files to your web server
2. Set permissions for upload directories:
   ```bash
   chmod 755 backend/uploads/
   chmod 755 backend/logs/
   ```
3. Update email addresses in PHP files:
   - `backend/contact-form-handler.php` - line 95
   - `backend/resume-upload-handler.php` - line 89
4. Configure email settings if needed

#### Popular Hosting Options
- **Shared Hosting**: Hostinger, Bluehost, SiteGround
- **VPS**: DigitalOcean, Linode, Vultr  
- **Managed WordPress**: WP Engine (if converting to WordPress)

## Configuration

### Email Setup
Edit the PHP files to configure email addresses:

**Contact Form** (`backend/contact-form-handler.php`):
```php
$to = "info@buntygroup.com";  // Change to your email
```

**Career Form** (`backend/resume-upload-handler.php`):
```php
$hr_email = "hr@buntygroup.com";    // Change to your HR email
$cc_email = "info@buntygroup.com";  // Change to your admin email
```

### Google Maps Integration
Update the Google Maps embed in `contact-us.html`:
1. Go to Google Maps
2. Find your location
3. Click "Share" > "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in the contact page

### Social Media Links
Update social media links in all HTML files:
```html
<a href="https://facebook.com/your-page" class="social-icon facebook">📘</a>
<a href="https://instagram.com/your-page" class="social-icon instagram">📷</a>
<a href="https://youtube.com/your-channel" class="social-icon youtube">📺</a>
```

## Customization

### Adding New Projects
1. Add project images to `assets/images/`
2. Add project brochure PDFs to `assets/pdf/`
3. Update `projects.html` with new project card:
```html
<article class="project-card detailed">
  <div class="project-image">
    <img src="assets/images/your-project.jpg" alt="Project Name">
  </div>
  <div class="project-content">
    <h3>Project Name</h3>
    <p class="project-location">Location</p>
    <p>Project description...</p>
    <!-- Add project details -->
  </div>
</article>
```

### Updating Company Information
- Contact details: Update in all HTML files
- About content: Edit `about-us.html`
- Statistics: Update numbers in `index.html`

### Styling Changes
- Colors: Modify CSS variables in `style.css`
- Fonts: Update font-family in CSS
- Layout: Adjust CSS Grid/Flexbox properties

## Security Considerations

### File Upload Security
- File type validation is implemented
- File size limits enforced (1MB)
- Files stored outside web root (recommended)
- Virus scanning recommended for production

### Form Security
- Input sanitization implemented
- CSRF protection recommended for production
- Rate limiting recommended
- Captcha integration available

### General Security
- Keep PHP updated
- Use HTTPS in production
- Set proper file permissions
- Regular security audits

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Performance Optimization

### Already Implemented
- Minified CSS structure
- Optimized images (placeholder system)
- Lazy loading for images
- Mobile-first responsive design

### Additional Recommendations
- Enable Gzip compression
- Set browser caching headers
- Use CDN for static assets
- Optimize images (WebP format)
- Minify CSS and JavaScript

## SEO Features

- Semantic HTML structure
- Meta tags for all pages
- OpenGraph tags (add if needed)
- Schema markup (can be added)
- Fast loading times
- Mobile-responsive design

## Support and Maintenance

### Regular Updates Needed
- Project listings and images
- Company statistics
- Contact information
- Job openings

### Monitoring
- Check contact form submissions
- Monitor file uploads
- Review error logs
- Test all forms monthly

## License

This website template is created for Bunty Group. Modify and use according to your needs.

## Contact

For technical support or customization requests:
- Website: https://buntygroup.com
- Email: info@buntygroup.com
- Phone: +91 9975570020

---

**Note**: This is a complete, production-ready website. Test thoroughly before deploying to ensure all features work as expected in your hosting environment.