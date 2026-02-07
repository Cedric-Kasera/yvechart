export type ConfigFieldType = 'number' | 'string' | 'boolean';

export interface ConfigField {
    key: string;
    label: string;
    type: ConfigFieldType;
    defaultValue: number | string | boolean;
    unit?: string;
}

export interface NodeMetadata {
    id: string;
    name: string;
    icon: string; // coloured-icons class e.g. "aws", "docker"
    description?: string;
    provider?: string;
    architectures?: string[];
    sizes?: string[];
    tags?: string[];
    config?: ConfigField[];
}

export interface SubCategory {
    id: string;
    label: string;
    nodes: NodeMetadata[];
}

export interface Category {
    id: string;
    label: string;
    subCategories: SubCategory[];
}

export const nodeCategories: Category[] = [
    {
        id: 'compute',
        label: 'Compute',
        subCategories: [
            {
                id: 'cloud',
                label: 'Cloud',
                nodes: [
                    {
                        id: 'aws', name: 'AWS', icon: 'aws', provider: 'Amazon', architectures: ['x86', 'ARM'], tags: ['cloud', 'compute'],
                        config: [
                            { key: 'region', label: 'Region', type: 'string', defaultValue: 'us-east-1' },
                            { key: 'instance_type', label: 'Instance Type', type: 'string', defaultValue: 't3.medium' },
                            { key: 'vcpus', label: 'vCPUs', type: 'number', defaultValue: 2 },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                            { key: 'auto_scaling', label: 'Auto Scaling', type: 'boolean', defaultValue: false },
                            { key: 'max_instances', label: 'Max Instances', type: 'number', defaultValue: 10 },
                        ],
                    },
                    {
                        id: 'azure', name: 'Azure', icon: 'azure', provider: 'Microsoft', architectures: ['x86', 'ARM'], tags: ['cloud', 'compute'],
                        config: [
                            { key: 'region', label: 'Region', type: 'string', defaultValue: 'eastus' },
                            { key: 'vm_size', label: 'VM Size', type: 'string', defaultValue: 'Standard_B2s' },
                            { key: 'vcpus', label: 'vCPUs', type: 'number', defaultValue: 2 },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                            { key: 'auto_scaling', label: 'Auto Scaling', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'gcp', name: 'Google Cloud', icon: 'googlecloud', provider: 'Google', architectures: ['x86', 'ARM'], tags: ['cloud', 'compute'],
                        config: [
                            { key: 'region', label: 'Region', type: 'string', defaultValue: 'us-central1' },
                            { key: 'machine_type', label: 'Machine Type', type: 'string', defaultValue: 'e2-medium' },
                            { key: 'vcpus', label: 'vCPUs', type: 'number', defaultValue: 2 },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                            { key: 'preemptible', label: 'Preemptible', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'digitalocean', name: 'DigitalOcean', icon: 'digitalocean', provider: 'DigitalOcean', architectures: ['x86'], tags: ['cloud', 'compute'],
                        config: [
                            { key: 'region', label: 'Region', type: 'string', defaultValue: 'nyc1' },
                            { key: 'droplet_size', label: 'Droplet Size', type: 'string', defaultValue: 's-2vcpu-4gb' },
                            { key: 'vcpus', label: 'vCPUs', type: 'number', defaultValue: 2 },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                        ],
                    },
                    {
                        id: 'heroku', name: 'Heroku', icon: 'heroku', provider: 'Salesforce', tags: ['cloud', 'paas'],
                        config: [
                            { key: 'dyno_type', label: 'Dyno Type', type: 'string', defaultValue: 'standard-1x' },
                            { key: 'dyno_count', label: 'Dyno Count', type: 'number', defaultValue: 1 },
                            { key: 'auto_scaling', label: 'Auto Scaling', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'vercel', name: 'Vercel', icon: 'vercel', provider: 'Vercel', tags: ['cloud', 'serverless'],
                        config: [
                            { key: 'region', label: 'Region', type: 'string', defaultValue: 'iad1' },
                            { key: 'memory_mb', label: 'Function Memory', type: 'number', defaultValue: 1024, unit: 'MB' },
                            { key: 'timeout_s', label: 'Timeout', type: 'number', defaultValue: 10, unit: 's' },
                            { key: 'edge_runtime', label: 'Edge Runtime', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'netlify', name: 'Netlify', icon: 'netlify', provider: 'Netlify', tags: ['cloud', 'serverless'],
                        config: [
                            { key: 'memory_mb', label: 'Function Memory', type: 'number', defaultValue: 1024, unit: 'MB' },
                            { key: 'timeout_s', label: 'Timeout', type: 'number', defaultValue: 10, unit: 's' },
                            { key: 'edge_functions', label: 'Edge Functions', type: 'boolean', defaultValue: false },
                        ],
                    },
                ],
            },
            {
                id: 'containers',
                label: 'Containers',
                nodes: [
                    {
                        id: 'docker', name: 'Docker', icon: 'docker', provider: 'Docker Inc', tags: ['container', 'runtime'],
                        config: [
                            { key: 'memory_limit', label: 'Memory Limit', type: 'number', defaultValue: 512, unit: 'MB' },
                            { key: 'cpu_limit', label: 'CPU Limit', type: 'number', defaultValue: 1.0 },
                            { key: 'replicas', label: 'Replicas', type: 'number', defaultValue: 1 },
                            { key: 'restart_policy', label: 'Restart Policy', type: 'string', defaultValue: 'always' },
                            { key: 'privileged', label: 'Privileged', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'kubernetes', name: 'Kubernetes', icon: 'kubernetes', provider: 'CNCF', tags: ['container', 'orchestration'],
                        config: [
                            { key: 'replicas', label: 'Replicas', type: 'number', defaultValue: 3 },
                            { key: 'cpu_request', label: 'CPU Request', type: 'string', defaultValue: '250m' },
                            { key: 'memory_request', label: 'Memory Request', type: 'string', defaultValue: '256Mi' },
                            { key: 'auto_scaling', label: 'HPA Enabled', type: 'boolean', defaultValue: true },
                            { key: 'max_replicas', label: 'Max Replicas', type: 'number', defaultValue: 10 },
                            { key: 'namespace', label: 'Namespace', type: 'string', defaultValue: 'default' },
                        ],
                    },
                    {
                        id: 'podman', name: 'Podman', icon: 'podman', provider: 'Red Hat', tags: ['container', 'runtime'],
                        config: [
                            { key: 'memory_limit', label: 'Memory Limit', type: 'number', defaultValue: 512, unit: 'MB' },
                            { key: 'cpu_limit', label: 'CPU Limit', type: 'number', defaultValue: 1.0 },
                            { key: 'rootless', label: 'Rootless', type: 'boolean', defaultValue: true },
                        ],
                    },
                ],
            },
            {
                id: 'serverless',
                label: 'Serverless',
                nodes: [
                    {
                        id: 'aws-lambda', name: 'AWS Lambda', icon: 'aws', provider: 'Amazon', tags: ['serverless', 'function'],
                        config: [
                            { key: 'memory_mb', label: 'Memory', type: 'number', defaultValue: 128, unit: 'MB' },
                            { key: 'timeout_s', label: 'Timeout', type: 'number', defaultValue: 30, unit: 's' },
                            { key: 'concurrency', label: 'Reserved Concurrency', type: 'number', defaultValue: 100 },
                            { key: 'runtime', label: 'Runtime', type: 'string', defaultValue: 'nodejs20.x' },
                        ],
                    },
                    {
                        id: 'cloudflare-workers', name: 'CF Workers', icon: 'cloudflareworkers', provider: 'Cloudflare', tags: ['serverless', 'edge'],
                        config: [
                            { key: 'cpu_time_ms', label: 'CPU Time', type: 'number', defaultValue: 10, unit: 'ms' },
                            { key: 'memory_mb', label: 'Memory', type: 'number', defaultValue: 128, unit: 'MB' },
                            { key: 'kv_bindings', label: 'KV Bindings', type: 'number', defaultValue: 0 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'storage',
        label: 'Storage',
        subCategories: [
            {
                id: 'databases',
                label: 'Databases',
                nodes: [
                    {
                        id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', provider: 'PostgreSQL', tags: ['database', 'relational'],
                        config: [
                            { key: 'max_connections', label: 'Max Connections', type: 'number', defaultValue: 100 },
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 20, unit: 'GB' },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                            { key: 'replication', label: 'Replication', type: 'boolean', defaultValue: false },
                            { key: 'ssl_enabled', label: 'SSL Enabled', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'mysql', name: 'MySQL', icon: 'mysql', provider: 'Oracle', tags: ['database', 'relational'],
                        config: [
                            { key: 'max_connections', label: 'Max Connections', type: 'number', defaultValue: 150 },
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 20, unit: 'GB' },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                            { key: 'replication', label: 'Replication', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'mongodb', name: 'MongoDB', icon: 'mongodb', provider: 'MongoDB', tags: ['database', 'nosql'],
                        config: [
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 10, unit: 'GB' },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 2, unit: 'GB' },
                            { key: 'replica_set', label: 'Replica Set', type: 'boolean', defaultValue: false },
                            { key: 'sharding', label: 'Sharding', type: 'boolean', defaultValue: false },
                            { key: 'wired_tiger_cache_gb', label: 'Cache Size', type: 'number', defaultValue: 1, unit: 'GB' },
                        ],
                    },
                    {
                        id: 'redis', name: 'Redis', icon: 'redis', provider: 'Redis', tags: ['database', 'cache'],
                        config: [
                            { key: 'max_memory_mb', label: 'Max Memory', type: 'number', defaultValue: 256, unit: 'MB' },
                            { key: 'eviction_policy', label: 'Eviction Policy', type: 'string', defaultValue: 'allkeys-lru' },
                            { key: 'persistence', label: 'Persistence', type: 'boolean', defaultValue: false },
                            { key: 'cluster_mode', label: 'Cluster Mode', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'sqlite', name: 'SQLite', icon: 'sqlite', provider: 'SQLite', tags: ['database', 'embedded'],
                        // config: [
                        //     { key: 'journal_mode', label: 'Journal Mode', type: 'string', defaultValue: 'WAL' },
                        //     { key: 'cache_size_kb', label: 'Cache Size', type: 'number', defaultValue: 2000, unit: 'KB' },
                        // ],
                    },
                    {
                        id: 'cassandra', name: 'Cassandra', icon: 'cassandra', provider: 'Apache', tags: ['database', 'nosql'],
                        config: [
                            { key: 'replication_factor', label: 'Replication Factor', type: 'number', defaultValue: 3 },
                            { key: 'consistency_level', label: 'Consistency Level', type: 'string', defaultValue: 'QUORUM' },
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 50, unit: 'GB' },
                        ],
                    },
                    {
                        id: 'dynamodb', name: 'DynamoDB', icon: 'dynamodb', provider: 'Amazon', tags: ['database', 'nosql'],
                        config: [
                            { key: 'read_capacity', label: 'Read Capacity', type: 'number', defaultValue: 5, unit: 'RCU' },
                            { key: 'write_capacity', label: 'Write Capacity', type: 'number', defaultValue: 5, unit: 'WCU' },
                            { key: 'on_demand', label: 'On-Demand Mode', type: 'boolean', defaultValue: true },
                            { key: 'encryption', label: 'Encryption', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'supabase', name: 'Supabase', icon: 'supabase', provider: 'Supabase', tags: ['database', 'baas'],
                        config: [
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 8, unit: 'GB' },
                            { key: 'max_connections', label: 'Max Connections', type: 'number', defaultValue: 60 },
                            { key: 'realtime', label: 'Realtime', type: 'boolean', defaultValue: true },
                            { key: 'row_level_security', label: 'Row Level Security', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'firebase', name: 'Firebase', icon: 'firebase', provider: 'Google', tags: ['database', 'baas'],
                        config: [
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 1, unit: 'GB' },
                            { key: 'realtime_connections', label: 'Realtime Connections', type: 'number', defaultValue: 100 },
                            { key: 'security_rules', label: 'Security Rules', type: 'boolean', defaultValue: true },
                        ],
                    },
                ],
            },
            {
                id: 'object-storage',
                label: 'Object Storage',
                nodes: [
                    {
                        id: 's3', name: 'AWS S3', icon: 'aws', provider: 'Amazon', tags: ['storage', 'object'],
                        config: [
                            { key: 'storage_class', label: 'Storage Class', type: 'string', defaultValue: 'STANDARD' },
                            { key: 'versioning', label: 'Versioning', type: 'boolean', defaultValue: false },
                            { key: 'encryption', label: 'Encryption', type: 'boolean', defaultValue: true },
                            { key: 'max_size_gb', label: 'Max Size', type: 'number', defaultValue: 100, unit: 'GB' },
                        ],
                    },
                    {
                        id: 'cloudinary', name: 'Cloudinary', icon: 'cloudinary', provider: 'Cloudinary', tags: ['storage', 'media'],
                        config: [
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 25, unit: 'GB' },
                            { key: 'bandwidth_gb', label: 'Bandwidth', type: 'number', defaultValue: 25, unit: 'GB' },
                            { key: 'transformations', label: 'Transformations/mo', type: 'number', defaultValue: 25000 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'infrastructure',
        label: 'Infrastructure',
        subCategories: [
            {
                id: 'cdn',
                label: 'CDN',
                nodes: [
                    {
                        id: 'cloudflare', name: 'Cloudflare', icon: 'cloudflare', provider: 'Cloudflare', tags: ['cdn', 'dns'],
                        config: [
                            { key: 'cdn_nodes', label: 'CDN Nodes', type: 'number', defaultValue: 200 },
                            { key: 'cache_ttl_s', label: 'Cache TTL', type: 'number', defaultValue: 3600, unit: 's' },
                            { key: 'ddos_protection', label: 'DDoS Protection', type: 'boolean', defaultValue: true },
                            { key: 'waf_enabled', label: 'WAF Enabled', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'fastly', name: 'Fastly', icon: 'fastly', provider: 'Fastly', tags: ['cdn', 'edge'],
                        config: [
                            { key: 'cdn_nodes', label: 'CDN Nodes', type: 'number', defaultValue: 80 },
                            { key: 'cache_ttl_s', label: 'Cache TTL', type: 'number', defaultValue: 3600, unit: 's' },
                            { key: 'bandwidth_tb', label: 'Bandwidth', type: 'number', defaultValue: 1, unit: 'TB' },
                        ],
                    },
                ],
            },
            {
                id: 'dns',
                label: 'DNS & Networking',
                nodes: [
                    {
                        id: 'nginx', name: 'Nginx', icon: 'nginx', provider: 'F5', tags: ['proxy', 'web-server'],
                        config: [
                            { key: 'worker_processes', label: 'Worker Processes', type: 'number', defaultValue: 4 },
                            { key: 'worker_connections', label: 'Worker Connections', type: 'number', defaultValue: 1024 },
                            { key: 'capacity_rps', label: 'Capacity', type: 'number', defaultValue: 10000, unit: 'rps' },
                            { key: 'ssl_termination', label: 'SSL Termination', type: 'boolean', defaultValue: true },
                            { key: 'load_balancing', label: 'Load Balancing', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'traefik', name: 'Traefik', icon: 'traefik', provider: 'Traefik', tags: ['proxy', 'load-balancer'],
                        config: [
                            { key: 'capacity_rps', label: 'Capacity', type: 'number', defaultValue: 8000, unit: 'rps' },
                            { key: 'auto_ssl', label: 'Auto SSL (Let\'s Encrypt)', type: 'boolean', defaultValue: true },
                            { key: 'dashboard_enabled', label: 'Dashboard', type: 'boolean', defaultValue: false },
                            { key: 'rate_limit_rps', label: 'Rate Limit', type: 'number', defaultValue: 100, unit: 'rps' },
                        ],
                    },
                ],
            },
            {
                id: 'iac',
                label: 'IaC & Config',
                nodes: [
                    {
                        id: 'terraform', name: 'Terraform', icon: 'terraform', provider: 'HashiCorp', tags: ['iac', 'provisioning'],
                        config: [
                            { key: 'state_backend', label: 'State Backend', type: 'string', defaultValue: 's3' },
                            { key: 'parallelism', label: 'Parallelism', type: 'number', defaultValue: 10 },
                            { key: 'auto_approve', label: 'Auto Approve', type: 'boolean', defaultValue: false },
                        ],
                    },
                    {
                        id: 'ansible', name: 'Ansible', icon: 'ansible', provider: 'Red Hat', tags: ['iac', 'config'],
                        config: [
                            { key: 'forks', label: 'Forks', type: 'number', defaultValue: 5 },
                            { key: 'timeout_s', label: 'SSH Timeout', type: 'number', defaultValue: 30, unit: 's' },
                            { key: 'become', label: 'Become (sudo)', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'pulumi', name: 'Pulumi', icon: 'pulumi', provider: 'Pulumi', tags: ['iac', 'provisioning'],
                        config: [
                            { key: 'language', label: 'Language', type: 'string', defaultValue: 'typescript' },
                            { key: 'parallelism', label: 'Parallelism', type: 'number', defaultValue: 16 },
                            { key: 'refresh_on_deploy', label: 'Refresh on Deploy', type: 'boolean', defaultValue: true },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'pipelines',
        label: 'Pipelines',
        subCategories: [
            {
                id: 'ci-cd',
                label: 'CI/CD',
                nodes: [
                    {
                        id: 'github-actions', name: 'GitHub Actions', icon: 'githubactions', provider: 'GitHub', tags: ['ci', 'cd'],
                        config: [
                            { key: 'runners', label: 'Runners', type: 'number', defaultValue: 2 },
                            { key: 'timeout_min', label: 'Job Timeout', type: 'number', defaultValue: 60, unit: 'min' },
                            { key: 'self_hosted', label: 'Self-Hosted', type: 'boolean', defaultValue: false },
                            { key: 'concurrency', label: 'Concurrency', type: 'number', defaultValue: 5 },
                        ],
                    },
                    {
                        id: 'jenkins', name: 'Jenkins', icon: 'jenkins', provider: 'Jenkins', tags: ['ci', 'cd'],
                        config: [
                            { key: 'executors', label: 'Executors', type: 'number', defaultValue: 4 },
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                            { key: 'pipeline_timeout_min', label: 'Pipeline Timeout', type: 'number', defaultValue: 120, unit: 'min' },
                        ],
                    },
                    {
                        id: 'circleci', name: 'CircleCI', icon: 'circleci', provider: 'CircleCI', tags: ['ci', 'cd'],
                        config: [
                            { key: 'parallelism', label: 'Parallelism', type: 'number', defaultValue: 2 },
                            { key: 'resource_class', label: 'Resource Class', type: 'string', defaultValue: 'medium' },
                            { key: 'timeout_min', label: 'Job Timeout', type: 'number', defaultValue: 60, unit: 'min' },
                        ],
                    },
                    {
                        id: 'gitlab-ci', name: 'GitLab CI', icon: 'gitlab', provider: 'GitLab', tags: ['ci', 'cd'],
                        config: [
                            { key: 'runners', label: 'Runners', type: 'number', defaultValue: 2 },
                            { key: 'timeout_min', label: 'Job Timeout', type: 'number', defaultValue: 60, unit: 'min' },
                            { key: 'cache_enabled', label: 'Cache Enabled', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'argocd', name: 'ArgoCD', icon: 'argocd', provider: 'CNCF', tags: ['cd', 'gitops'],
                        config: [
                            { key: 'sync_policy', label: 'Sync Policy', type: 'string', defaultValue: 'automated' },
                            { key: 'self_heal', label: 'Self Heal', type: 'boolean', defaultValue: true },
                            { key: 'prune', label: 'Auto Prune', type: 'boolean', defaultValue: false },
                        ],
                    },
                ],
            },
            {
                id: 'messaging',
                label: 'Messaging',
                nodes: [
                    {
                        id: 'kafka', name: 'Kafka', icon: 'kafka', provider: 'Apache', tags: ['messaging', 'streaming'],
                        config: [
                            { key: 'partitions', label: 'Partitions', type: 'number', defaultValue: 6 },
                            { key: 'replication_factor', label: 'Replication Factor', type: 'number', defaultValue: 3 },
                            { key: 'retention_hours', label: 'Retention', type: 'number', defaultValue: 168, unit: 'hrs' },
                            { key: 'throughput_mbps', label: 'Throughput', type: 'number', defaultValue: 100, unit: 'MB/s' },
                        ],
                    },
                    {
                        id: 'rabbitmq', name: 'RabbitMQ', icon: 'rabbitmq', provider: 'VMware', tags: ['messaging', 'queue'],
                        config: [
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 2, unit: 'GB' },
                            { key: 'max_queues', label: 'Max Queues', type: 'number', defaultValue: 1000 },
                            { key: 'throughput_msgs', label: 'Throughput', type: 'number', defaultValue: 50000, unit: 'msg/s' },
                            { key: 'ha_enabled', label: 'HA Enabled', type: 'boolean', defaultValue: false },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'security',
        label: 'Security',
        subCategories: [
            {
                id: 'auth',
                label: 'Authentication',
                nodes: [
                    {
                        id: 'auth0', name: 'Auth0', icon: 'auth0', provider: 'Okta', tags: ['auth', 'identity'],
                        config: [
                            { key: 'mfa_enabled', label: 'MFA Enabled', type: 'boolean', defaultValue: false },
                            { key: 'social_login', label: 'Social Login', type: 'boolean', defaultValue: true },
                            { key: 'max_users', label: 'Max Users', type: 'number', defaultValue: 7000 },
                            { key: 'token_expiry_s', label: 'Token Expiry', type: 'number', defaultValue: 86400, unit: 's' },
                        ],
                    },
                    {
                        id: 'clerk', name: 'Clerk', icon: 'clerk', provider: 'Clerk', tags: ['auth', 'identity'],
                        config: [
                            { key: 'mfa_enabled', label: 'MFA Enabled', type: 'boolean', defaultValue: false },
                            { key: 'social_login', label: 'Social Login', type: 'boolean', defaultValue: true },
                            { key: 'max_users', label: 'Max Users', type: 'number', defaultValue: 10000 },
                            { key: 'session_duration_s', label: 'Session Duration', type: 'number', defaultValue: 604800, unit: 's' },
                        ],
                    },
                    {
                        id: 'keycloak', name: 'Keycloak', icon: 'keycloak', provider: 'Red Hat', tags: ['auth', 'identity'],
                        config: [
                            { key: 'memory_gb', label: 'Memory', type: 'number', defaultValue: 2, unit: 'GB' },
                            { key: 'mfa_enabled', label: 'MFA Enabled', type: 'boolean', defaultValue: false },
                            { key: 'realms', label: 'Realms', type: 'number', defaultValue: 1 },
                            { key: 'ha_enabled', label: 'HA Enabled', type: 'boolean', defaultValue: false },
                        ],
                    },
                ],
            },
            {
                id: 'secrets',
                label: 'Secrets & Vault',
                nodes: [
                    {
                        id: 'vault', name: 'Vault', icon: 'vault', provider: 'HashiCorp', tags: ['secrets', 'security'],
                        config: [
                            { key: 'storage_backend', label: 'Storage Backend', type: 'string', defaultValue: 'consul' },
                            { key: 'seal_type', label: 'Seal Type', type: 'string', defaultValue: 'shamir' },
                            { key: 'ha_enabled', label: 'HA Enabled', type: 'boolean', defaultValue: false },
                            { key: 'audit_logging', label: 'Audit Logging', type: 'boolean', defaultValue: true },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'monitoring',
        label: 'Monitoring',
        subCategories: [
            {
                id: 'observability',
                label: 'Observability',
                nodes: [
                    {
                        id: 'grafana', name: 'Grafana', icon: 'grafana', provider: 'Grafana Labs', tags: ['monitoring', 'dashboards'],
                        config: [
                            { key: 'retention_days', label: 'Retention', type: 'number', defaultValue: 30, unit: 'days' },
                            { key: 'dashboards', label: 'Dashboards', type: 'number', defaultValue: 10 },
                            { key: 'alerting', label: 'Alerting', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'prometheus', name: 'Prometheus', icon: 'prometheus', provider: 'CNCF', tags: ['monitoring', 'metrics'],
                        config: [
                            { key: 'retention_days', label: 'Retention', type: 'number', defaultValue: 15, unit: 'days' },
                            { key: 'scrape_interval_s', label: 'Scrape Interval', type: 'number', defaultValue: 15, unit: 's' },
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 50, unit: 'GB' },
                        ],
                    },
                    {
                        id: 'datadog', name: 'Datadog', icon: 'datadog', provider: 'Datadog', tags: ['monitoring', 'apm'],
                        config: [
                            { key: 'retention_days', label: 'Retention', type: 'number', defaultValue: 15, unit: 'days' },
                            { key: 'apm_enabled', label: 'APM Enabled', type: 'boolean', defaultValue: true },
                            { key: 'log_ingestion', label: 'Log Ingestion', type: 'boolean', defaultValue: true },
                            { key: 'custom_metrics', label: 'Custom Metrics', type: 'number', defaultValue: 100 },
                        ],
                    },
                    {
                        id: 'sentry', name: 'Sentry', icon: 'sentry', provider: 'Sentry', tags: ['monitoring', 'errors'],
                        config: [
                            { key: 'retention_days', label: 'Retention', type: 'number', defaultValue: 90, unit: 'days' },
                            { key: 'events_per_month', label: 'Events/Month', type: 'number', defaultValue: 50000 },
                            { key: 'performance_monitoring', label: 'Performance Monitoring', type: 'boolean', defaultValue: true },
                            { key: 'sample_rate', label: 'Sample Rate', type: 'number', defaultValue: 1.0 },
                        ],
                    },
                ],
            },
            {
                id: 'logging',
                label: 'Logging',
                nodes: [
                    {
                        id: 'elasticsearch', name: 'Elasticsearch', icon: 'elasticsearch', provider: 'Elastic', tags: ['logging', 'search'],
                        config: [
                            { key: 'shards', label: 'Shards', type: 'number', defaultValue: 5 },
                            { key: 'replicas', label: 'Replicas', type: 'number', defaultValue: 1 },
                            { key: 'storage_gb', label: 'Storage', type: 'number', defaultValue: 100, unit: 'GB' },
                            { key: 'memory_gb', label: 'Heap Memory', type: 'number', defaultValue: 4, unit: 'GB' },
                            { key: 'retention_days', label: 'Retention', type: 'number', defaultValue: 30, unit: 'days' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'frontend',
        label: 'Frontend',
        subCategories: [
            {
                id: 'frameworks',
                label: 'Frameworks',
                nodes: [
                    {
                        id: 'react', name: 'React', icon: 'react', provider: 'Meta', tags: ['frontend', 'ui'],
                        config: [
                            { key: 'ssr', label: 'SSR Enabled', type: 'boolean', defaultValue: false },
                            { key: 'bundle_size_kb', label: 'Bundle Size', type: 'number', defaultValue: 150, unit: 'KB' },
                            { key: 'port', label: 'Dev Port', type: 'number', defaultValue: 3000 },
                        ],
                    },
                    {
                        id: 'nextjs', name: 'Next.js', icon: 'nextjs', provider: 'Vercel', tags: ['frontend', 'ssr'],
                        config: [
                            { key: 'ssr', label: 'SSR Enabled', type: 'boolean', defaultValue: true },
                            { key: 'isr', label: 'ISR Enabled', type: 'boolean', defaultValue: false },
                            { key: 'image_optimization', label: 'Image Optimization', type: 'boolean', defaultValue: true },
                            { key: 'port', label: 'Dev Port', type: 'number', defaultValue: 3000 },
                        ],
                    },
                    {
                        id: 'vuejs', name: 'Vue.js', icon: 'vuejs', provider: 'Vue', tags: ['frontend', 'ui'],
                        config: [
                            { key: 'ssr', label: 'SSR Enabled', type: 'boolean', defaultValue: false },
                            { key: 'bundle_size_kb', label: 'Bundle Size', type: 'number', defaultValue: 100, unit: 'KB' },
                            { key: 'port', label: 'Dev Port', type: 'number', defaultValue: 5173 },
                        ],
                    },
                    {
                        id: 'angular', name: 'Angular', icon: 'angular', provider: 'Google', tags: ['frontend', 'ui'],
                        config: [
                            { key: 'ssr', label: 'SSR Enabled', type: 'boolean', defaultValue: false },
                            { key: 'bundle_size_kb', label: 'Bundle Size', type: 'number', defaultValue: 250, unit: 'KB' },
                            { key: 'port', label: 'Dev Port', type: 'number', defaultValue: 4200 },
                        ],
                    },
                    {
                        id: 'svelte', name: 'Svelte', icon: 'svelte', provider: 'Svelte', tags: ['frontend', 'ui'],
                        config: [
                            { key: 'ssr', label: 'SSR Enabled', type: 'boolean', defaultValue: false },
                            { key: 'bundle_size_kb', label: 'Bundle Size', type: 'number', defaultValue: 50, unit: 'KB' },
                            { key: 'port', label: 'Dev Port', type: 'number', defaultValue: 5173 },
                        ],
                    },
                    {
                        id: 'nuxtjs', name: 'Nuxt.js', icon: 'nuxtjs', provider: 'Nuxt', tags: ['frontend', 'ssr'],
                        config: [
                            { key: 'ssr', label: 'SSR Enabled', type: 'boolean', defaultValue: true },
                            { key: 'nitro', label: 'Nitro Engine', type: 'boolean', defaultValue: true },
                            { key: 'port', label: 'Dev Port', type: 'number', defaultValue: 3000 },
                        ],
                    },
                ],
            },
            {
                id: 'mobile',
                label: 'Mobile',
                nodes: [
                    {
                        id: 'flutter', name: 'Flutter', icon: 'flutter', provider: 'Google', tags: ['mobile', 'cross-platform'],
                        config: [
                            { key: 'platforms', label: 'Target Platforms', type: 'string', defaultValue: 'ios,android' },
                            { key: 'null_safety', label: 'Null Safety', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'reactnative', name: 'React Native', icon: 'react', provider: 'Meta', tags: ['mobile', 'cross-platform'],
                        config: [
                            { key: 'platforms', label: 'Target Platforms', type: 'string', defaultValue: 'ios,android' },
                            { key: 'new_architecture', label: 'New Architecture', type: 'boolean', defaultValue: true },
                            { key: 'hermes', label: 'Hermes Engine', type: 'boolean', defaultValue: true },
                        ],
                    },
                    {
                        id: 'swift', name: 'Swift', icon: 'swift', provider: 'Apple', tags: ['mobile', 'ios'],
                        config: [
                            { key: 'min_ios', label: 'Min iOS Version', type: 'string', defaultValue: '16.0' },
                            { key: 'swift_version', label: 'Swift Version', type: 'string', defaultValue: '5.9' },
                        ],
                    },
                    {
                        id: 'kotlin', name: 'Kotlin', icon: 'kotlin', provider: 'JetBrains', tags: ['mobile', 'android'],
                        config: [
                            { key: 'min_sdk', label: 'Min SDK', type: 'number', defaultValue: 24 },
                            { key: 'compose', label: 'Jetpack Compose', type: 'boolean', defaultValue: true },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        subCategories: [
            {
                id: 'languages',
                label: 'Languages & Runtimes',
                nodes: [
                    {
                        id: 'nodejs', name: 'Node.js', icon: 'nodejs', provider: 'OpenJS', tags: ['runtime', 'javascript'],
                        config: [
                            { key: 'version', label: 'Version', type: 'string', defaultValue: '20.x' },
                            { key: 'memory_mb', label: 'Max Memory', type: 'number', defaultValue: 512, unit: 'MB' },
                            { key: 'cluster_mode', label: 'Cluster Mode', type: 'boolean', defaultValue: false },
                            { key: 'port', label: 'Port', type: 'number', defaultValue: 3000 },
                        ],
                    },
                    {
                        id: 'python', name: 'Python', icon: 'python', provider: 'PSF', tags: ['language', 'backend'],
                        config: [
                            { key: 'version', label: 'Version', type: 'string', defaultValue: '3.12' },
                            { key: 'workers', label: 'Workers', type: 'number', defaultValue: 4 },
                            { key: 'async', label: 'Async Runtime', type: 'boolean', defaultValue: false },
                            { key: 'port', label: 'Port', type: 'number', defaultValue: 8000 },
                        ],
                    },
                    {
                        id: 'go', name: 'Go', icon: 'go', provider: 'Google', tags: ['language', 'backend'],
                        config: [
                            { key: 'version', label: 'Version', type: 'string', defaultValue: '1.22' },
                            { key: 'goroutines_max', label: 'Max Goroutines', type: 'number', defaultValue: 10000 },
                            { key: 'port', label: 'Port', type: 'number', defaultValue: 8080 },
                        ],
                    },
                    {
                        id: 'rust', name: 'Rust', icon: 'rust', provider: 'Rust Foundation', tags: ['language', 'backend'],
                        config: [
                            { key: 'edition', label: 'Edition', type: 'string', defaultValue: '2021' },
                            { key: 'release_mode', label: 'Release Mode', type: 'boolean', defaultValue: true },
                            { key: 'port', label: 'Port', type: 'number', defaultValue: 8080 },
                        ],
                    },
                    {
                        id: 'java', name: 'Java', icon: 'java', provider: 'Oracle', tags: ['language', 'backend'],
                        config: [
                            { key: 'version', label: 'Version', type: 'string', defaultValue: '21' },
                            { key: 'heap_mb', label: 'Heap Size', type: 'number', defaultValue: 512, unit: 'MB' },
                            { key: 'gc', label: 'GC Type', type: 'string', defaultValue: 'G1' },
                            { key: 'port', label: 'Port', type: 'number', defaultValue: 8080 },
                        ],
                    },
                    {
                        id: 'dotnet', name: '.NET', icon: 'dotnet', provider: 'Microsoft', tags: ['framework', 'backend'],
                        config: [
                            { key: 'version', label: 'Version', type: 'string', defaultValue: '8.0' },
                            { key: 'memory_mb', label: 'Memory', type: 'number', defaultValue: 512, unit: 'MB' },
                            { key: 'kestrel', label: 'Kestrel Server', type: 'boolean', defaultValue: true },
                            { key: 'port', label: 'Port', type: 'number', defaultValue: 5000 },
                        ],
                    },
                ],
            },
            {
                id: 'api',
                label: 'API',
                nodes: [
                    {
                        id: 'graphql', name: 'GraphQL', icon: 'graphql', provider: 'GraphQL Foundation', tags: ['api', 'query'],
                        config: [
                            { key: 'max_depth', label: 'Max Query Depth', type: 'number', defaultValue: 10 },
                            { key: 'introspection', label: 'Introspection', type: 'boolean', defaultValue: true },
                            { key: 'rate_limit_rps', label: 'Rate Limit', type: 'number', defaultValue: 1000, unit: 'rps' },
                            { key: 'latency_ms', label: 'Avg Latency', type: 'number', defaultValue: 50, unit: 'ms' },
                        ],
                    },
                    {
                        id: 'grpc', name: 'gRPC', icon: 'grpc', provider: 'CNCF', tags: ['api', 'rpc'],
                        config: [
                            { key: 'max_message_mb', label: 'Max Message Size', type: 'number', defaultValue: 4, unit: 'MB' },
                            { key: 'tls_enabled', label: 'TLS Enabled', type: 'boolean', defaultValue: true },
                            { key: 'latency_ms', label: 'Avg Latency', type: 'number', defaultValue: 10, unit: 'ms' },
                            { key: 'concurrent_streams', label: 'Concurrent Streams', type: 'number', defaultValue: 100 },
                        ],
                    },
                ],
            },
        ],
    },
];

// Flatten all nodes for search
export function getAllNodes(): NodeMetadata[] {
    const nodes: NodeMetadata[] = [];
    const seen = new Set<string>();
    for (const category of nodeCategories) {
        for (const subCategory of category.subCategories) {
            for (const node of subCategory.nodes) {
                if (!seen.has(node.id)) {
                    seen.add(node.id);
                    nodes.push(node);
                }
            }
        }
    }
    return nodes;
}

// Search across categories, subcategories, and nodes
export function searchNodes(query: string): Category[] {
    const q = query.toLowerCase();
    return nodeCategories
        .map((category) => {
            const filteredSubCategories = category.subCategories
                .map((sub) => {
                    const filteredNodes = sub.nodes.filter(
                        (node) =>
                            node.name.toLowerCase().includes(q) ||
                            node.icon.toLowerCase().includes(q) ||
                            node.provider?.toLowerCase().includes(q) ||
                            node.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
                            sub.label.toLowerCase().includes(q) ||
                            category.label.toLowerCase().includes(q)
                    );
                    return { ...sub, nodes: filteredNodes };
                })
                .filter((sub) => sub.nodes.length > 0);
            return { ...category, subCategories: filteredSubCategories };
        })
        .filter((cat) => cat.subCategories.length > 0);
}

// Look up a node by its ID
export function getNodeById(id: string): NodeMetadata | undefined {
    for (const category of nodeCategories) {
        for (const subCategory of category.subCategories) {
            for (const node of subCategory.nodes) {
                if (node.id === id) return node;
            }
        }
    }
    return undefined;
}
