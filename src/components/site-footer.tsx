import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { clinic, nav, whatsappUrl } from "@/lib/site-data";

export function SiteFooter() {
  return <footer className="bg-ink text-cream">
    <div className="site-container grid gap-12 py-16 md:grid-cols-[1.2fr_.8fr_.8fr] md:py-20">
      <div><img  alt="Lacort Odontologia Especializada" className="h-20 w-auto" /><p className="mt-6 max-w-sm text-sm leading-7 text-cream/70">Odontologia especializada com escuta, clareza e respeito em cada etapa do seu cuidado.</p></div>
      <div><p className="footer-title">Navegue</p><nav className="mt-5 grid gap-3">{nav.map((item) => <Link key={item.to} to={item.to} className="footer-link">{item.label}</Link>)}</nav></div>
      
      <div><p className="footer-title">Encontre a Lacort</p><div className="mt-5 grid gap-4 text-sm text-cream/75"><a
       className="footer-link"
        href={clinic.mapsUrl}
        target="_blank"
        rel="noreferrer"
         >
       <MapPin className="mr-2 inline size-4 text-gold" />
        {clinic.address}
        <br />
  <span className="ml-6">{clinic.district}</span>
</a>
      <a className="footer-link" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 inline size-4 text-gold" />{clinic.whatsappDisplay}</a><a className="footer-link" href="https://instagram.com/lacortodonto" target="_blank" rel="noreferrer"><Instagram className="mr-2 inline size-4 text-gold" />{clinic.instagram}</a></div></div>
    </div>
    <div className="border-t border-cream/15"><div className="site-container flex flex-col gap-3 py-6 text-xs text-cream/55 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} Lacort Odontologia Especializada. {clinic.registration}.</p><div className="flex gap-5"><Link to="/politica-de-privacidade">Privacidade</Link><Link to="/termos-de-uso">Termos de uso</Link></div></div></div>
  </footer>;
}