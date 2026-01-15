# Vercel Configuration Guide

## What is `vercel.json`?

The `vercel.json` file configures how Vercel deploys and serves your application. It includes:

### Security Headers
HTTP headers that protect your application from common web vulnerabilities:

- **Strict-Transport-Security (HSTS)**: Forces browsers to use HTTPS for 2 years, preventing downgrade attacks
- **X-Content-Type-Options**: Prevents browsers from guessing file types (MIME-sniffing attacks)
- **X-Frame-Options**: Prevents your site from being embedded in iframes (clickjacking protection)
- **X-XSS-Protection**: Enables browser XSS filtering
- **Referrer-Policy**: Controls what referrer information is sent
- **Permissions-Policy**: Disables unnecessary browser features (camera, microphone, etc.)

### Caching Policies
Headers that tell browsers and CDNs how long to cache resources:

- **Static assets** (images, fonts, JS, CSS): Cached for 1 year (`max-age=31536000, immutable`)
- **API routes**: Never cached (`no-store, no-cache`)
- **HTML pages**: Not cached (`max-age=0, must-revalidate`)

## Why This Matters

### Security Benefits
- **Protects users** from XSS, clickjacking, and other attacks
- **Improves security score** on tools like SecurityHeaders.com
- **Compliance** with security best practices

### Performance Benefits
- **Faster page loads** - cached assets don't need to be re-downloaded
- **Reduced server load** - CDN serves cached content
- **Better Core Web Vitals** - faster LCP (Largest Contentful Paint)

## Configuration Details

### Security Headers Applied to All Routes
All pages get these security headers automatically.

### API Routes
- No caching (always fresh data)
- `noindex` header (prevents search engine indexing)

### Static Assets
- Long-term caching (1 year)
- `immutable` flag (tells browsers the file never changes)

### HTML Pages
- No caching (always get latest content)
- Ensures users see updates immediately

## Customization

If you need to adjust these settings:

1. **Add CSP (Content-Security-Policy)**: Currently omitted because your app uses:
   - PostHog analytics
   - External images (`hostname: '**'`)
   - Various third-party scripts
   
   If you want to add CSP, you'll need to whitelist all domains your app uses.

2. **Adjust cache times**: Modify `max-age` values (in seconds)

3. **Add more routes**: Create new entries in the `headers` array

## Testing

After deployment, verify headers are working:

```bash
curl -I https://thinkex.app
```

Or use online tools:
- https://securityheaders.com
- https://observatory.mozilla.org
