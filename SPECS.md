# Project Specs: Kelas Mengaji Online (KMO) Directory

## 1. Technical Core
- Framework: React Router v7 (SSR Mode)
- Language: TypeScript
- Database: PostgreSQL (Hosted on Railway)
- ORM: Drizzle ORM
- Authentication: Better Auth with Google OAuth
- Styling: Tailwind CSS + shadcn/ui
- Infrastructure: Railway (App + DB) + Cloudflare (DNS/CDN Proxy)

## 2. Database Schema (Postgres)
- Users Table: Standard Better Auth schema + role (Admin/User).
- Profiles Table:
    - Basic: id, slug (unique), type (Individual/Organization).
    - Content: name, bio, imageUrl, headline.
    - Contacts: whatsappNumber, websiteUrl, socialLinks (JSONB).
    - Status: isClaimed, isVerified, isBoosted.
    - Ownership: ownerId (Foreign Key to Users).
- Tags Table:
    - Data: id, slug (unique), name, group (Enum), order.
    - SEO: metaTitle, metaDescription, pageTitle, descriptionText.
- ProfilesToTags Table: Junction table for many-to-many relationships between profiles and tags.
- ClaimRequests Table: Records for user claim messages and approval status (Unique constraint on userId + profileId).

## 3. Directory & Search System
- Main Directory: Full-text search engine for profile names, headlines, and bios.
- Semantic Filter Groups:
    - Target Audience: Matrix-style tags for Gender + Age (e.g., Lelaki Dewasa, Perempuan Kanak-kanak).
    - Class Format: Online, Physical at Student's location, Physical at Center.
    - Fee Structure: Free, Fixed Fee, Sincerity-based (Seikhlas Hati), Student-defined.
    - Value & Quality: Certificates provided, Progress reports, Custom curriculum.
    - Class Policy: Flexible timing, Replacement classes allowed.
    - Perks: Free trial class, Choose your own teacher.
- Query Logic: Filter states managed via URL Search Parameters for shareable search results.
- Tag Filter Modes (when user selects a tag, e.g. Perempuan Dewasa):
    - **Any** (default): Show all classes that have the selected tag. Classes with additional tags (e.g. both Perempuan Dewasa and Lelaki Dewasa) are included, since they still accept the selected audience. URL: `?tag=perempuan-dewasa`.
    - **Only**: Show classes that have the selected tag and no other tag in the same tag group (e.g. within Target Audience, only Perempuan Dewasa). Use case: "kelas khusus perempuan dewasa sahaja." URL: `?tag=perempuan-dewasa&mode=only`.
    - Implementation: Resolve tag slug to tag id and group; for "only" mode, exclude profiles that have any other tag in that group (e.g. NOT EXISTS subquery). UI: toggle or two links to switch between modes when a tag is selected.
- Sorting Logic: Priority sorting (isBoosted first), followed by verified status, then most recently updated.

## 4. Link-in-Bio Profile Pages (/@:slug)
- URL Structure: Accessed via root with @ prefix (e.g., mengaji.online/@ustaz-afrie).
- Design: Mobile-optimized, high-conversion layout for social media bio integration.
- Trust Indicators: Prominent Verified and Claimed badges for vetted teachers.
- Call to Action: Floating or fixed "WhatsApp Now" and "Official Website" buttons.
- Badge System: Automatic rendering of perks and policies as visual chips on the profile.
- SEO: Metadata dynamically generated from profile headline and bio.

## 5. Programmatic SEO Pages (/browse/:slug)
- Dynamic Category Routes: Auto-generated landing pages for every tag in the database.
- Metadata Injection: Each page renders unique Meta Titles, H1 tags, and SEO descriptions from the Tags table.
- Internal Linking: Profile badges link back to their respective category pages to build SEO authority.
- Sitemap: Dynamic sitemap.xml including all @profile and /browse category URLs.

## 6. Member & Dashboard System
- Auth Flow: Google Social Login integration for seamless teacher onboarding.
- Teacher Dashboard:
    - Profile Editor: Unified interface to manage bio, images, and contact links.
    - Tag Matrix: Interface to toggle target audiences and educational features.
    - Link-in-Bio Customizer: Ability to manage the visibility of social links.
    - Verification Portal: Claim submission interface with direct redirect to Admin Telegram for manual identity verification.
    - Analytics: Tracking dashboard for total profile views and CTA button clicks.

## 7. Performance & High Traffic Optimization
- Proxy Strategy: Cloudflare Proxy (Orange Cloud) enabled for Railway-hosted content.
- Cache Strategy: Long-term s-maxage headers for all public @profile and /browse pages.
- Dynamic Invalidation: Automated purge of specific URLs via Cloudflare API when a teacher updates their dashboard.
- Hybrid Auth Display: Client-side session checks to toggle "Edit" buttons on cached public HTML pages.

## 8. Admin & Monetization
- Management Tools: Full CRUD access for Admin to manage all profiles, users, and tags.
- Claim Moderation: Queue system to approve or reject profile ownership requests based on manual Telegram verification.
- Boosting Engine: System to toggle isBoosted status with automated expiration logic.
- Tag SEO Editor: Admin interface to optimize meta content for specific high-traffic tags.