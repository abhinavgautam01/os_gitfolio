# OS_Gitfolio

A professional GitHub profile visualization and analytics platform. This application allows developers to generate comprehensive, visually appealing dashboards of their GitHub activity, providing deep insights into their contribution history, top languages, and repository statistics. It also features a comparison tool to evaluate metrics alongside other developers.

## Features

- Profile Analytics: Detailed metrics including total contributions, pull requests, merged PRs, issues, and stars.
- Contribution Heatmap: A visual representation of daily contributions over the year, akin to GitHub's native heatmap but highly stylized.
- Activity Charts: Line graphs displaying activity trends over time (daily and monthly views).
- Streak Tracking: Calculation of current and longest contribution streaks.
- Repository Insights: Cards highlighting top repositories with relevant statistics.
- Language Distribution: A donut chart breaking down the usage of programming languages across public repositories.
- Competitor Analysis: A side-by-side comparison mode to evaluate metrics against another GitHub user.
- Export Capabilities: Generate high-resolution PNG or PDF reports of the dashboard.
- Responsive Design: A modern, glassmorphism-inspired UI tailored for all device sizes.

## Technology Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data Fetching: GitHub GraphQL API & REST API
- Authentication: NextAuth.js
- Visualization: D3.js & Recharts
- Exporting: html-to-image & jsPDF

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A GitHub Personal Access Token

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd github-developer-program
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Ensure you provide the required GitHub OAuth and Personal Access Token credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

## Usage

- Navigate to the homepage to search for any GitHub username.
- View detailed analytics on the generated dashboard.
- Use the "Compete" feature to compare stats with another developer.
- Export the profile as a PNG or PDF using the export bar at the bottom of the dashboard.
