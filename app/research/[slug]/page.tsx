import {researchProjects} from '@/lib/portfolio';
import {notFound} from 'next/navigation';
import CaseStudy from '@/components/CaseStudy';
import StaticRedirect from '@/components/StaticRedirect';
export const dynamicParams=false;
export function generateStaticParams(){return researchProjects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=researchProjects.find(p=>p.slug===slug);return {title:p?.title||'Research',description:p?.summary}}
export default async function ResearchDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=researchProjects.find(p=>p.slug===slug);if(!p)notFound();
 if(p.id==='P08')return <StaticRedirect href="/research/#cooperative-sensing"/>;
 if(p.id==='P09')return <StaticRedirect href="/research/#robonex"/>;
 return <CaseStudy project={p}/>;
}
