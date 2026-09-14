import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { nav, whatsappUrl } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
    <div className="site-container flex h-full items-center justify-between gap-6">
      <Link to="/" aria-label="Lacort Odontologia — início" onClick={() => setOpen(false)}>
        <img src="/lacort-logo-branco.webp" alt="Lacort Odontologia Especializada" className="h-12 w-auto md:h-14" />
      </Link>
      <nav aria-label="Navegação principal" className="hidden items-center gap-5 xl:flex">
        {nav.map((item) => <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>{item.label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="gold" className="hidden sm:inline-flex"><a href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar avaliação</a></Button>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
    </div>
    {open && <div className="mobile-menu xl:hidden"><nav aria-label="Navegação mobile" className="site-container flex flex-col py-8">{nav.map((item, index) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="mobile-link"><span>0{index + 1}</span>{item.label}</Link>)}<Button asChild variant="gold" size="lg" className="mt-8"><a href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar avaliação</a></Button></nav></div>}
  </header>;
}