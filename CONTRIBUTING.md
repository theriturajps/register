# Contributing to StarCity Subdomains

Thank you for your interest in getting free subdomains! Follow these steps to register your subdomains.

## How to Register

1. Fork this repository
2. Create a new JSON file in the `domains/` directory with your desired subdomain name (e.g., `mysite.json`)
3. Fill the JSON file with your information (see template below)
4. Create a pull request

## JSON Template

```json
{
    "website": "https://your-website.com", // Optional, your website URL

    "owner": {
        "username": "YourGitHubUsername",
        "email": "your.email@example.com"
    },

    "target": {
        // Choose ONE of these record types:
        
        // For A record (IP address)
        "A": {
            "name": "yoursubdomain",
            "value": ["your.ip.address"]
        },
        
        // For AAAA record (IPv6 address)
        "AAAA": {
            "name": "yoursubdomain",
            "value": ["your:ipv6:address"]
        },
        
        // For CNAME record (pointing to another domain)
        "CNAME": {
            "name": "yoursubdomain",
            "value": "your-target-domain.com"
        },
        
        // Optional: For TXT records (verification, etc.)
        "TXT": {
            "name": "verification-name",
            "value": "verification-value"
        }
    },

    "proxied": false // Whether to proxy through Cloudflare (true/false)
}
```

## Rules

- You may register up to 5 subdomains per GitHub account
- Your subdomains must be used for valid websites, blogs, portfolios, or APIs
- We don't support Netlify hosted sites due to verification issues
- Your subdomains may be purged if inactive for an extended period

## After Registration

Once your pull request is merged, your subdomains will be active within minutes. You can then use them as follows:
- `yoursubdomain.starcity.eu.org`

Please note that this is a free service run by volunteers. Be respectful and follow the guidelines.