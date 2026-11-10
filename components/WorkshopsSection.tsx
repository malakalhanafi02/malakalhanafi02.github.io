import {ArrowUpRight} from 'lucide-react';

const events=[
 {title:'AWS Academy: agentic AI',image:'/gallery/aws-academy-leap.png',alt:'AWS AI Training Academy venue',text:'I attended an AWS Academy session on retrieval-augmented generation (RAG), guardrails, and building agentic AI with Amazon Bedrock.',href:'https://aws.amazon.com/bedrock/',link:'Amazon Bedrock'},
 {title:'IBM TechXchange Toronto Z Council',image:'/gallery/ibm-techxchange-workshop.webp',alt:'Participants in an IBM TechXchange workshop',text:'At IBM TechXchange Toronto Z Council, I explored mainframes and completed a hands-on IBM Db2 API workshop.'},
 {title:'KAUST data science workshop',image:'/gallery/kaust-data-science-workshop-rotated.webp',alt:'Introduction to Shell for Data Scientists workshop at KAUST',text:'I attended the Visualization Core Lab introduction to shell for data scientists, part of its data science workshop series.'},
 {title:'MVP and go-to-market workshop',image:'/gallery/mvp-go-to-market-workshop-rotated.webp',alt:'Workshop presentation on validating an idea and finding first customers',text:'At a Western Engineering Innovation & Entrepreneurship Club workshop, I studied MVP validation, business models, go-to-market planning, and finding initial customers.'},
 {title:'Women in Tech Summit',image:'/gallery/women-in-tech-summit.webp',alt:'Speaker presenting at the Women in Tech Summit',text:'I attended the Women in Tech Summit and heard perspectives on careers and leadership in technology.'}
];

export default function WorkshopsSection(){return <section className="workshops-section section" id="workshops"><div className="section-heading"><div><p className="eyebrow">Professional development</p><h2>Workshops</h2></div></div><div className="workshops-grid">{events.map(event=><article className="workshop-card" key={event.title}><img src={event.image} alt={event.alt}/><div><h3>{event.title}</h3><p>{event.text}</p>{event.href&&<a className="text-link" href={event.href} target="_blank" rel="noreferrer">{event.link} <ArrowUpRight size={15}/></a>}</div></article>)}</div></section>}
