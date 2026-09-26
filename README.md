# Mobile App Notification Previewer

A static web visualizer hosted on GitHub Pages that helps product teams, designers, and engineers preview how mobile push notifications render across **Apple (iOS 17/18)** and **Android (Material 3 / Android 14/15)** under real-world **accessibility font scaling, device widths, dark/light themes, and content lengths**.

🔗 **Live Demo**: `https://<your-username>.github.io/notification_preview/`

---

## ✨ Features

- **📱 Dual Platform Fidelity**:
  - **Apple iOS**: Authentic frosted glass (`backdrop-filter: blur()`), SF Pro typography hierarchy, squircle corners, dynamic island status bar, and pill action sheets.
  - **Android Material 3**: Surface container elevation, M3 tokens (`titleMedium`, `bodyMedium`, `labelLarge`), collapsed 1-line truncation, expand chevron, and BigPicture styling.
- **♿ Deep Accessibility Auditing**:
  - **Font Scale / Dynamic Type**: Test from compact 85% up to **iOS AX1–AX5 (310%)** and **Android 14+ non-linear scaling (200%)**.
  - **Bold Text**: Audit how text weights affect line wrapping.
  - **High Contrast & Reduce Transparency**: Test solid opaque backings versus frosted glass over colorful wallpapers.
- **🔍 Two Interactive Views**:
  - **Studio View**: Interactive mobile phone mockup with hardware frame, realistic status bar, lockscreen clock, and live expand/collapse testing.
  - **Comparison Matrix View**: Side-by-side audit gallery displaying multiple platforms and accessibility tiers simultaneously with filter chips.
- **🛡️ Real-Time Truncation & Safe-Zone Auditor**:
  - Heuristically flags when titles or body messages exceed single-line budgets or get clamped.
  - Warns when action button labels exceed safe character budgets and stack vertically.
- **⚡ Presets & Templates**:
  - 1-click presets: *Chat / Direct Message*, *Food & Parcel Delivery*, *E-Commerce Promo*, *Security Alert*, and *Live Flight Tracker*.
- **🔗 Shareable Links & Export**:
  - Encodes the full notification configuration into the URL hash for zero-backend sharing.
  - 1-click **Export PNG** for dropping mockups into Figma, Jira, or pull requests.

---

## 📐 Material 3 vs Apple HIG Specifications Reference

### Material 3 (Android 14/15)
| Role | M3 Token | Size (sp) | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **App Name** | `labelSmall` / `labelMedium` | 11sp / 12sp | Medium (500) | 16sp |
| **Title** | `titleMedium` | 16sp | Medium (500) | 22sp |
| **Body** | `bodyMedium` | 14sp | Regular (400) | 20sp |
| **Action Buttons** | `labelLarge` | 14sp | Medium (500) | 20sp |
| **Card Corner Radius** | Container Shape | 20dp – 28dp | — | — |

*Note: Android collapsed notifications strictly truncate the body to **1 line** with an ellipsis.*

### Apple Human Interface Guidelines (iOS 17/18)
| Role | Apple Token | Size (pt) | Weight | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **App Name & Time** | Caption 2 / Footnote | 12.5pt | Regular (400) | Muted secondary color |
| **Title** | Headline | 15pt | Semibold (600) | Primary label |
| **Subtitle** | Subheadline | 14pt | Medium (500) | Channel / chat sender |
| **Body** | Subheadline / Body | 14.5pt | Regular (400) | Clamped to 2-3 lines |
| **Actions** | Callout | 15pt | Semibold (600) | Stacks when font scale >= 1.4 |
| **Card Shape** | Squircle (Continuous) | ~20pt – 22pt | — | Heavy frosted glass blur |

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/swegr/notification_preview.git
   cd notification_preview
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local dev server**:
   ```bash
   npm run dev
   ```

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages

This repository is pre-configured with a GitHub Actions workflow in `.github/workflows/deploy.yml`.

To deploy:
1. Push your changes to the `main` or `master` branch.
2. Go to your GitHub repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The deployment workflow will trigger automatically and publish your site!
