import {ArrowUpRight} from 'lucide-react';

const events=[
 {title:'AWS Academy at LEAP',image:'/gallery/aws-academy-leap.png',alt:'AWS AI Training Academy booth at LEAP',text:'I attended an AWS Academy session at LEAP on retrieval-augmented generation (RAG), guardrails, and building agentic AI with Amazon Bedrock.',href:'https://www.linkedin.com/company/amazon-web-services/',link:'Amazon Web Services'},
 {title:'IBM TechXchange Toronto Z Council',image:'/gallery/ibm-techxchange-workshop.webp',alt:'Participants in an IBM TechXchange workshop',text:'I joined the Western Cyber Society visit to IBM TechXchange Toronto Z Council, where we explored mainframes and worked through an IBM Db2 API workshop.'},
 {title:'Women in Tech Summit',image:'/gallery/women-in-tech-summit.webp',alt:'Speaker presenting at the Women in Tech Summit',text:'I attended the Women in Tech Summit and heard perspectives on careers and leadership in technology.'}
];

export default function WorkshopsSection(){return <section className="workshops-section section" id="workshops"><div className="section-heading"><div><p className="eyebrow">Professional development</p><h2>Workshops & events</h2></div></div><div className="workshops-grid">{events.map(event=><article className="workshop-card" key={event.title}><img src={event.image} alt={event.alt}/><div><h3>{event.title}</h3><p>{event.text}</p>{event.href&&<a className="text-link" href={event.href} target="_blank" rel="noreferrer">{event.link} <ArrowUpRight size={15}/></a>}</div></article>)}</div></section>}
