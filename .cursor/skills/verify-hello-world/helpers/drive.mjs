import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../../..');
const source=path.join(root,'app.js'),out=path.join(root,'artifacts/verification');
fs.mkdirSync(out,{recursive:true});
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'verify-hello-world-'));
const proof={node:process.version,sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),command:'node app.js',passed:false};
try{
 const doctor=spawnSync(process.execPath,['--check',source],{cwd:scratch,encoding:'utf8',timeout:5000});
 proof.doctor={status:doctor.status,stderr:doctor.stderr,error:doctor.error?.message};
 if(doctor.status!==0)throw Error('Syntax doctor failed');
 const run=spawnSync(process.execPath,[source],{cwd:scratch,encoding:'utf8',input:'',timeout:5000});
 Object.assign(proof,{exit:run.status,stdout:run.stdout,stderr:run.stderr,error:run.error?.message,scratchFiles:fs.readdirSync(scratch)});
 if(run.status!==0||run.stdout!=='Hello world'+os.EOL||run.stderr!==''||proof.scratchFiles.length)throw Error('Greeting contract failed');
 proof.passed=true;
}catch(error){proof.failure=error.message;process.exitCode=1;}finally{
 fs.writeFileSync(path.join(out,'hello-world.json'),JSON.stringify(proof,null,2)+'\n');fs.rmSync(scratch,{recursive:true,force:true});
 if(!fs.existsSync(path.join(out,'hello-world.json')))throw Error('Evidence lost during cleanup');
 console.log(JSON.stringify(proof,null,2));
}
