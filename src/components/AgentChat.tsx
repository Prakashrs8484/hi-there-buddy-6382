import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  role: "user" | "agent";
  content: string;
  timestamp: Date;
}

interface AgentChatProps {
  agentName: string;
  agentIcon: React.ElementType;
  placeholder?: string;
  onSendMessage?: (message: string) => void;
  initialMessages?: Message[];
}

const AgentChat = ({
  agentName,
  agentIcon: Icon,
  placeholder = "Ask me anything...",
  onSendMessage,
  initialMessages = [],
}: AgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse: Message = {
        role: "agent",
        content: `I've received your request: "${input}". I'm processing this and will update your workspace with personalized insights shortly.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
      setIsTyping(false);
      onSendMessage?.(input);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{agentName}</h3>
            <p className="text-xs text-muted-foreground">AI Agent • Always Active</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Start a conversation with your {agentName}
              </p>
            </div>
          )}

          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="w-8 h-8 flex items-center justify-center bg-primary/10">
                {message.role === "agent" ? (
                  <Icon className="w-4 h-4 text-primary" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-accent" />
                )}
              </Avatar>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex items-center justify-center bg-primary/10">
                <Icon className="w-4 h-4 text-primary" />
              </Avatar>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-100" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;
