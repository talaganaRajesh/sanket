'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MegaFooter from '@/components/MegaFooter';

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h2 className="text-[12px] font-black text-black uppercase tracking-[0.8em] mb-12 italic">Direct Channel</h2>
          <h1 className="text-7xl md:text-9xl font-outfit font-black text-black tracking-tighter leading-[0.85] uppercase italic mb-16">
            Get in <br /> <span className="text-zinc-300">Sync</span>
          </h1>
        </div>
      </section>

      <section className="py-40 bg-zinc-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
              <div>
                 <h3 className="text-4xl font-outfit font-black text-black mb-12 uppercase italic tracking-tighter">Office <span className="text-zinc-300">Net</span></h3>
                 <p className="text-xl text-zinc-500 font-medium leading-relaxed italic lowercase mb-16 max-w-sm">
                   our distributed nodes are located in key neutral zones globally.
                 </p>
                 
                 <div className="space-y-16">
                    <div>
                       <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-6 italic">San Francisco Node</h4>
                       <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest leading-loose">
                         882 Neural Drive, Ste 400<br />
                         CA 94103, USA
                       </p>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-6 italic">London Node</h4>
                       <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest leading-loose">
                         Kings Cross Neural Quarter<br />
                         N1C 4AG, UK
                       </p>
                    </div>
                 </div>
              </div>
              
              <div className="glass p-12 md:p-16 rounded-[4rem] border border-black/5 bg-white shadow-2xl">
                 <form className="space-y-10">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-black uppercase tracking-[0.4em] italic">Network ID</label>
                       <input 
                         type="text" 
                         placeholder="IDENT_NAME" 
                         className="w-full bg-black/5 border border-black/5 rounded-2xl px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-black/20 transition-all italic"
                       />
                    </div>
                    
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-black uppercase tracking-[0.4em] italic">Neural Mail</label>
                       <input 
                         type="email" 
                         placeholder="ADDR@DOMAIN.COM" 
                         className="w-full bg-black/5 border border-black/5 rounded-2xl px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-black/20 transition-all italic"
                       />
                    </div>
                    
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-black uppercase tracking-[0.4em] italic">Transmission</label>
                       <textarea 
                         rows={4}
                         placeholder="SEQUENCE_DATA..." 
                         className="w-full bg-black/5 border border-black/5 rounded-2xl px-8 py-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-black/20 transition-all italic resize-none"
                       ></textarea>
                    </div>
                    
                    <button className="w-full bg-black text-white py-6 rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-98 shadow-2xl flex items-center justify-center gap-4">
                       <span>Transmit Sequence</span>
                       <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </button>
                 </form>
              </div>
           </div>
        </div>
      </section>

      <MegaFooter />
    </main>
  );
};

export default ContactPage;
