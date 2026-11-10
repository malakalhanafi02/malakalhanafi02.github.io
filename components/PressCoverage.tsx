import coverage from '@/lib/press.json';
import {ArrowUpRight} from 'lucide-react';
export default function PressCoverage({featured=false}:{featured?:boolean}){
 const links=<div className="press-links">{coverage.map(a=><a href={a.href} key={a.href} target="_blank" rel="noreferrer"><div><small>{a.outlet} · {a.date}</small><h4>{a.title}</h4></div><ArrowUpRight size={20}/></a>)}</div>;
 return <section className={'press-coverage'+(featured?' news-feature':'')}>
 {featured?<><div className="news-banner-heading"><div><p className="eyebrow">In the news!</p><h2>Autonomous lawn mower at Design Day</h2><p>Western News and the London Economic Development Corporation (LEDC) featured our autonomous lawn mower team and prototype.</p></div></div>{links}</>:<><p className="eyebrow">In the news!</p><h3>Autonomous lawn mower · Design Day</h3><p>Coverage featuring our capstone team and prototype.</p>{links}</>}
 </section>
}
