"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    date: "",
    time: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFormData({ ...formData, date: selectedDate, time: "" });
    
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const day = dateObj.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekend = day === 5 || day === 6; // getDay() is UTC based, but let's assume local day is weekend if it's Sat/Sun. 
      // Actually, let's fix timezone issue by parsing date string safely
      const [year, month, d] = selectedDate.split('-');
      const localDate = new Date(Number(year), Number(month) - 1, Number(d));
      const localDay = localDate.getDay();
      const isWeekendLocal = localDay === 0 || localDay === 6;
      
      const times = [];
      if (isWeekendLocal) {
        // Finais de semana: 8h às 20h
        for (let i = 8; i <= 20; i++) {
          times.push(`${i.toString().padStart(2, '0')}:00`);
        }
      } else {
        // Dias de semana: 19h às 22h
        for (let i = 19; i <= 22; i++) {
          times.push(`${i.toString().padStart(2, '0')}:00`);
        }
      }
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // URL real do Webhook do Make.com
      const webhookUrl = "https://hook.us2.make.com/h7dv4vvdmht49fvb6vl26nqysl8p58rs"; 
      
      // Enviando dados reais para a automação
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-nexos-dark text-white font-sans selection:bg-nexos-gold selection:text-black">
      {/* Header */}
      <header className="fixed top-0 w-full bg-nexos-darker/90 backdrop-blur-md z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Nexos Digital Intelligence" width={40} height={40} className="rounded-md" />
            <span className="font-bold tracking-widest text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-nexos-goldLight to-nexos-goldDark">
              Nexos
            </span>
          </div>
          <a href="#agendar" className="text-sm font-semibold uppercase tracking-wider border border-nexos-gold text-nexos-gold px-5 py-2 rounded hover:bg-nexos-gold hover:text-black transition-all">
            Agendar Reunião
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 mt-4 animate-fade-in">
          <div className="absolute inset-0 bg-nexos-gold/20 blur-3xl rounded-full"></div>
          <Image 
            src="/logo.jpg" 
            alt="Nexos Logo" 
            fill 
            className="object-cover rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.3)] relative z-10 border border-white/5" 
          />
        </div>

        <div className="inline-block mb-6 px-4 py-1 rounded-full border border-nexos-gold/30 bg-nexos-gold/10 text-nexos-goldLight text-sm font-medium tracking-wide">
          INTELIGÊNCIA ARTIFICIAL & TRÁFEGO DE ALTA PERFORMANCE
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          O Poder de Fogo de uma Corporação <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-nexos-goldLight to-nexos-goldDark">
            na sua Empresa.
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          Transformamos negócios locais e e-commerces com estratégias de tráfego avançadas e sistemas de Inteligência Artificial que vendem, qualificam e agendam 24 horas por dia.
        </p>
        <a href="#agendar" className="bg-nexos-gold text-black font-bold text-lg px-10 py-4 rounded-sm hover:bg-nexos-goldLight hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          Desbloquear Escala Agora
        </a>
      </section>

      {/* Social Proof & Strategy */}
      <section className="py-20 bg-black px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">IA não é uma curiosidade. <br/><span className="text-nexos-gold">É uma alavanca industrial.</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              &quot;A Inteligência Artificial substitui o trabalho braçal e intelectual de nível baixo, permitindo que uma pequena empresa tenha a lucratividade de uma corporação de 100 funcionários.&quot; 
              <br/><br/>
              Na <strong>Nexos</strong>, não entregamos apenas cliques. Entregamos uma arquitetura de negócios robusta. Conectamos o tráfego que paga as contas hoje com a IA que aumenta a sua margem de lucro amanhã.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-nexos-gold pl-4">
                <h4 className="font-bold text-2xl text-white">24/7</h4>
                <p className="text-gray-500 text-sm">Vendas e atendimento automatizados sem pausas.</p>
              </div>
              <div className="border-l-2 border-nexos-gold pl-4">
                <h4 className="font-bold text-2xl text-white">80%</h4>
                <p className="text-gray-500 text-sm">Do foco na estratégia que realmente gera caixa (Princípio de Pareto).</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-nexos-gold/20 to-transparent blur-3xl"></div>
            <div className="border border-white/10 bg-nexos-dark p-8 rounded-xl relative z-10">
              <h3 className="text-xl font-bold mb-4 text-nexos-goldLight">Nossa Metodologia (Tráfego + IA)</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-nexos-gold rounded-full"></div>
                  <p><strong>Motor de Caixa:</strong> Campanhas ultra-segmentadas de resposta direta para gerar fluxo previsível de leads.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-nexos-gold rounded-full"></div>
                  <p><strong>Acelerador de Lucro:</strong> Automação com Chatbots de IA para qualificar leads em tempo real no WhatsApp.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-nexos-gold rounded-full"></div>
                  <p><strong>Hiper-transparência:</strong> Dashboards gerenciais em tempo real. Se houver erro, assumimos e traçamos o plano de correção.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Profile */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-nexos-darker to-black border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-12">
            <h2 className="text-3xl font-bold mb-2">João Guilherme</h2>
            <h3 className="text-nexos-gold text-lg mb-6 uppercase tracking-widest font-semibold">CEO & Founder • Especialista em IA</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              O meu objetivo com a Nexos não é apenas prestar um serviço comum de marketing. A finalidade principal da nossa empresa é <strong>levar a revolução tecnológica das grandes big techs para a realidade dos negócios locais</strong>. 
            </p>
            <p className="text-gray-400 leading-relaxed">
              Acredito na &quot;alavancagem de código&quot;. Desenho ecossistemas onde o Tráfego injeta oxigênio e a IA escala o seu tempo, criando verdadeiras máquinas de fazer dinheiro para os nossos parceiros. 
            </p>
          </div>
          <div className="md:w-1/2 relative h-96 w-full">
            <Image 
              src="/ceo-blue.png" 
              alt="João Guilherme - CEO Nexos" 
              fill 
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Scheduling Form */}
      <section id="agendar" className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pronto para a Evolução?</h2>
            <p className="text-gray-400 text-lg">Agende uma reunião estratégica para entendermos o gargalo do seu negócio.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-nexos-dark p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                <p className="text-gray-400">Verificarei minha agenda e você receberá uma mensagem VIP no WhatsApp para confirmarmos o encontro.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-nexos-gold transition-colors" placeholder="Seu nome" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Melhor E-mail</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-nexos-gold transition-colors" placeholder="email@empresa.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp</label>
                    <input required type="tel" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-nexos-gold transition-colors" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Data da Reunião</label>
                    <input required type="date" value={formData.date} onChange={handleDateChange} className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-nexos-gold transition-colors [color-scheme:dark]" />
                    <p className="text-xs text-gray-500 mt-2">Dias úteis a partir das 19h. Finais de semana a partir das 8h.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Horário (1 Hora)</label>
                    <select required disabled={!formData.date} value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-nexos-gold transition-colors disabled:opacity-50">
                      <option value="">Selecione um horário</option>
                      {availableTimes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button disabled={status === "loading"} type="submit" className="w-full bg-nexos-gold text-black font-bold text-lg px-8 py-4 rounded hover:bg-nexos-goldLight transition-all mt-8 disabled:opacity-70">
                  {status === "loading" ? "Processando..." : "Solicitar Agendamento Estratégico"}
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Nexos Digital Intelligence. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
