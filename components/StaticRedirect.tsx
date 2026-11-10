"use client";
import {useEffect} from 'react';
export default function StaticRedirect({href}:{href:string}){
 useEffect(()=>{window.location.replace(href)},[href]);
 return <section className="wrap page-intro"><h1>Page moved</h1><p><a className="text-link" href={href}>Continue to the project ↗</a></p></section>;
}
