/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const nextConfig = {
    output: isGithubActions ? "export" : undefined,
}

module.exports = nextConfig
