import type {InferenceSession} from 'onnxruntime-web';
let sessionPromise:Promise<InferenceSession>|undefined;
export const classNames=['barriers','boundary','lawn'];
export const classColors=[[224,132,74],[130,113,207],[83,176,118]];
export type Region={cls:number;confidence:number;box:number[];coeff:Float32Array};
function iou(a:number[],b:number[]){const inter=Math.max(0,Math.min(a[2],b[2])-Math.max(a[0],b[0]))*Math.max(0,Math.min(a[3],b[3])-Math.max(a[1],b[1]));return inter/Math.max(1e-6,(a[2]-a[0])*(a[3]-a[1])+(b[2]-b[0])*(b[3]-b[1])-inter)}
export async function segmentImage(image:HTMLImageElement,confidence:number,onStatus:(s:string)=>void){
 onStatus('Loading the trained model…');
 const ort=await import('onnxruntime-web/wasm');
 ort.env.wasm.wasmPaths={
  mjs:'/ort/ort-wasm-simd-threaded.mjs',
  wasm:'/ort/ort-wasm-simd-threaded.wasm',
 };ort.env.wasm.numThreads=1;ort.env.wasm.proxy=false;
 if(!sessionPromise)sessionPromise=ort.InferenceSession.create('/models/mower-segmentation.onnx',{executionProviders:['wasm']}).catch(e=>{sessionPromise=undefined;throw e});
 const session=await sessionPromise;
 onStatus('Running segmentation on this image…');
 const size=640,scale=Math.min(size/image.naturalWidth,size/image.naturalHeight);
 const w=Math.round(image.naturalWidth*scale),h=Math.round(image.naturalHeight*scale),left=Math.floor((size-w)/2),top=Math.floor((size-h)/2);
 const inputCanvas=document.createElement('canvas');inputCanvas.width=size;inputCanvas.height=size;
 const ctx=inputCanvas.getContext('2d')!;ctx.fillStyle='rgb(114,114,114)';ctx.fillRect(0,0,size,size);ctx.drawImage(image,left,top,w,h);
 const pixels=ctx.getImageData(0,0,size,size).data,plane=size*size,input=new Float32Array(plane*3);
 for(let i=0;i<plane;i++){input[i]=pixels[i*4]/255;input[i+plane]=pixels[i*4+1]/255;input[i+plane*2]=pixels[i*4+2]/255}
 const started=performance.now();const outputs=await session.run({[session.inputNames[0]]:new ort.Tensor('float32',input,[1,3,size,size])});
 const det=outputs[session.outputNames[0]],proto=outputs[session.outputNames[1]];
 const data=det.data as Float32Array, pd=proto.data as Float32Array,n=Number(det.dims[2]);
 const candidates:Region[]=[];
 for(let i=0;i<n;i++){
  let cls=0,score=data[4*n+i];for(let c=1;c<3;c++){if(data[(4+c)*n+i]>score){score=data[(4+c)*n+i];cls=c}}
  if(score<confidence)continue;
  const x=data[i],y=data[n+i],bw=data[2*n+i],bh=data[3*n+i],coeff=new Float32Array(32);
  for(let k=0;k<32;k++)coeff[k]=data[(7+k)*n+i];
  candidates.push({cls,confidence:score,box:[x-bw/2,y-bh/2,x+bw/2,y+bh/2],coeff});
 }
 candidates.sort((a,b)=>b.confidence-a.confidence);const regions:Region[]=[];
 for(const c of candidates){if(!regions.some(r=>r.cls===c.cls&&iou(r.box,c.box)>.45))regions.push(c);if(regions.length>=80)break}
 const ph=Number(proto.dims[2]),pw=Number(proto.dims[3]),pp=pw*ph;
 const mask=document.createElement('canvas');mask.width=pw;mask.height=ph;const mc=mask.getContext('2d')!;const rgba=mc.createImageData(pw,ph);const assigned=new Int8Array(pp).fill(-1);
 for(const r of regions){
  const xmin=Math.max(0,Math.floor(r.box[0]/size*pw)),xmax=Math.min(pw,Math.ceil(r.box[2]/size*pw));
  const ymin=Math.max(0,Math.floor(r.box[1]/size*ph)),ymax=Math.min(ph,Math.ceil(r.box[3]/size*ph));
  for(let y=ymin;y<ymax;y++)for(let x=xmin;x<xmax;x++){
   const ix=y*pw+x;if(assigned[ix]!==-1)continue;let logit=0;
   for(let k=0;k<32;k++)logit+=r.coeff[k]*pd[k*pp+ix];
   if(logit>0){assigned[ix]=r.cls;const color=classColors[r.cls];rgba.data[ix*4]=color[0];rgba.data[ix*4+1]=color[1];rgba.data[ix*4+2]=color[2];rgba.data[ix*4+3]=140}
  }
 }
 mc.putImageData(rgba,0,0);const overlay=document.createElement('canvas');overlay.width=size;overlay.height=size;overlay.getContext('2d')!.drawImage(mask,0,0,size,size);
 const output=document.createElement('canvas');const outScale=Math.min(1,1400/Math.max(image.naturalWidth,image.naturalHeight));output.width=Math.round(image.naturalWidth*outScale);output.height=Math.round(image.naturalHeight*outScale);const oc=output.getContext('2d')!;oc.drawImage(image,0,0,output.width,output.height);oc.drawImage(overlay,left,top,w,h,0,0,output.width,output.height);
 const counts=[0,0,0];let total=0;for(let y=0;y<ph;y++)for(let x=0;x<pw;x++){const ix=y*pw+x;if(x*4<left||x*4>=left+w||y*4<top||y*4>=top+h)continue;total++;if(assigned[ix]>=0)counts[assigned[ix]]++}
 return {url:output.toDataURL('image/png'),regions:regions.map(r=>({className:classNames[r.cls],confidence:r.confidence})),coverage:counts.map(c=>100*c/Math.max(1,total)),seconds:(performance.now()-started)/1000};
}
