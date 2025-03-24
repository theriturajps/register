# StarCity Subdomains

Get free subdomains for your websites, blogs, portfolios, or APIs under `starcity.eu.org`!

## Features

- Free subdomains for developers (e.g., `yourname.starcity.eu.org`)
- Up to 5 subdomains per user
- Support for A, AAAA, CNAME and TXT records
- Optional Cloudflare proxy protection
- Managed through GitHub pull requests
- Automatic DNS updates via GitHub Actions

## How to Get Your Subdomains

1. Fork this repository
2. Create a new file in the `domains/` directory with your desired subdomain name (e.g., `mysite.json`)
3. Fill the JSON file using the [template](./domains/TEMPLATE.json)
4. Create a pull request
5. Wait for review and merge

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions and requirements.

## Requirements

Your pull request **will not** be merged if:
- You already own 5 subdomains on our service
- The records include invalid/unpermitted record types
- It violates users' privacy
- It uses Netlify, as there are issues with subdomain verification (we hope to add support back soon)
- The domain is not being used for a valid website/blog/portfolio/API (reviewed case by case)

*If your subdomain is inactive, it may be purged. We will try to notify you before purging via the email you provided.*

## Supported Record Types

- **A Records**: IPv4 addresses
- **AAAA Records**: IPv6 addresses
- **CNAME Records**: Domain aliases
- **TXT Records**: For verification and other purposes

## Status

Check the [GitHub Actions](https://github.com/YOUR-USERNAME/YOUR-REPO/actions) tab to see the status of DNS deployments.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.