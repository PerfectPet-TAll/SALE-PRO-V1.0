import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, Paperclip, MoreHorizontal, FileText, CheckCircle2, HelpCircle, X, Search, Settings, MousePointerClick } from 'lucide-react';
import { UserGuidePanel } from '../../components/shared/UserGuidePanel';

const AiCopilot = () => {
    const [prompt, setPrompt] = useState("");
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            role: 'assistant', 
            content: "Hello! I'm MT PRO's AI Copilot. I can help analyze sales data, draft emails to leads, or summarize your recent performance. What would you like to do today?",
            suggestions: ["Analyze Q2 Sales", "Draft email to Alpha Corp", "Give me a summary of my pipeline"]
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!prompt.trim()) return;
        
        const newUserMsg = { id: Date.now(), role: 'user', content: prompt };
        setMessages(prev => [...prev, newUserMsg]);
        setPrompt("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: `Based on your request regarding "${newUserMsg.content}", I've analyzed the current data. The performance metrics indicate an upward trend with a 15% increase in lead conversion compared to last month. Would you like me to generate a detailed report?`,
            }]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa] rounded-2xl border border-[#cdd0db] shadow-sm overflow-hidden min-h-[600px] relative animate-fadeIn">
             <UserGuidePanel isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} title="AI Copilot" desc="ผู้ช่วยประมวลผลและวิเคราะห์ข้อมูลอัจฉริยะ (AI Assistant)">
                <section className="animate-fadeIn mt-6">
                    <h4 className="text-[14px] font-black text-[#022d41] mb-3 uppercase flex items-center gap-2 border-b-2 border-[#e7dedd] pb-2 font-mono">
                    <MousePointerClick size={18} className="text-[#af7a2b]"/> 1. Action Buttons Guide
                    </h4>
                    <div className="space-y-3 font-medium bg-[#f8f9fa] p-4 rounded-xl border border-[#daecf3] shadow-sm text-[12px]">
                        <div className="flex items-center gap-3"><button className="w-8 h-8 flex items-center justify-center bg-[#1aa6b7] text-white rounded-xl shadow-sm"><Send size={14}/></button> <span className="text-[11px] text-[#214573]"><b>Send Message:</b> ส่งข้อความหรือคำสั่งไปยัง AI Copilot</span></div>
                        <div className="flex items-center gap-3"><button className="w-8 h-8 flex items-center justify-center text-[#8E95A6] hover:bg-white rounded-lg"><RefreshCw size={14}/></button> <span className="text-[11px] text-[#214573]"><b>New Session:</b> เริ่มต้นการสนทนาใหม่ หรือล้างประวัติแชท</span></div>
                        <div className="flex items-center gap-3"><button className="px-3 py-1 bg-white border border-[#cdd0db] rounded-full text-[10px] font-black text-[#6293b9] uppercase shadow-sm">Suggestion</button> <span className="text-[11px] text-[#214573]"><b>Quick Actions:</b> กดที่คำหลักเพื่อใช้คำสั่งที่ระบบแนะนำแบบรวดเร็ว</span></div>
                        <div className="flex items-center gap-3"><button className="w-8 h-8 flex items-center justify-center text-[#8E95A6] hover:bg-white rounded-lg border border-[#cdd0db]"><Paperclip size={14}/></button> <span className="text-[11px] text-[#214573]"><b>Attach File:</b> อัปโหลดเอกสาร (CSV, PDF) ให้ AI ช่วยวิเคราะห์</span></div>
                    </div>
                </section>
             </UserGuidePanel>

             {/* Header */}
             <div className="bg-[#022d41] px-6 py-4 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1aa6b7] to-[#1f2a44] flex items-center justify-center shadow-lg border border-[#398797]/50">
                        <Bot size={22} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-[14px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                            AI COPILOT <Sparkles size={14} className="text-[#fdda04] animate-pulse" />
                        </h2>
                        <p className="text-[10px] text-[#8E95A6] font-bold uppercase tracking-widest">Sale & Marketing Assistant</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsGuideOpen(true)} className="p-2 text-[#8E95A6] hover:text-white hover:bg-[#1f2a44] rounded-lg transition-colors group relative">
                        <HelpCircle size={16} className="group-hover:text-[#fdda04]" />
                    </button>
                    <div className="w-px h-5 bg-white/10 mx-1"></div>
                    <button className="p-2 text-[#8E95A6] hover:text-white hover:bg-[#1f2a44] rounded-lg transition-colors"><RefreshCw size={16} /></button>
                    <button className="p-2 text-[#8E95A6] hover:text-white hover:bg-[#1f2a44] rounded-lg transition-colors"><MoreHorizontal size={16} /></button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 custom-scrollbar bg-white relative">
                {/* Background Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] -rotate-[15deg] pointer-events-none">
                    <Bot size={400} />
                </div>

                {messages.map((msg, i) => (
                    <div key={msg.id} className={`flex items-start gap-4 max-w-[85%] relative z-10 ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
                            msg.role === 'user' ? 'bg-[#1f2a44] border-[#022d41]' : 'bg-[#e7dedd] border-[#cdd0db]'
                        }`}>
                            {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-[#022d41]" />}
                        </div>
                        <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-[#1f2a44] text-white rounded-tr-sm border border-[#022d41]' 
                                    : 'bg-white border-[#cdd0db] border rounded-tl-sm text-[#1f2a44]'
                            }`}>
                                {msg.content}
                            </div>
                            
                            {msg.role === 'assistant' && msg.suggestions && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {msg.suggestions.map((suggestion, idx) => (
                                        <button key={idx} onClick={() => setPrompt(suggestion)} className="px-3 py-1.5 bg-[#f8f9fa] border border-[#cdd0db] hover:border-[#1aa6b7] hover:bg-[#1aa6b7]/5 rounded-full text-[10px] font-black text-[#6293b9] uppercase tracking-widest transition-colors shadow-sm whitespace-nowrap">
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex items-center gap-4 max-w-[75%] relative z-10">
                        <div className="w-8 h-8 rounded-full bg-[#e7dedd] border border-[#cdd0db] flex items-center justify-center shrink-0 shadow-sm">
                            <Bot size={14} className="text-[#022d41] animate-pulse" />
                        </div>
                        <div className="p-4 bg-white border border-[#cdd0db] rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                            <span className="w-1.5 h-1.5 bg-[#8E95A6] rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-[#8E95A6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1.5 h-1.5 bg-[#8E95A6] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#f8f9fa] border-t border-[#cdd0db] z-10 shrink-0">
                <div className="flex items-center bg-white border border-[#cdd0db] rounded-2xl shadow-sm focus-within:border-[#1aa6b7] focus-within:ring-1 focus-within:ring-[#1aa6b7]/30 transition-all p-2 pr-3">
                    <button className="p-2 text-[#8E95A6] hover:text-[#022d41] transition-colors"><Paperclip size={18} /></button>
                    <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask AI Copilot to analyze sales, draft messages..." 
                        className="flex-1 px-3 py-2 text-[13px] font-mono font-medium text-[#1f2a44] outline-none bg-transparent placeholder-[#8E95A6]"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!prompt.trim() || isTyping}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            prompt.trim() && !isTyping 
                                ? 'bg-[#1aa6b7] text-white shadow-md hover:-rotate-12 hover:scale-105' 
                                : 'bg-[#e7dedd] text-[#8E95A6] cursor-not-allowed'
                        }`}
                    >
                        <Send size={16} className={prompt.trim() && !isTyping ? "translate-x-0.5 -translate-y-0.5" : ""} />
                    </button>
                </div>
                <p className="text-center mt-2.5 text-[9px] text-[#8E95A6] font-bold uppercase tracking-widest px-4">
                    AI responses may vary. Please verify important information before making decisions.
                </p>
            </div>
        </div>
    );
};

export default AiCopilot;
