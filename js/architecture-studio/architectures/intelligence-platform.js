/**
 * INTELLIGENCE PLATFORM — COMPLETE DATA-TO-AI ARCHITECTURE
 * 
 * Single source of truth for all nodes, connections, scenarios, and case studies.
 * All counts are calculated programmatically from this configuration.
 * 
 * Version: 1.0
 * Last Updated: December 2024
 */

export const intelligencePlatform = {
    metadata: {
        id: 'intelligence-platform',
        name: 'Intelligence Platform — Data to AI',
        tagline: 'From social media APIs to production AI agents',
        description: 'Complete end-to-end system demonstrating data ingestion, processing, storage, ML/AI, and production deployment.',
        version: '1.0'
    },
    
    // === NODES DEFINITION (36 total) ===
    // Each node must have: id, name, layer, experience, project, icon, color, size, tooltip, details
    nodes: [
        // ========================================
        // LAYER 1: DATA SOURCES (5 nodes)
        // ========================================
        {
            id: 'social-media-api',
            name: 'Social Media APIs',
            layer: 'sources',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '📱',
            color: '#3b82f6',
            size: 35,
            position: { x: 100, y: 100 },
            tooltip: {
                title: 'Social Media APIs',
                description: 'Twitter, TikTok, Instagram APIs for data collection',
                technologies: ['REST APIs', 'OAuth', 'Rate Limiting'],
                experience: 'Built in SignalForge project: scraped TikTok influencer data'
            },
            details: {
                why: 'APIs provide structured data access with rate limits and authentication. More reliable than web scraping for social platforms.',
                how: 'OAuth authentication, paginated requests, respect rate limits (typically 300 req/15min).',
                tradeoffs: 'Limited to public data, strict rate limits, API changes break integrations.',
                alternatives: ['Web scraping (less reliable)', 'Firehose access (expensive)', 'Third-party aggregators'],
                whenToUse: ['Need structured data', 'Want reliable access', 'Can handle rate limits']
            }
        },
        
        {
            id: 'web-scraping',
            name: 'Web Scraping',
            layer: 'sources',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '🕷️',
            color: '#8b5cf6',
            size: 35,
            position: { x: 100, y: 200 },
            tooltip: {
                title: 'Web Scraping',
                description: 'Automated data extraction from websites using Playwright',
                technologies: ['Playwright', 'BeautifulSoup', 'Selenium'],
                experience: 'SignalForge: distributed scraping architecture with session management'
            },
            details: {
                why: 'When no API exists, scraping is the only option. Playwright handles JavaScript-heavy sites.',
                how: 'Headless browser automation, CSS selectors, wait for dynamic content, handle pagination.',
                tradeoffs: 'Fragile (breaks when HTML changes), rate-limited, ethical concerns, legal gray area.',
                alternatives: ['Paid APIs', 'Pre-built datasets', 'Manual data entry'],
                whenToUse: ['No API available', 'Need complete page data', 'Can handle maintenance']
            }
        },
        
        {
            id: 'public-datasets',
            name: 'Public Datasets',
            layer: 'sources',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '📊',
            color: '#10b981',
            size: 35,
            position: { x: 100, y: 300 },
            tooltip: {
                title: 'Public Datasets',
                description: 'Kaggle, UCI ML Repository, government open data',
                technologies: ['CSV', 'Parquet', 'JSON'],
                experience: 'UBIAI Internship/PFE: Used SQuAD and CoQA datasets for NLP training'
            },
            details: {
                why: 'Pre-cleaned, labeled data accelerates ML development. No collection infrastructure needed.',
                how: 'Download from Kaggle/HuggingFace, load with pandas/datasets library, validate schema.',
                tradeoffs: 'May not fit exact use case, outdated, licensing restrictions.',
                alternatives: ['Collect own data', 'Synthetic data generation', 'Data augmentation'],
                whenToUse: ['Prototyping ML models', 'Benchmarking algorithms', 'Research projects']
            }
        },
        
        {
            id: 'file-uploads',
            name: 'File Uploads',
            layer: 'sources',
            experience: 'personal-project',
            project: 'Agricultural Marketplace',
            icon: '📁',
            color: '#f59e0b',
            size: 30,
            position: { x: 100, y: 400 },
            tooltip: {
                title: 'User File Uploads',
                description: 'CSV, Excel, JSON uploads via web interface',
                technologies: ['Django File Handling', 'FastAPI UploadFile', 'pandas'],
                experience: 'Agricultural Marketplace: Farmers upload product CSVs for batch import'
            },
            details: {
                why: 'Users have data in spreadsheets. File upload is simplest UX for bulk data entry.',
                how: 'Multipart form upload, validate file type/size, parse with pandas, validate schema, import to database.',
                tradeoffs: 'No real-time updates, users must prepare files correctly, security risks (malicious files).',
                alternatives: ['Manual form entry', 'API integrations', 'Direct database access'],
                whenToUse: ['Bulk data import', 'One-time migrations', 'User-generated data']
            }
        },
        
        {
            id: 'iot-sensors',
            name: 'IoT Sensors',
            layer: 'sources',
            experience: 'architecture-familiarity',
            project: null,
            icon: '📡',
            color: '#ef4444',
            size: 25,
            position: { x: 100, y: 500 },
            tooltip: {
                title: 'IoT Sensor Data',
                description: 'Time-series data from industrial sensors (MQTT protocol)',
                technologies: ['MQTT', 'InfluxDB', 'TimescaleDB'],
                experience: 'Architecture familiarity: Common pattern in industrial IoT pipelines'
            },
            details: {
                why: 'Real-time sensor data for monitoring equipment, environment, infrastructure.',
                how: 'MQTT broker receives sensor messages, store in time-series database, alert on anomalies.',
                tradeoffs: 'High volume (millions of events/day), network reliability, sensor calibration.',
                alternatives: ['Polling APIs', 'Log file collection', 'Manual readings'],
                whenToUse: ['Real-time monitoring', 'Predictive maintenance', 'Industrial automation']
            }
        },
        
        // ========================================
        // LAYER 2: INGESTION (3 nodes)
        // ========================================
        {
            id: 'kafka',
            name: 'Apache Kafka',
            layer: 'ingestion',
            experience: 'personal-project',
            project: 'SignalForge, E-commerce',
            icon: '📨',
            color: '#8b5cf6',
            size: 50,
            position: { x: 350, y: 250 },
            tooltip: {
                title: 'Apache Kafka',
                description: 'Distributed event streaming platform',
                technologies: ['Kafka 3.x', 'Consumer Groups', 'DLQ'],
                experience: 'SignalForge & E-commerce: High-throughput message streaming'
            },
            details: {
                why: 'Handles high-throughput real-time data. Provides replay capability for debugging. Consumer groups enable horizontal scaling.',
                how: 'Producers write to topics, consumers read in groups. Partitions enable parallelism. Commit offsets to track progress.',
                tradeoffs: 'Complex to operate (ZooKeeper pre-3.x, topic management), higher latency than Redis (2-10ms).',
                alternatives: ['Redis Streams (simpler)', 'RabbitMQ (traditional MQ)', 'AWS SQS (managed)', 'Pulsar (newer)'],
                whenToUse: ['High throughput (>10k msg/sec)', 'Need message replay', 'Event-driven microservices', 'Stream processing pipelines']
            }
        },
        
        {
            id: 'nifi',
            name: 'Apache NiFi',
            layer: 'ingestion',
            experience: 'architecture-familiarity',
            project: null,
            icon: '🔄',
            color: '#3b82f6',
            size: 35,
            position: { x: 350, y: 150 },
            tooltip: {
                title: 'Apache NiFi',
                description: 'Visual data flow automation for batch ingestion',
                technologies: ['Flow-based ETL', 'Backpressure', 'Processors'],
                experience: 'Architecture familiarity: Alternative to Airflow for data ingestion'
            },
            details: {
                why: 'Visual drag-and-drop interface for data flows. Good for non-programmers.',
                how: 'Processors transform data, connections route between processors, flowfiles carry data.',
                tradeoffs: 'UI-heavy (less code), harder to version control flows, steeper learning curve than Python ETL.',
                alternatives: ['Apache Airflow (code-first)', 'Pentaho (ETL suite)', 'Talend'],
                whenToUse: ['Complex data routing', 'Need visual flow debugging', 'Real-time data ingestion']
            }
        },
        
        {
            id: 'rest-apis',
            name: 'REST APIs',
            layer: 'ingestion',
            experience: 'professional',
            project: 'UBIAI, All Projects',
            icon: '🔌',
            color: '#10b981',
            size: 40,
            position: { x: 350, y: 350 },
            tooltip: {
                title: 'REST API Ingestion',
                description: 'Pull data from external REST APIs',
                technologies: ['Python requests', 'aiohttp', 'httpx'],
                experience: 'UBIAI Internship/PFE: Integrated REST APIs for document management'
            },
            details: {
                why: 'Standard HTTP-based integration. Most services provide REST APIs.',
                how: 'Make HTTP requests (GET/POST), handle auth (API keys, OAuth), parse JSON responses, handle rate limits and errors.',
                tradeoffs: 'Synchronous (one request at a time unless async), rate limits, API versioning.',
                alternatives: ['GraphQL (more efficient)', 'gRPC (faster)', 'WebSockets (real-time)'],
                whenToUse: ['Integrating third-party services', 'Standard HTTP APIs', 'Request-response patterns']
            }
        },
        
        // ========================================
        // LAYER 3: PROCESSING (4 nodes)
        // ========================================
        {
            id: 'airflow',
            name: 'Apache Airflow',
            layer: 'processing',
            experience: 'personal-project',
            project: 'Airflow Pipeline, E-commerce',
            icon: '🌊',
            color: '#06b6d4',
            size: 45,
            position: { x: 550, y: 150 },
            tooltip: {
                title: 'Apache Airflow',
                description: 'Workflow orchestration for batch processing',
                technologies: ['Airflow 2.10.5', 'DAGs', 'XCom'],
                experience: 'Built 5-task DAG with XCom data flow and comprehensive test suite'
            },
            details: {
                why: 'DAG-based orchestration for complex workflows. Built-in retry logic, backfilling, and monitoring UI.',
                how: 'Define workflows as Python DAGs, tasks run on schedule or trigger, XCom passes data between tasks.',
                tradeoffs: 'Not for real-time (minutes latency), complex setup (metadata DB, scheduler, workers), learning curve.',
                alternatives: ['Prefect (modern)', 'Dagster (data-aware)', 'Cron + scripts (simpler)', 'AWS Step Functions'],
                whenToUse: ['Batch ETL pipelines', 'Scheduled data jobs', 'Complex dependencies', 'Need monitoring/retry']
            }
        },
        
        {
            id: 'spark-streaming',
            name: 'Spark Streaming',
            layer: 'processing',
            experience: 'personal-project',
            project: 'E-commerce',
            icon: '⚡',
            color: '#f59e0b',
            size: 45,
            position: { x: 550, y: 300 },
            tooltip: {
                title: 'Apache Spark Streaming',
                description: 'Real-time stream processing with micro-batches',
                technologies: ['PySpark', 'Structured Streaming', 'Checkpoints'],
                experience: 'E-commerce: Real-time aggregations with Spark Streaming'
            },
            details: {
                why: 'Unified API for batch and streaming. Structured Streaming provides SQL-like operations on streams.',
                how: 'Read from Kafka, apply transformations (map, filter, aggregate), write to sink. Micro-batches every few seconds.',
                tradeoffs: 'Higher latency than Flink (2-5 seconds), resource-heavy (needs cluster), complex checkpointing.',
                alternatives: ['Apache Flink (true streaming)', 'Kafka Streams (simpler)', 'Storm (legacy)'],
                whenToUse: ['Already using Spark for batch', 'Need SQL on streams', 'Tolerate seconds latency']
            }
        },
        
        {
            id: 'spark-batch',
            name: 'Spark Batch',
            layer: 'processing',
            experience: 'personal-project',
            project: 'E-commerce',
            icon: '⚙️',
            color: '#8b5cf6',
            size: 40,
            position: { x: 550, y: 400 },
            tooltip: {
                title: 'Apache Spark (Batch)',
                description: 'Large-scale batch processing with distributed compute',
                technologies: ['PySpark', 'DataFrames', 'Hadoop/YARN'],
                experience: 'E-commerce: Historical data processing on Hadoop cluster'
            },
            details: {
                why: 'Process large datasets (TB+) that don\'t fit in memory. Distributed compute across cluster.',
                how: 'Load data (Parquet, CSV), apply transformations (lazy evaluation), write results. RDD/DataFrame API.',
                tradeoffs: 'Startup overhead (~10 seconds), memory-heavy (needs cluster), JVM-based (GC pauses).',
                alternatives: ['Pandas (single machine)', 'Dask (Python-native)', 'Presto (SQL)', 'BigQuery (managed)'],
                whenToUse: ['Data > 100GB', 'Complex transformations', 'Have cluster infrastructure', 'Batch analytics']
            }
        },
        
        {
            id: 'dbt',
            name: 'dbt',
            layer: 'processing',
            experience: 'architecture-familiarity',
            project: null,
            icon: '🔧',
            color: '#f97316',
            size: 30,
            position: { x: 550, y: 500 },
            tooltip: {
                title: 'dbt (Data Build Tool)',
                description: 'SQL-based transformations for analytics engineering',
                technologies: ['SQL', 'Jinja', 'dbt Cloud'],
                experience: 'Architecture familiarity: Industry standard for Silver → Gold transformations'
            },
            details: {
                why: 'Transforms raw data into analytics-ready tables using SQL. Version control for data transformations.',
                how: 'Write SQL models with Jinja templating, dbt compiles and runs them in order, tests validate data quality.',
                tradeoffs: 'SQL-only (no Python), limited to warehouse transformations, learning curve for Jinja macros.',
                alternatives: ['Python scripts', 'Stored procedures', 'Airflow + SQL', 'Spark SQL'],
                whenToUse: ['Analytics engineering', 'Data warehouse transformations', 'Team knows SQL better than Python']
            }
        },
        
        // ========================================
        // LAYER 4: STORAGE (6 nodes)
        // ========================================
        {
            id: 'data-lake-s3',
            name: 'Data Lake (S3)',
            layer: 'storage',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🪣',
            color: '#f59e0b',
            size: 40,
            position: { x: 800, y: 100 },
            tooltip: {
                title: 'Data Lake (AWS S3)',
                description: 'Raw data storage (Bronze layer)',
                technologies: ['S3', 'Parquet', 'Delta Lake'],
                experience: 'UBIAI Internship/PFE: Stored raw documents in S3 for NLP pipelines'
            },
            details: {
                why: 'Cheap, durable storage for raw data. Store everything, decide what to process later.',
                how: 'Store files as Parquet/JSON in S3, organize by date partitions, query with Athena/Spark.',
                tradeoffs: 'No schema enforcement, slow for small queries, eventual consistency.',
                alternatives: ['HDFS (on-prem)', 'Azure Blob', 'GCS', 'MinIO (self-hosted)'],
                whenToUse: ['Store raw data', 'Need cheap storage', 'Infrequent access', 'Archival']
            }
        },
        
        {
            id: 'lakehouse-bronze',
            name: 'Bronze Layer',
            layer: 'storage',
            experience: 'architecture-familiarity',
            project: null,
            icon: '🥉',
            color: '#78350f',
            size: 35,
            position: { x: 800, y: 200 },
            tooltip: {
                title: 'Medallion Architecture: Bronze',
                description: 'Raw data landing zone (as-is from source)',
                technologies: ['Delta Lake', 'Apache Iceberg', 'Parquet'],
                experience: 'Architecture pattern: My Kafka ingestion fits this layer'
            },
            details: {
                why: 'Preserve raw data exactly as received. Enables reprocessing if transformations change.',
                how: 'Append-only writes, no transformations, include metadata (load timestamp, source system).',
                tradeoffs: 'Duplicate data (raw + transformed), storage costs, no query optimization.',
                alternatives: ['Skip Bronze (risky)', 'Directly to Silver (less flexibility)'],
                whenToUse: ['Need data lineage', 'Audit requirements', 'Want reprocessing capability']
            }
        },
        
        {
            id: 'lakehouse-silver',
            name: 'Silver Layer',
            layer: 'storage',
            experience: 'architecture-familiarity',
            project: null,
            icon: '🥈',
            color: '#71717a',
            size: 35,
            position: { x: 800, y: 270 },
            tooltip: {
                title: 'Medallion Architecture: Silver',
                description: 'Cleansed, conformed, deduplicated data',
                technologies: ['Spark transformations', 'Data quality checks'],
                experience: 'Architecture pattern: My Spark processing implements this layer'
            },
            details: {
                why: 'Clean data once, use many times. Deduplication, type casting, standardization.',
                how: 'Read from Bronze, apply transformations (dedupe, validate, standardize), write to Silver.',
                tradeoffs: 'Adds processing latency, storage duplication, requires data quality rules.',
                alternatives: ['Direct Bronze → Gold (faster but less reusable)'],
                whenToUse: ['Multiple downstream consumers', 'Need data quality', 'Reusable clean data']
            }
        },
        
        {
            id: 'lakehouse-gold',
            name: 'Gold Layer',
            layer: 'storage',
            experience: 'architecture-familiarity',
            project: null,
            icon: '🥇',
            color: '#fbbf24',
            size: 35,
            position: { x: 800, y: 340 },
            tooltip: {
                title: 'Medallion Architecture: Gold',
                description: 'Business-ready aggregates (star schema)',
                technologies: ['dbt models', 'Star schema', 'Aggregations'],
                experience: 'Architecture pattern: My API endpoints serve Gold-layer data'
            },
            details: {
                why: 'Optimized for analytics queries. Denormalized, pre-aggregated, business-friendly column names.',
                how: 'Join Silver tables, aggregate metrics, create star schema (fact + dimension tables).',
                tradeoffs: 'Storage duplication (3 copies: Bronze/Silver/Gold), update complexity.',
                alternatives: ['Views on Silver (no storage)', 'Materialized views (hybrid)'],
                whenToUse: ['Analytics/BI tools', 'Need fast queries', 'Business users querying data']
            }
        },
        
        {
            id: 'postgresql',
            name: 'PostgreSQL',
            layer: 'storage',
            experience: 'personal-project',
            project: 'All 4 Projects',
            icon: '🐘',
            color: '#10b981',
            size: 40,
            position: { x: 800, y: 420 },
            tooltip: {
                title: 'PostgreSQL',
                description: 'ACID-compliant relational database',
                technologies: ['PostgreSQL 14+', 'Foreign Keys', 'Indexes'],
                experience: 'Primary database in SignalForge, UBIAI, E-commerce, Agricultural projects'
            },
            details: {
                why: 'ACID guarantees for transactional data. Foreign keys maintain referential integrity.',
                how: 'Traditional RDBMS with SQL queries, transactions, constraints.',
                tradeoffs: 'Vertical scaling limits (single master), slower for analytics than columnar DBs.',
                alternatives: ['MySQL (similar)', 'CockroachDB (distributed)', 'Aurora (managed)', 'Snowflake (analytics)'],
                whenToUse: ['Structured data', 'ACID requirements', 'Complex joins', 'Transactional workloads']
            }
        },
        
        {
            id: 'redis',
            name: 'Redis',
            layer: 'storage',
            experience: 'personal-project',
            project: 'SignalForge, Agricultural, E-commerce',
            icon: '⚡',
            color: '#ef4444',
            size: 35,
            position: { x: 800, y: 500 },
            tooltip: {
                title: 'Redis',
                description: 'In-memory cache and session store',
                technologies: ['Redis 7.x', 'TTL', 'Pub/Sub'],
                experience: 'SignalForge: State management; Agricultural: 60% query reduction'
            },
            details: {
                why: 'Reduce database load for frequently accessed data. Sub-millisecond latency.',
                how: 'Key-value store in memory, optional persistence, atomic operations.',
                tradeoffs: 'Memory-bound (expensive at scale), single-threaded (CPU bottleneck), data loss risk if not persisted.',
                alternatives: ['Memcached (simpler)', 'DragonflyDB (multi-threaded)', 'KeyDB (Redis fork)'],
                whenToUse: ['Hot data caching', 'Session storage', 'Rate limiting', 'Real-time counters']
            }
        },
        
        // ========================================
        // LAYER 5: ML (4 nodes)
        // ========================================
        {
            id: 'feature-engineering',
            name: 'Feature Engineering',
            layer: 'ml',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🔬',
            color: '#8b5cf6',
            size: 35,
            position: { x: 1050, y: 200 },
            tooltip: {
                title: 'Feature Engineering',
                description: 'Transform raw data into ML features',
                technologies: ['pandas', 'scikit-learn', 'Feature Store'],
                experience: 'UBIAI Internship/PFE: Text preprocessing, TF-IDF, embeddings'
            },
            details: {
                why: 'Raw data is rarely ML-ready. Feature engineering extracts signals models can learn from.',
                how: 'Clean text, normalize values, encode categories, create derived features, handle missing data.',
                tradeoffs: 'Time-consuming, domain expertise needed, features may not generalize.',
                alternatives: ['AutoML (automatic)', 'Deep learning (learns features)', 'Pre-trained embeddings'],
                whenToUse: ['Structured data', 'Traditional ML (not deep learning)', 'Have domain knowledge']
            }
        },
        
        {
            id: 'model-training',
            name: 'Model Training',
            layer: 'ml',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🧠',
            color: '#ec4899',
            size: 45,
            position: { x: 1050, y: 300 },
            tooltip: {
                title: 'Model Training',
                description: 'Train ML/DL models with PyTorch/TensorFlow',
                technologies: ['PyTorch', 'TensorFlow', 'Transformers'],
                experience: 'UBIAI Internship/PFE: Fine-tuned BERT/RoBERTa for sentiment analysis'
            },
            details: {
                why: 'Learn patterns from data to make predictions on new data.',
                how: 'Split data (train/val/test), choose model architecture, train with backpropagation, tune hyperparameters.',
                tradeoffs: 'Computationally expensive (GPUs needed), overfitting risk, hyperparameter tuning.',
                alternatives: ['Pre-trained models (transfer learning)', 'AutoML (automated)', 'Rule-based (simpler)'],
                whenToUse: ['Have labeled data', 'Need predictions', 'Pre-trained models insufficient']
            }
        },
        
        {
            id: 'mlflow',
            name: 'MLflow',
            layer: 'ml',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '📊',
            color: '#06b6d4',
            size: 35,
            position: { x: 1050, y: 390 },
            tooltip: {
                title: 'MLflow',
                description: 'Experiment tracking and model registry',
                technologies: ['MLflow', 'Model versioning', 'Artifact storage'],
                experience: 'UBIAI Internship/PFE: Tracked experiments with parameters and metrics'
            },
            details: {
                why: 'Track experiments (hyperparameters, metrics, artifacts) for reproducibility. Version models.',
                how: 'Log params/metrics with MLflow API, store model artifacts, register models, track lineage.',
                tradeoffs: 'Another service to manage, storage for artifacts, UI can be slow with many runs.',
                alternatives: ['Weights & Biases (SaaS)', 'Neptune (SaaS)', 'TensorBoard (logging only)', 'Spreadsheets (manual)'],
                whenToUse: ['Multiple experiments', 'Team collaboration', 'Need reproducibility', 'Model versioning']
            }
        },
        
        {
            id: 'model-serving',
            name: 'Model Serving',
            layer: 'ml',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🚀',
            color: '#f59e0b',
            size: 40,
            position: { x: 1050, y: 480 },
            tooltip: {
                title: 'Model Serving (FastAPI)',
                description: 'Serve models as REST APIs for production inference',
                technologies: ['FastAPI', 'TorchServe', 'ONNX'],
                experience: 'UBIAI Internship/PFE: Deployed NLP models as FastAPI endpoints'
            },
            details: {
                why: 'Make model predictions accessible via HTTP API. Decouple model from application.',
                how: 'Load model in memory, expose /predict endpoint, handle batching, return results.',
                tradeoffs: 'Latency overhead (network + serialization), cold start (model loading), scaling complexity.',
                alternatives: ['Embedded in app (tighter coupling)', 'TorchServe (dedicated)', 'SageMaker (managed)', 'Edge deployment'],
                whenToUse: ['Multiple clients', 'Frequent model updates', 'Need versioning', 'Microservices architecture']
            }
        },
        
        // ========================================
        // LAYER 6: AI (6 nodes)
        // ========================================
        {
            id: 'llms',
            name: 'Large Language Models',
            layer: 'ai',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🤖',
            color: '#3b82f6',
            size: 45,
            position: { x: 1300, y: 100 },
            tooltip: {
                title: 'Large Language Models',
                description: 'GPT, LLaMA, Claude for text generation',
                technologies: ['OpenAI API', 'LLaMA', 'Transformers'],
                experience: 'UBIAI Internship/PFE: Integrated GPT for question answering'
            },
            details: {
                why: 'Generate human-like text, answer questions, summarize documents, translate languages.',
                how: 'Call API with prompt, adjust temperature/top_p for creativity, parse response.',
                tradeoffs: 'Expensive ($0.01-0.10 per 1k tokens), latency (1-5 seconds), hallucinations, prompt engineering needed.',
                alternatives: ['Fine-tuned smaller models (cheaper)', 'Rule-based (deterministic)', 'Retrieval-only (no generation)'],
                whenToUse: ['Need natural language generation', 'Have budget', 'Can handle hallucinations']
            }
        },
        
        {
            id: 'embeddings',
            name: 'Embeddings',
            layer: 'ai',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🔢',
            color: '#8b5cf6',
            size: 35,
            position: { x: 1300, y: 190 },
            tooltip: {
                title: 'Text Embeddings',
                description: 'Convert text to vector representations for semantic search',
                technologies: ['OpenAI ada-002', 'sentence-transformers', 'BERT'],
                experience: 'UBIAI Internship/PFE: Generated embeddings for semantic document search'
            },
            details: {
                why: 'Capture semantic meaning in vectors. Similar text → similar vectors. Enables semantic search.',
                how: 'Pass text through embedding model (BERT, ada-002), get 768-1536 dimensional vector.',
                tradeoffs: 'Expensive to generate (ada-002: $0.0001 per 1k tokens), large storage (4KB per vector), compute-heavy similarity search.',
                alternatives: ['BM25 (keyword-based)', 'TF-IDF (simpler)', 'LSA (older)'],
                whenToUse: ['Semantic search', 'Clustering documents', 'Recommendation systems', 'RAG applications']
            }
        },
        
        {
            id: 'vector-db',
            name: 'Vector Database',
            layer: 'ai',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🗄️',
            color: '#10b981',
            size: 40,
            position: { x: 1300, y: 280 },
            tooltip: {
                title: 'Vector Database',
                description: 'Store and query embeddings with similarity search',
                technologies: ['Milvus', 'FAISS', 'Pinecone', 'Qdrant'],
                experience: 'UBIAI Internship/PFE: Used Milvus and FAISS for semantic search'
            },
            details: {
                why: 'Efficient nearest-neighbor search on high-dimensional vectors (millions of vectors in <100ms).',
                how: 'Index vectors with HNSW/IVF algorithms, query with vector, return top-K most similar.',
                tradeoffs: 'Memory-intensive (vectors in RAM), index build time (hours for millions), approximate (not exact) search.',
                alternatives: ['PostgreSQL pgvector (small scale)', 'Elasticsearch (hybrid)', 'FAISS (no server)', 'Build index from scratch'],
                whenToUse: ['Semantic search', 'RAG systems', 'Recommendation', '>10k vectors']
            }
        },
        
        {
            id: 'rag-system',
            name: 'RAG Pipeline',
            layer: 'ai',
            experience: 'professional',
            project: 'UBIAI Internship',
            icon: '🔍',
            color: '#f59e0b',
            size: 45,
            position: { x: 1300, y: 370 },
            tooltip: {
                title: 'Retrieval-Augmented Generation',
                description: 'Retrieve context before LLM generation to ground responses',
                technologies: ['Haystack', 'BM25', 'FARM', 'LangChain'],
                experience: 'UBIAI Internship/PFE: Built Q&A system with Haystack + BM25 + FARM'
            },
            details: {
                why: 'Ground LLM responses in factual data. Reduces hallucinations, provides sources.',
                how: 'Query embeds → vector search → retrieve top-K docs → include in LLM prompt → generate answer.',
                tradeoffs: 'Latency (retrieval + generation = 2-5 seconds), retrieval quality critical, context window limits.',
                alternatives: ['Fine-tuning (bake knowledge in)', 'Pure LLM (no retrieval)', 'Search-only (no generation)'],
                whenToUse: ['Need citations', 'Large knowledge base', 'Reduce hallucinations', 'Dynamic knowledge']
            }
        },
        
        {
            id: 'langchain',
            name: 'LangChain',
            layer: 'ai',
            experience: 'personal-project',
            project: 'Influencer Intelligence',
            icon: '⛓️',
            color: '#ec4899',
            size: 40,
            position: { x: 1300, y: 460 },
            tooltip: {
                title: 'LangChain',
                description: 'Framework for building LLM applications with chains and agents',
                technologies: ['LangChain', 'Chains', 'Agents', 'Tools'],
                experience: 'Built multi-agent system for influencer marketing intelligence'
            },
            details: {
                why: 'Abstracts common LLM patterns (chains, agents, memory). Rapid prototyping.',
                how: 'Define chains (sequence of LLM calls), equip agents with tools, manage conversation memory.',
                tradeoffs: 'Abstraction overhead, debugging complexity (nested calls), version instability.',
                alternatives: ['Build from scratch (more control)', 'LlamaIndex (RAG-focused)', 'Semantic Kernel (Microsoft)'],
                whenToUse: ['Prototyping LLM apps', 'Need agents', 'Want pre-built components']
            }
        },
        
        {
            id: 'langgraph',
            name: 'LangGraph',
            layer: 'ai',
            experience: 'personal-project',
            project: 'Influencer Intelligence',
            icon: '🕸️',
            color: '#8b5cf6',
            size: 35,
            position: { x: 1300, y: 550 },
            tooltip: {
                title: 'LangGraph',
                description: 'Stateful multi-agent orchestration with cyclic workflows',
                technologies: ['LangGraph', 'State machines', 'Cyclic graphs'],
                experience: 'Orchestrated multiple AI agents with state management'
            },
            details: {
                why: 'LangChain chains are linear. LangGraph supports cycles, conditionals, state persistence.',
                how: 'Define graph of agent nodes, edges control flow, state persists across nodes.',
                tradeoffs: 'More complex than chains, newer (less stable), learning curve.',
                alternatives: ['LangChain (simpler)', 'AutoGPT (autonomous)', 'Custom state machine'],
                whenToUse: ['Complex agent workflows', 'Need cycles/conditionals', 'Stateful conversations']
            }
        },
        
        // ========================================
        // LAYER 7: PRODUCTION (4 nodes)
        // ========================================
        {
            id: 'fastapi',
            name: 'FastAPI',
            layer: 'production',
            experience: 'personal-project',
            project: 'Production APIs, All Projects',
            icon: '🚀',
            color: '#10b981',
            size: 45,
            position: { x: 1550, y: 250 },
            tooltip: {
                title: 'FastAPI',
                description: 'High-performance async API framework',
                technologies: ['FastAPI', 'Pydantic', 'async/await'],
                experience: 'Built 3 production APIs deployed on Render with database monitoring'
            },
            details: {
                why: 'Async support for high concurrency. Automatic OpenAPI docs. Pydantic validation.',
                how: 'Define routes with type hints, Pydantic validates requests, async handlers for I/O.',
                tradeoffs: 'Async adds complexity, newer than Flask/Django (smaller ecosystem).',
                alternatives: ['Django (batteries included)', 'Flask (simpler)', 'Express (Node.js)', 'Go (faster)'],
                whenToUse: ['High I/O workloads', 'Need OpenAPI docs', 'Want type safety', 'Python ecosystem']
            }
        },
        
        {
            id: 'docker',
            name: 'Docker',
            layer: 'production',
            experience: 'personal-project',
            project: 'All Projects',
            icon: '🐳',
            color: '#3b82f6',
            size: 40,
            position: { x: 1550, y: 350 },
            tooltip: {
                title: 'Docker',
                description: 'Containerization for consistent deployment',
                technologies: ['Docker', 'Docker Compose', 'Multi-stage builds'],
                experience: 'All projects Dockerized; multi-stage builds reduce image size'
            },
            details: {
                why: 'Package app + dependencies into container. "Works on my machine" → works everywhere.',
                how: 'Write Dockerfile, build image, run container. Use Docker Compose for multi-container apps.',
                tradeoffs: 'Image size bloat, layer caching complexity, security (root user by default).',
                alternatives: ['VM (heavier)', 'Kubernetes (orchestration)', 'Serverless (no containers)'],
                whenToUse: ['Consistent environments', 'Microservices', 'Local development', 'CI/CD']
            }
        },
        
        {
            id: 'kubernetes',
            name: 'Kubernetes',
            layer: 'production',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '☸️',
            color: '#326ce5',
            size: 40,
            position: { x: 1550, y: 450 },
            tooltip: {
                title: 'Kubernetes',
                description: 'Container orchestration at scale',
                technologies: ['Kubernetes', 'kubectl', 'Helm'],
                experience: 'SignalForge: Designed distributed scraping architecture'
            },
            details: {
                why: 'Automate container deployment, scaling, and management. Self-healing, load balancing.',
                how: 'Define Deployments, Services, ConfigMaps in YAML. kubectl applies to cluster.',
                tradeoffs: 'Steep learning curve, complex setup (control plane, networking), overkill for small apps.',
                alternatives: ['Docker Compose (simpler)', 'ECS (AWS)', 'Cloud Run (serverless)', 'Nomad'],
                whenToUse: ['Microservices at scale', 'Need auto-scaling', 'Multi-cloud', 'High availability']
            }
        },
        
        {
            id: 'api-gateway',
            name: 'API Gateway',
            layer: 'production',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '🚪',
            color: '#f59e0b',
            size: 35,
            position: { x: 1550, y: 150 },
            tooltip: {
                title: 'API Gateway',
                description: 'Single entry point with auth, rate limiting, routing',
                technologies: ['Kong', 'Nginx', 'Traefik'],
                experience: 'SignalForge: Request routing, validation, and rate limiting'
            },
            details: {
                why: 'Single entry point for microservices. Handles cross-cutting concerns (auth, rate limiting, logging).',
                how: 'Route requests to backend services, validate tokens, apply rate limits, log requests.',
                tradeoffs: 'Single point of failure (needs HA), added latency (extra hop), configuration complexity.',
                alternatives: ['Direct service calls (simpler)', 'Service mesh (more features)', 'Cloud gateways (AWS API Gateway)'],
                whenToUse: ['Microservices', 'Need centralized auth', 'Rate limiting', 'API versioning']
            }
        },
        
        // ========================================
        // LAYER 8: OBSERVABILITY (4 nodes)
        // ========================================
        {
            id: 'prometheus',
            name: 'Prometheus',
            layer: 'observability',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '📊',
            color: '#e74c3c',
            size: 40,
            position: { x: 1750, y: 200 },
            tooltip: {
                title: 'Prometheus',
                description: 'Time-series metrics collection and alerting',
                technologies: ['Prometheus', 'PromQL', 'RED method'],
                experience: 'SignalForge: Tracked request rate, errors, latency'
            },
            details: {
                why: 'Know when systems are unhealthy. Track RED metrics: Rate, Errors, Duration.',
                how: 'Services expose /metrics endpoint, Prometheus scrapes periodically, stores time-series.',
                tradeoffs: 'Pull-based (services must be reachable), high cardinality issues, storage limits.',
                alternatives: ['StatsD + Graphite (push)', 'DataDog (SaaS)', 'CloudWatch (AWS)', 'VictoriaMetrics (drop-in)'],
                whenToUse: ['Need detailed metrics', 'Open-source stack', 'Alerting', 'Custom queries']
            }
        },
        
        {
            id: 'grafana',
            name: 'Grafana',
            layer: 'observability',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '📈',
            color: '#f59e0b',
            size: 40,
            position: { x: 1750, y: 300 },
            tooltip: {
                title: 'Grafana',
                description: 'Metrics visualization and alerting',
                technologies: ['Grafana', 'Dashboards', 'Alerts'],
                experience: 'SignalForge: Built RED metrics dashboards'
            },
            details: {
                why: 'Visualize Prometheus metrics. Dashboards for monitoring, alerting on thresholds.',
                how: 'Query Prometheus with PromQL, create panels (graphs, tables), set alerts.',
                tradeoffs: 'Dashboard fatigue (too many = ignored), query optimization needed, alert noise.',
                alternatives: ['Kibana (ELK)', 'DataDog (SaaS)', 'CloudWatch (AWS)', 'Prometheus UI (basic)'],
                whenToUse: ['Already using Prometheus', 'Need custom dashboards', 'Team monitoring']
            }
        },
        
        {
            id: 'jaeger',
            name: 'Jaeger',
            layer: 'observability',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '🔍',
            color: '#3b82f6',
            size: 35,
            position: { x: 1750, y: 400 },
            tooltip: {
                title: 'Jaeger',
                description: 'Distributed request tracing',
                technologies: ['Jaeger', 'OpenTelemetry', 'Trace context'],
                experience: 'SignalForge: Traced requests end-to-end (API → Kafka → Worker)'
            },
            details: {
                why: 'Debug latency in microservices. See request flow across services.',
                how: 'Each service adds spans to trace, propagate trace ID via headers, Jaeger collects and visualizes.',
                tradeoffs: 'Overhead (~1-2% latency), storage for traces (100GB/month at scale), sampling needed at high volume.',
                alternatives: ['Zipkin (similar)', 'DataDog APM (SaaS)', 'AWS X-Ray', 'Lightstep'],
                whenToUse: ['Microservices', 'Complex async flows', 'Debugging latency', 'Need request visibility']
            }
        },
        
        {
            id: 'loki',
            name: 'Loki',
            layer: 'observability',
            experience: 'personal-project',
            project: 'SignalForge',
            icon: '📜',
            color: '#10b981',
            size: 30,
            position: { x: 1750, y: 500 },
            tooltip: {
                title: 'Loki',
                description: 'Log aggregation (like Prometheus for logs)',
                technologies: ['Loki', 'LogQL', 'Structured logging'],
                experience: 'SignalForge: Centralized logging from multiple worker containers'
            },
            details: {
                why: 'Aggregate logs from all services. Query with LogQL (similar to PromQL).',
                how: 'Services write structured JSON logs, Promtail ships to Loki, query with LogQL.',
                tradeoffs: 'Less features than Elasticsearch, no full-text search, index-free (trade query speed for simplicity).',
                alternatives: ['ELK stack (more features)', 'Splunk (enterprise)', 'CloudWatch Logs (AWS)', 'Papertrail'],
                whenToUse: ['Already using Prometheus/Grafana', 'Want simple log aggregation', 'Kubernetes']
            }
        }
    ],
    
    // === CONNECTIONS (37 total) ===
    connections: [
        // Sources → Ingestion (5 connections)
        { from: 'social-media-api', to: 'rest-apis', label: 'HTTP', type: 'lookup' },
        { from: 'web-scraping', to: 'kafka', label: 'Events', type: 'streaming' },
        { from: 'public-datasets', to: 'nifi', label: 'Batch', type: 'batch' },
        { from: 'file-uploads', to: 'rest-apis', label: 'Upload', type: 'batch' },
        { from: 'iot-sensors', to: 'kafka', label: 'Telemetry', type: 'streaming' },
        
        // Ingestion → Processing (4 connections)
        { from: 'kafka', to: 'spark-streaming', label: 'Stream', type: 'streaming' },
        { from: 'nifi', to: 'airflow', label: 'Trigger', type: 'batch' },
        { from: 'rest-apis', to: 'airflow', label: 'Schedule', type: 'batch' },
        { from: 'airflow', to: 'spark-batch', label: 'Submit Job', type: 'batch' },
        
        // Processing → Storage (7 connections)
        { from: 'spark-streaming', to: 'lakehouse-bronze', label: 'Write', type: 'streaming' },
        { from: 'spark-batch', to: 'data-lake-s3', label: 'Store', type: 'batch' },
        { from: 'lakehouse-bronze', to: 'lakehouse-silver', label: 'Transform', type: 'batch' },
        { from: 'lakehouse-silver', to: 'lakehouse-gold', label: 'Aggregate', type: 'batch' },
        { from: 'dbt', to: 'lakehouse-gold', label: 'Build', type: 'batch' },
        { from: 'spark-streaming', to: 'postgresql', label: 'Upsert', type: 'streaming' },
        { from: 'postgresql', to: 'redis', label: 'Cache', type: 'lookup' },
        
        // Storage → ML (4 connections)
        { from: 'lakehouse-gold', to: 'feature-engineering', label: 'Features', type: 'batch' },
        { from: 'feature-engineering', to: 'model-training', label: 'Train', type: 'batch' },
        { from: 'model-training', to: 'mlflow', label: 'Log', type: 'telemetry' },
        { from: 'mlflow', to: 'model-serving', label: 'Deploy', type: 'batch' },
        
        // Storage → AI (6 connections)
        { from: 'lakehouse-gold', to: 'embeddings', label: 'Text', type: 'batch' },
        { from: 'embeddings', to: 'vector-db', label: 'Store', type: 'batch' },
        { from: 'vector-db', to: 'rag-system', label: 'Retrieve', type: 'lookup' },
        { from: 'llms', to: 'rag-system', label: 'Generate', type: 'lookup' },
        { from: 'rag-system', to: 'langchain', label: 'Chain', type: 'lookup' },
        { from: 'langchain', to: 'langgraph', label: 'Orchestrate', type: 'lookup' },
        
        // ML/AI → Production (5 connections)
        { from: 'model-serving', to: 'fastapi', label: 'Predict', type: 'lookup' },
        { from: 'langgraph', to: 'fastapi', label: 'AI Response', type: 'lookup' },
        { from: 'fastapi', to: 'api-gateway', label: 'Route', type: 'streaming' },
        { from: 'api-gateway', to: 'docker', label: 'Container', type: 'deployment' },
        { from: 'docker', to: 'kubernetes', label: 'Orchestrate', type: 'deployment' },
        
        // Observability (6 connections)
        { from: 'fastapi', to: 'prometheus', label: 'Metrics', type: 'telemetry' },
        { from: 'spark-streaming', to: 'prometheus', label: 'Metrics', type: 'telemetry' },
        { from: 'kubernetes', to: 'prometheus', label: 'Metrics', type: 'telemetry' },
        { from: 'prometheus', to: 'grafana', label: 'Query', type: 'lookup' },
        { from: 'fastapi', to: 'jaeger', label: 'Traces', type: 'telemetry' },
        { from: 'docker', to: 'loki', label: 'Logs', type: 'telemetry' }
    ],
    
    // === SCENARIOS (5 total) ===
    scenarios: {
        complete: {
            id: 'complete',
            name: 'Complete System (A-to-Z)',
            description: 'Full data journey from social media to AI agents',
            activeNodes: 'all' // Special marker: all 36 nodes active
        },
        
        batch: {
            id: 'batch',
            name: 'Batch Processing Pipeline',
            description: 'Scheduled data processing with Airflow + Spark',
            activeNodes: [
                'public-datasets', 'nifi', 'airflow', 'spark-batch', 'data-lake-s3',
                'lakehouse-bronze', 'lakehouse-silver', 'dbt', 'lakehouse-gold', 'postgresql'
            ]
        },
        
        streaming: {
            id: 'streaming',
            name: 'Real-Time Streaming',
            description: 'Kafka + Spark Streaming for real-time processing',
            activeNodes: [
                'web-scraping', 'iot-sensors', 'kafka', 'spark-streaming',
                'lakehouse-bronze', 'postgresql', 'redis', 'fastapi'
            ]
        },
        
        aiPipeline: {
            id: 'ml-pipeline',
            name: 'AI/ML Training Pipeline',
            description: 'From data to trained models to production APIs',
            activeNodes: [
                'lakehouse-gold', 'feature-engineering', 'model-training', 'mlflow',
                'model-serving', 'fastapi', 'docker', 'kubernetes', 'prometheus', 'grafana'
            ]
        },
        
        ragSystem: {
            id: 'rag-system',
            name: 'RAG & LLM Agents',
            description: 'Retrieval-Augmented Generation with multi-agent orchestration',
            activeNodes: [
                'lakehouse-gold', 'embeddings', 'vector-db', 'llms', 'rag-system',
                'langchain', 'langgraph', 'fastapi', 'api-gateway'
            ]
        }
    },
    
    // === CASE STUDIES (4 total) ===
    caseStudies: [
        {
            id: 'signalforge',
            name: 'SignalForge: Distributed Scraping Platform',
            description: 'Distributed scraping architecture with Kafka and full observability stack',
            github: 'https://github.com/biso1991/scraper-vpn',
            highlightNodes: [
                'web-scraping', 'kafka', 'redis', 'postgresql',
                'prometheus', 'grafana', 'jaeger', 'loki',
                'docker', 'kubernetes', 'api-gateway'
            ],
            metrics: {
                'Architecture': 'Distributed scraping with session management',
                'Technologies': 'Kafka, Redis, Prometheus, Grafana, Jaeger, Loki',
                'Deployment': 'Docker Compose with observability stack',
                'Testing': '85% code coverage (481 test lines)'
            }
        },
        
        {
            id: 'ubiai',
            name: 'UBIAI: NLP Question Answering Platform',
            description: 'RAG system with Haystack, BM25, FARM for document Q&A (Internship/PFE)',
            github: 'https://github.com/biso1991/nlp-finetuning-qa-platform',
            highlightNodes: [
                'rest-apis', 'public-datasets', 'data-lake-s3',
                'feature-engineering', 'model-training', 'mlflow', 'model-serving',
                'embeddings', 'vector-db', 'rag-system', 'llms', 'fastapi', 'postgresql'
            ],
            metrics: {
                'Datasets': 'SQuAD, CoQA',
                'Technologies': 'Haystack, BM25, FARM, Milvus, FastAPI',
                'APIs': 'REST API endpoints',
                'Employment': 'UBIAI Internship/PFE (Feb-Oct 2022)'
            }
        },
        
        {
            id: 'ecommerce',
            name: 'E-Commerce Real-Time Analytics',
            description: 'Kafka + Spark Streaming + Airflow for live dashboards',
            github: 'https://gitlab.com/bisonasri1991/ecommerce',
            highlightNodes: [
                'kafka', 'airflow', 'spark-streaming', 'spark-batch',
                'postgresql', 'redis', 'docker'
            ],
            metrics: {
                'Latency': 'Real-time end-to-end processing',
                'Technologies': 'Kafka, Spark Streaming, Airflow, Hadoop',
                'Components': 'Batch + Streaming (Lambda Architecture)'
            }
        },
        
        {
            id: 'production-apis',
            name: '3 Production APIs',
            description: 'FastAPI services deployed with database and monitoring',
            github: 'https://github.com/biso1991/data-intelligence-platform',
            liveDemo: 'https://ip-intelligence-api-yaov.onrender.com/',
            highlightNodes: [
                'fastapi', 'postgresql', 'docker', 'redis', 'prometheus', 'grafana'
            ],
            metrics: {
                'Status': 'Live in production',
                'Deployment': 'Render (managed hosting)',
                'Cost': '$0/month (free tier)',
                'Monitoring': 'Prometheus + Grafana'
            }
        }
    ]
};

// === PROGRAMMATIC VALIDATION ===

/**
 * Validate architecture configuration and calculate all counts
 * @returns {Object} Validation results with counts and errors
 */
export function validateArchitecture() {
    const errors = [];
    const warnings = [];
    
    // Extract all node IDs
    const nodeIds = new Set(intelligencePlatform.nodes.map(n => n.id));
    
    // Count nodes by layer
    const layerCounts = {};
    intelligencePlatform.nodes.forEach(node => {
        layerCounts[node.layer] = (layerCounts[node.layer] || 0) + 1;
    });
    
    // Count nodes by experience
    const experienceCounts = {};
    intelligencePlatform.nodes.forEach(node => {
        experienceCounts[node.experience] = (experienceCounts[node.experience] || 0) + 1;
    });
    
    // Validate connections
    intelligencePlatform.connections.forEach((conn, i) => {
        if (!nodeIds.has(conn.from)) {
            errors.push(`Connection ${i + 1}: Invalid 'from' node '${conn.from}'`);
        }
        if (!nodeIds.has(conn.to)) {
            errors.push(`Connection ${i + 1}: Invalid 'to' node '${conn.to}'`);
        }
    });
    
    // Validate scenarios
    const scenarioCounts = {};
    Object.entries(intelligencePlatform.scenarios).forEach(([key, scenario]) => {
        if (scenario.activeNodes === 'all') {
            scenarioCounts[key] = intelligencePlatform.nodes.length;
        } else {
            scenarioCounts[key] = scenario.activeNodes.length;
            scenario.activeNodes.forEach(nodeId => {
                if (!nodeIds.has(nodeId)) {
                    errors.push(`Scenario '${key}': Invalid node '${nodeId}'`);
                }
            });
        }
    });
    
    // Validate case studies
    const caseStudyCounts = {};
    intelligencePlatform.caseStudies.forEach(study => {
        caseStudyCounts[study.id] = study.highlightNodes.length;
        study.highlightNodes.forEach(nodeId => {
            if (!nodeIds.has(nodeId)) {
                errors.push(`Case study '${study.id}': Invalid node '${nodeId}'`);
            }
        });
    });
    
    return {
        valid: errors.length === 0,
        counts: {
            nodes: intelligencePlatform.nodes.length,
            connections: intelligencePlatform.connections.length,
            layers: Object.keys(layerCounts).length,
            scenarios: Object.keys(intelligencePlatform.scenarios).length,
            caseStudies: intelligencePlatform.caseStudies.length
        },
        layerCounts,
        experienceCounts,
        scenarioCounts,
        caseStudyCounts,
        errors,
        warnings
    };
}

// Auto-run validation if in Node environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { intelligencePlatform, validateArchitecture };
    
    // Run validation on import
    const result = validateArchitecture();
    if (!result.valid) {
        console.error('❌ Architecture validation failed:');
        result.errors.forEach(err => console.error(`  - ${err}`));
        process.exit(1);
    }
}
