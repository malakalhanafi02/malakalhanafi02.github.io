import projectData from './projects.json';
import groupData from './groups.json';
import teachingData from './teaching.json';
export type Media={src:string;caption:string;kind?:string};
export type Project={id:string;slug:string;title:string;eyebrow:string;category:string;kaust:boolean;year:string;summary:string;role:string;status:string;tools:string[];sections:{title:string;text:string}[];gallery:Media[];image?:string;imageAlt?:string;featured?:boolean;pendingMedia?:string;activities?:string[];metrics?:{value:string;label:string}[];links?:{label:string;href:string}[];demo?:string;video?:Media&{poster?:string};videoLink?:string};
export const projects=projectData as Project[];
export const groups=groupData;
export const teachingLabs=teachingData;
export const researchProjects=projects.filter(p=>p.kaust);
export const workProjects=projects.filter(p=>!p.kaust);
export function projectHref(p:Project){if(p.id==='P08')return '/research#cooperative-sensing';if(p.id==='P09')return '/research#robonex';return `${p.kaust?'/research':'/work'}/${p.slug}`}
export function categoryName(id:string){return groups.find(g=>g.id===id)?.title||'KAUST research'}
export const institutions={kaust:{name:'King Abdullah University of Science and Technology (KAUST)',short:'KAUST',href:'https://www.kaust.edu.sa/en/'},speechlogix:{name:'SpeechLogix Group',href:'https://speechlogix.com/'},western:{name:'Western University',href:'https://www.uwo.ca/'},kings:{name:'King’s University College',href:'https://www.kings.uwo.ca/'},smartMethods:{name:'Smart Methods',href:'https://www.s-m.com.sa/en/index.html'}};
export type Credential={id:string;title:string;issuer:string;date:string;group:string;image?:string;images?:string[];placeholder?:string;description?:string;href?:string};
export const credentials:Credential[]=[
 {id:'C15',title:'ML Summer School — Certificate of Participation',issuer:'Cohere Labs · Open Science Community',date:'2026',group:'technical',image:'/credentials/C15.webp',description:'I participated in the 2026 ML Summer School, exploring current machine-learning research and the development of agentic models for edge devices. The program brought together lectures and research perspectives from the open-science community.',href:'https://labscommunity.cohere.com/community-programs'},
 {id:'C1',title:'SOLIDWORKS Associate — Mechanical Design',issuer:'Dassault Systèmes',date:'22 October 2022',group:'technical',image:'/credentials/C1.webp'},
 {id:'C2',title:'SOLIDWORKS Associate — Simulation',issuer:'Dassault Systèmes',date:'21 March 2024',group:'technical',image:'/credentials/C2.webp'},
 {id:'C4',title:'Simscape Onramp',issuer:'MathWorks',date:'3 February 2025',group:'technical',image:'/credentials/C4.webp'},
 {id:'C3',title:'Learn to Lead Leadership Certificate',issuer:'Western University',date:'',group:'honours',image:'/credentials/C3.webp'},
 {id:'C11',title:'Engineering Leadership and Innovation Certificate',issuer:'Western University',date:'2026',group:'education',image:'/gallery/graduation-degrees.webp'},
 {id:'C5',title:'Cleanroom Introduction & Wet Bench Safety',issuer:'KAUST · Nanofabrication Core Lab',date:'9 August 2023',group:'kaust',image:'/credentials/C5.webp'},
 {id:'C6',title:'Sharps Safety Training',issuer:'KAUST',date:'29 August 2023',group:'kaust',image:'/credentials/C6.webp'},
 {id:'C7',title:'Laboratory Safety Training',issuer:'KAUST',date:'11 July 2023',group:'kaust',image:'/credentials/C7.webp'},
 {id:'C8',title:'Hazardous Waste Training',issuer:'KAUST',date:'11 July 2023',group:'kaust',image:'/credentials/C8.webp'},
 {id:'C9',title:'Emergency Incident Preparedness',issuer:'KAUST',date:'11 July 2023',group:'kaust',image:'/credentials/C9.webp'},
 {id:'C10',title:'Dean’s Honour List',issuer:'Western University · Faculty of Engineering',date:'2023–2024',group:'honours',image:'/credentials/C10.webp'},
 {id:'C14',title:'Dean’s Honour List',issuer:'Western University · Faculty of Engineering',date:'2024–2025',group:'honours',image:'/credentials/C14.webp'},
 {id:'C12',title:'Engineering Design Day — Honourable Mention',issuer:'Western University · team capstone',date:'2026',group:'honours',image:'/gallery/mower-honourable-mention.webp'},
 {id:'C13',title:'Best Engineer Intern',issuer:'Smart Methods',date:'2024',group:'honours',image:'/gallery/smart-methods-award-portrait.webp',images:['/gallery/smart-methods-award-portrait.webp','/gallery/smart-methods-best-engineer-award.webp']},
];
