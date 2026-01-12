# External Integrations

**Analysis Date:** 2026-01-11

## APIs & External Services

**Payment Processing:**
- Not applicable - This is a UI component library with no payment integration

**Email/SMS:**
- Not applicable

**External APIs:**
- Not applicable - No external API integrations

## Data Storage

**Databases:**
- Not applicable - Library has no data storage

**File Storage:**
- Not applicable

**Caching:**
- Not applicable

## Authentication & Identity

**Auth Provider:**
- Not applicable - Library has no authentication

**OAuth Integrations:**
- Not applicable

## Monitoring & Observability

**Error Tracking:**
- Not configured

**Analytics:**
- Not configured

**Logs:**
- Not applicable - Library code has no logging

## CI/CD & Deployment

**Hosting:**
- npm registry - Package published as `@tosui/react`
- GitHub Pages - Documentation site at https://dgca.github.io/tosui/

**CI Pipeline:**
- GitHub Actions - Automated workflows
  - `.github/workflows/docs-test.yml` - Test documentation build on PRs
  - `.github/workflows/docs.yml` - Deploy docs on main branch push
  - `.github/workflows/release.yml` - Release automation with changesets
- Node.js 20 used in all workflows

**Release Process:**
- Changesets for version management (`@changesets/cli@2.29.8`)
- Automated npm publishing via GitHub Actions
- Semantic versioning

## Environment Configuration

**Development:**
- Required env vars: None
- Secrets location: N/A
- All configuration via build config files

**Staging:**
- Not applicable - Library development only

**Production:**
- npm registry for package distribution
- GitHub Pages for documentation hosting

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Third-Party Services Summary

| Service | Purpose | Configuration |
|---------|---------|---------------|
| npm registry | Package distribution | `package.json` exports |
| GitHub | Repository hosting | `.github/` workflows |
| GitHub Pages | Documentation hosting | `packages/docs/docusaurus.config.ts` |

## Notes

This is a **client-side UI component library** with minimal external dependencies:

- No backend services
- No API integrations
- No authentication
- No database connections
- No environment-specific configuration

The only external integrations are for **distribution and documentation**:
- npm for package publishing
- GitHub for source control and CI/CD
- GitHub Pages for documentation hosting

---

*Integration audit: 2026-01-11*
*Update when adding/removing external services*
