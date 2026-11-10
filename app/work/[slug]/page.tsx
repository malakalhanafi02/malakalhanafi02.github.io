import {projects,projectHref} from '@/lib/portfolio';
import {notFound} from 'next/navigation';
import CaseStudy from '@/components/CaseStudy';
import StaticRedirect from '@/components/StaticRedirect';
export const dynamicParams=false;
export function generateStaticParams(){return [...projects.map(p=>({slug:p.slug})),{slug:'smart-methods-robot'},{slug:'smart-methods-ai-web'},{slug:'defibrillation-waveforms'}]}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);return {title:p?.title||'Project',description:p?.summary}}
export default async function WorkDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 if(['smart-methods-robot','smart-methods-ai-web'].includes(slug))return <StaticRedirect href="/work/smart-methods-internship/"/>;
 if(slug==='defibrillation-waveforms')return <StaticRedirect href="/work/lvad-modeling/"/>;
 const p=projects.find(p=>p.slug===slug);if(!p)notFound();
 if(p.kaust)return <StaticRedirect href={projectHref(p)}/>;
 return <CaseStudy project={p}/>;
}
