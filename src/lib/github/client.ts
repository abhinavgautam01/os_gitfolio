import { Octokit } from '@octokit/core';
import { graphql } from '@octokit/graphql';

// Create authenticated GraphQL client
export function createGraphQLClient(token?: string) {
  const authToken = token || process.env.GITHUB_PAT;
  if (!authToken) {
    throw new Error('No GitHub token available. Set GITHUB_PAT env variable.');
  }
  return graphql.defaults({
    headers: {
      authorization: `token ${authToken}`,
    },
  });
}

// Create authenticated REST client
export function createRestClient(token?: string) {
  const authToken = token || process.env.GITHUB_PAT;
  return new Octokit({
    auth: authToken,
  });
}
