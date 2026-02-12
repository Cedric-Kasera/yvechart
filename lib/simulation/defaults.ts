// =====================
// Simulation Default Lookup Tables
// =====================
// These tables provide fallback values for nodes whose config fields
// don't directly map to simulation runtime fields. Every node id in
// nodes.ts should have an entry here.

// ── Config Key Mapping ──────────────────────────────────────────────
// Maps a node type id → which of its existing config keys (if any)
// can be promoted to a simulation runtime field.
export const CONFIG_KEY_MAP: Record<string, Partial<Record<'latency_ms' | 'max_rps' | 'replicas', string>>> = {
    // Direct matches
    'graphql':       { latency_ms: 'latency_ms', max_rps: 'rate_limit_rps' },
    'grpc':          { latency_ms: 'latency_ms', max_rps: 'concurrent_streams' },
    'nginx':         { max_rps: 'capacity_rps' },
    'traefik':       { max_rps: 'capacity_rps' },

    // Derived mappings
    'docker':        { replicas: 'replicas' },
    'kubernetes':    { replicas: 'replicas' },
    'elasticsearch': { replicas: 'replicas' },
    'heroku':        { replicas: 'dyno_count' },
    'python':        { replicas: 'workers' },
};

// ── Default Latency (ms) ────────────────────────────────────────────
// Realistic baseline latencies per node type.
export const DEFAULT_LATENCY: Record<string, number> = {
    // Compute — Cloud
    'aws':                50,
    'azure':              50,
    'gcp':                50,
    'digitalocean':       50,
    'heroku':             50,
    'vercel':             50,
    'netlify':            50,

    // Compute — Containers
    'docker':              5,
    'kubernetes':         10,
    'podman':              5,

    // Compute — Serverless
    'aws-lambda':         80,
    'cloudflare-workers': 10,

    // Storage — Databases
    'postgresql':         15,
    'mysql':              15,
    'mongodb':            12,
    'redis':               1,
    'sqlite':              0.5,
    'cassandra':          12,
    'dynamodb':           30,
    'supabase':           30,
    'firebase':           30,

    // Storage — Object Storage
    's3':                100,
    'cloudinary':        100,

    // Infrastructure — CDN
    'cloudflare':          5,
    'fastly':              5,

    // Infrastructure — DNS & Networking
    'nginx':               2,
    'traefik':             2,

    // Infrastructure — IaC (not in request path)
    'terraform':           0,
    'ansible':             0,
    'pulumi':              0,

    // Pipelines — CI/CD (not in request path)
    'github-actions':      0,
    'jenkins':             0,
    'circleci':            0,
    'gitlab-ci':           0,
    'argocd':              0,

    // Pipelines — Messaging
    'kafka':               5,
    'rabbitmq':            8,

    // Security — Auth
    'auth0':              40,
    'clerk':              40,
    'keycloak':           40,

    // Security — Secrets
    'vault':              15,

    // Monitoring — Observability (sidecar / out-of-band)
    'grafana':             0,
    'prometheus':          0,
    'datadog':             0,
    'sentry':              0,

    // Monitoring — Logging
    'elasticsearch':      20,

    // Frontend — Frameworks
    'react':              30,
    'nextjs':             30,
    'vuejs':              30,
    'angular':            30,
    'svelte':             30,
    'nuxtjs':             30,

    // Frontend — Mobile (client-side)
    'flutter':             0,
    'reactnative':         0,
    'swift':               0,
    'kotlin':              0,

    // Backend — Languages & Runtimes
    'nodejs':             25,
    'python':             25,
    'go':                 15,
    'rust':               10,
    'java':               25,
    'dotnet':             25,

    // Backend — API
    'graphql':            50,
    'grpc':               10,
};

// ── Default Max RPS (per replica) ───────────────────────────────────
export const DEFAULT_MAX_RPS: Record<string, number> = {
    // Compute — Cloud
    'aws':               5000,
    'azure':             5000,
    'gcp':               5000,
    'digitalocean':      5000,
    'heroku':            2000,
    'vercel':            1000,
    'netlify':           1000,

    // Compute — Containers
    'docker':            3000,
    'kubernetes':        5000,
    'podman':            3000,

    // Compute — Serverless
    'aws-lambda':        1000,
    'cloudflare-workers': 5000,

    // Storage — Databases
    'postgresql':        1000,
    'mysql':             1000,
    'mongodb':           2000,
    'redis':            50000,
    'sqlite':             500,
    'cassandra':         5000,
    'dynamodb':          1000,
    'supabase':           500,
    'firebase':          1000,

    // Storage — Object Storage
    's3':                3500,
    'cloudinary':        3500,

    // Infrastructure — CDN
    'cloudflare':      100000,
    'fastly':           50000,

    // Infrastructure — DNS & Networking
    'nginx':            10000,
    'traefik':           8000,

    // Infrastructure — IaC (pass-through)
    'terraform':       Infinity,
    'ansible':         Infinity,
    'pulumi':          Infinity,

    // Pipelines — CI/CD (pass-through)
    'github-actions':  Infinity,
    'jenkins':         Infinity,
    'circleci':        Infinity,
    'gitlab-ci':       Infinity,
    'argocd':          Infinity,

    // Pipelines — Messaging
    'kafka':           100000,
    'rabbitmq':         50000,

    // Security — Auth
    'auth0':             1000,
    'clerk':             1000,
    'keycloak':           500,

    // Security — Secrets
    'vault':             2000,

    // Monitoring — Observability (pass-through / sidecar)
    'grafana':         Infinity,
    'prometheus':      Infinity,
    'datadog':         Infinity,
    'sentry':          Infinity,

    // Monitoring — Logging
    'elasticsearch':     5000,

    // Frontend — Frameworks
    'react':             3000,
    'nextjs':            3000,
    'vuejs':             3000,
    'angular':           3000,
    'svelte':            3000,
    'nuxtjs':            3000,

    // Frontend — Mobile (client-side)
    'flutter':         Infinity,
    'reactnative':     Infinity,
    'swift':           Infinity,
    'kotlin':          Infinity,

    // Backend — Languages & Runtimes
    'nodejs':            5000,
    'python':            3000,
    'go':               10000,
    'rust':             10000,
    'java':              5000,
    'dotnet':            5000,

    // Backend — API
    'graphql':           1000,
    'grpc':              5000,
};

// ── Default Cost Per Hour (USD) ─────────────────────────────────────
export const DEFAULT_COST: Record<string, number> = {
    // Compute — Cloud
    'aws':              0.10,
    'azure':            0.10,
    'gcp':              0.10,
    'digitalocean':     0.03,
    'heroku':           0.05,
    'vercel':           0.02,
    'netlify':          0.02,

    // Compute — Containers
    'docker':           0.04,
    'kubernetes':       0.12,
    'podman':           0.04,

    // Compute — Serverless
    'aws-lambda':       0.01,
    'cloudflare-workers': 0.01,

    // Storage — Databases
    'postgresql':       0.08,
    'mysql':            0.08,
    'mongodb':          0.08,
    'redis':            0.03,
    'sqlite':           0.00,
    'cassandra':        0.08,
    'dynamodb':         0.06,
    'supabase':         0.06,
    'firebase':         0.06,

    // Storage — Object Storage
    's3':               0.05,
    'cloudinary':       0.05,

    // Infrastructure — CDN
    'cloudflare':       0.05,
    'fastly':           0.05,

    // Infrastructure — DNS & Networking
    'nginx':            0.03,
    'traefik':          0.03,

    // Infrastructure — IaC
    'terraform':        0.00,
    'ansible':          0.00,
    'pulumi':           0.00,

    // Pipelines — CI/CD
    'github-actions':   0.00,
    'jenkins':          0.00,
    'circleci':         0.00,
    'gitlab-ci':        0.00,
    'argocd':           0.00,

    // Pipelines — Messaging
    'kafka':            0.06,
    'rabbitmq':         0.06,

    // Security — Auth
    'auth0':            0.04,
    'clerk':            0.04,
    'keycloak':         0.04,

    // Security — Secrets
    'vault':            0.04,

    // Monitoring — Observability
    'grafana':          0.03,
    'prometheus':       0.03,
    'datadog':          0.03,
    'sentry':           0.03,

    // Monitoring — Logging
    'elasticsearch':    0.06,

    // Frontend — Frameworks
    'react':            0.00,
    'nextjs':           0.00,
    'vuejs':            0.00,
    'angular':          0.00,
    'svelte':           0.00,
    'nuxtjs':           0.00,

    // Frontend — Mobile
    'flutter':          0.00,
    'reactnative':      0.00,
    'swift':            0.00,
    'kotlin':           0.00,

    // Backend — Languages & Runtimes
    'nodejs':           0.05,
    'python':           0.05,
    'go':               0.05,
    'rust':             0.05,
    'java':             0.05,
    'dotnet':           0.05,

    // Backend — API
    'graphql':          0.02,
    'grpc':             0.02,
};

// ── Fallback defaults for unknown node types ────────────────────────
export const FALLBACK_LATENCY = 25;
export const FALLBACK_MAX_RPS = 1000;
export const FALLBACK_COST = 0.05;
