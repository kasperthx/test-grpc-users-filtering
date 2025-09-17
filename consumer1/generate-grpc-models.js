const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const isWin = process.platform === 'win32';
const protoDir = path.resolve(__dirname, 'src/grpc-models/proto');
const outDir = path.resolve(__dirname, 'src/generated-grpc');

// Ensure the output directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const protoFiles = `${protoDir}/*.proto`;

// Use system-installed protoc and grpc plugins
const protocPath = 'protoc';
const grpcPluginPath = 'grpc_node_plugin';
const protocTsPluginPath = isWin
  ? path.resolve(__dirname, 'protoc-gen-ts.cmd')
  : path.resolve(__dirname, './node_modules', '.bin', 'protoc-gen-ts_proto');

// Verify that protoc-gen-ts exists
if (!fs.existsSync(protocTsPluginPath)) {
  console.error(`protoc-gen-ts not found at ${protocTsPluginPath}`);
  process.exit(1);
}

// Log paths for debugging
console.log(`Using protoc at: ${protocPath}`);
console.log(`Using grpc_node_plugin at: ${grpcPluginPath}`);
console.log(`Using protoc-gen-ts at: ${protocTsPluginPath}`);
console.log(`proto files: ${protoFiles}`);

const q = isWin ? '"' : '';
const command = `"${protocPath}" \
  --proto_path="${protoDir}" \
  --plugin=protoc-gen-ts_proto="${protocTsPluginPath}" \
  --ts_proto_out="${outDir}" \
  --ts_proto_opt=outputServices=grpc-js,shortNamespacePrefixes=false,nestJs=true,snakeToCamel=false \
  ${q}${protoFiles}${q}`;

try {
  console.log(`Executing command: ${command}`);
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to generate gRPC models:', error.message);
  console.error(
    'Command stdout:',
    error.stdout ? error.stdout.toString() : 'N/A',
  );
  console.error(
    'Command stderr:',
    error.stderr ? error.stderr.toString() : 'N/A',
  );
  process.exit(1);
}
