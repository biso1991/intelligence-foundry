#!/usr/bin/env node
import { intelligencePlatform, validateArchitecture } from './intelligence-platform.js';

console.log('=== Intelligence Platform Architecture Validation ===\n');

const result = validateArchitecture(intelligencePlatform);

console.log('📊 COUNTS:');
console.log(`  Total Nodes: ${result.counts.nodes}`);
console.log(`  Total Connections: ${result.counts.connections}`);
console.log(`  Total Layers: ${result.counts.layers}`);
console.log(`  Total Scenarios: ${result.counts.scenarios}`);
console.log(`  Total Case Studies: ${result.counts.caseStudies}`);

console.log('\n📋 EXPERIENCE DISTRIBUTION:');
Object.entries(result.experienceCounts).forEach(([exp, count]) => {
  console.log(`  ${exp}: ${count} nodes`);
});

console.log('\n📦 LAYER DISTRIBUTION:');
Object.entries(result.layerCounts).forEach(([layer, count]) => {
  console.log(`  ${layer}: ${count} nodes`);
});

if (result.errors.length > 0) {
  console.log('\n❌ ERRORS:');
  result.errors.forEach(err => console.log(`  - ${err}`));
  process.exit(1);
}

if (result.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  result.warnings.forEach(warn => console.log(`  - ${warn}`));
}

console.log('\n✅ VALIDATION PASSED');
console.log('\n📝 NODE INVENTORY BY LAYER:');

const nodesByLayer = {};
intelligencePlatform.nodes.forEach(node => {
  if (!nodesByLayer[node.layer]) nodesByLayer[node.layer] = [];
  nodesByLayer[node.layer].push(node);
});

Object.entries(nodesByLayer).forEach(([layer, nodes]) => {
  console.log(`\n  ${layer.toUpperCase()} (${nodes.length} nodes):`);
  nodes.forEach(node => {
    const badge = node.experience === 'professional' ? '[PRO]' : 
                  node.experience === 'personal-project' ? '[PER]' : 
                  node.experience === 'architecture-familiarity' ? '[FAM]' : '[???]';
    const project = node.project ? ` (${node.project})` : '';
    console.log(`    ${badge} ${node.id}${project}`);
  });
});

console.log('\n🔗 CONNECTIONS:');
intelligencePlatform.connections.forEach((conn, idx) => {
  console.log(`  ${idx + 1}. ${conn.from} → ${conn.to} (${conn.type})`);
});

console.log('\n🎬 SCENARIOS:');
Object.entries(intelligencePlatform.scenarios).forEach(([key, scenario]) => {
  const nodeCount = scenario.activeNodes === 'all' ? 'all nodes' : `${scenario.activeNodes.length} nodes`;
  console.log(`  ${key}: "${scenario.name}" (${nodeCount})`);
});

console.log('\n📚 CASE STUDIES:');
intelligencePlatform.caseStudies.forEach(cs => {
  console.log(`  ${cs.id}: "${cs.name}" (${cs.highlightNodes.length} nodes)`);
});
