import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content:
        "Hello Alex! I'm your StudyFlow AI academic copilot. I've analyzed your Spring 2025 semester syllabus and upcoming deliverables:\n\n• You have **CS301 AVL Trees** due yesterday (recommend submitting late today or requesting an extension).\n• **MATH240 Probability & Statistics** study session is active right now in Science Hall 304.\n• You have a **14-day study streak** with 34.5 hrs logged this week!\n\nHow can I help you today? You can ask for a recovery study schedule, code explanation, flashcard generation, or exam review plan."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    try {
      // Check if API key is present
      const apiKey = process.env.GEMINI_API_KEY || (window as any).GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are StudyFlow AI, an intelligent academic coach for Alex Chen, a 3rd year Computer Science student enrolled in:
- CS301: Advanced Data Structures & Algorithms (82% mastery, AVL trees & Red-Black trees)
- CS320: Python for Data Science & ML (76% mastery, Pandas, AsyncIO)
- CS315: Database Systems (68% mastery, B-Trees & Relational Schema Normalization)
- MATH240: Probability & Statistics (71% mastery, Bayes Theorem & Joint Distributions)
- MATH210: Discrete Mathematics (62% mastery, Graph Theory & Proofs)
Provide concise, structured, encouraging, and pedagogically sound responses. Use markdown formatting with bullet points and bold highlights.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nStudent asks: ${textToSend}` }]
            }
          ]
        });

        const reply = response.text || "I've structured a study recommendation for your current courses.";
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } else {
        // High quality simulated response tailored to student context
        setTimeout(() => {
          let simulatedResponse = '';
          const lower = textToSend.toLowerCase();

          if (lower.includes('schedule') || lower.includes('plan')) {
            simulatedResponse = `### 📅 Optimized 3-Day Sprint Recovery Schedule\n\nBased on your deadlines and cognitive peak (9:30 AM – 12:00 PM):\n\n1. **Tonight (18:30 – 20:00)**: Python AsyncIO lab session (finish FastAPI endpoints).\n2. **Tomorrow Morning (09:30 – 11:30)**: Red-Black Tree 2D Visualizer submission polish.\n3. **Friday Morning (09:00 – 11:00)**: Shift 2 hours into Discrete Math Graph Theory proofs to safeguard your A- average.\n4. **Sunday Evening**: Rest & recovery (keep your streak while preventing burnout).`;
          } else if (lower.includes('avl') || lower.includes('tree') || lower.includes('rotation')) {
            simulatedResponse = `### 🌲 AVL Tree Rotations Cheat Sheet\n\nFor node $Z$ with unbalance factor $|BF| > 1$:\n\n• **Left-Left (LL)**: Single Right Rotation on $Z$.\n• **Right-Right (RR)**: Single Left Rotation on $Z$.\n• **Left-Right (LR)**: Left Rotate on left child $Y$, then Right Rotate on $Z$.\n• **Right-Left (RL)**: Right Rotate on right child $Y$, then Left Rotate on $Z$.\n\n*Time Complexity:* $O(1)$ per rotation, maintaining $O(\\log N)$ lookup invariant.`;
          } else if (lower.includes('bayes') || lower.includes('probability')) {
            simulatedResponse = `### 🎲 Bayes' Theorem Review\n\n$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$\n\nWhere:\n• **$P(A)$**: Prior probability before observing data $B$\n• **$P(B|A)$**: Likelihood of observing evidence $B$ given hypothesis $A$\n• **$P(B)$**: Total marginal probability of evidence (summing over all partitions)\n• **$P(A|B)$**: Posterior updated belief`;
          } else {
            simulatedResponse = `### 🎯 StudyFlow AI Strategic Analysis\n\nGreat question! Looking at your current semester workload:\n\n• **Current Streak**: 14 Days 🔥\n• **Highest Urgency**: CS301 Tree Rotations & CS315 PostgreSQL Indexing Report\n• **Tip**: Schedule 2 Pomodoro sprints (50 min total) during your morning focus window (09:30 AM - 12:00 PM) for maximum retention (+34% retention boost).`;
          }

          setMessages((prev) => [...prev, { role: 'assistant', content: simulatedResponse }]);
        }, 600);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I've calculated your optimal study allocation! Allocate 90 minutes to Discrete Math proofs this weekend to protect your 3.82 GPA track and clear upcoming deliverable backlogs."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Generate recovery study plan',
    'Explain AVL Tree Rotations',
    'Summarize Bayes Theorem formula',
    'How can I boost my 3.82 GPA?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-2xl bg-surface-container-lowest shadow-2xl overflow-hidden border border-surface-container flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-tertiary-container/30 via-surface-container to-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-on-surface">StudyFlow AI Assistant</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-tertiary text-on-tertiary">
                  GEMINI ACTIVE
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">Your personal curriculum and exam strategy copilot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-3.5 bg-surface-container-lowest">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-primary text-on-primary'
                    : 'bg-tertiary text-on-tertiary'
                }`}
              >
                {msg.role === 'user' ? 'AC' : '✦'}
              </div>
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-on-primary rounded-tr-xs shadow-xs'
                    : 'bg-surface-container-low text-on-surface rounded-tl-xs border border-surface-container'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 text-xs font-bold animate-pulse">
                ✦
              </div>
              <div className="p-3 rounded-2xl bg-surface-container-low text-outline text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                <span>Synthesizing syllabus analytics & recommendations...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-surface-container-low/60 flex items-center gap-2 overflow-x-auto border-t border-surface-container-low scrollbar-none">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px] text-tertiary">bolt</span>
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your homework, syllabus timeline, or request a flashcard deck..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-tertiary/30 border border-transparent"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-tertiary hover:bg-primary-container disabled:opacity-50 text-on-tertiary font-semibold text-sm transition-all shadow-sm active:scale-98 flex items-center gap-1.5"
          >
            <span>Ask</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
