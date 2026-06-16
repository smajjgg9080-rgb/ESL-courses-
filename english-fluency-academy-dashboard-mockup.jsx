import React, { useEffect, useState } from "react";
import {
  Home,
  Target,
  MessageCircle,
  TrendingUp,
  User,
  Flame,
  Play,
  ChevronRight,
  Mic,
} from "lucide-react";

const colors = {
  bg: "#0A0F1C",
  surface: "#101B2D",
  surfaceHover: "#152437",
  gold: "#D4A656",
  emerald: "#1FA978",
  cyan: "#4FD1E8",
  text: "#F4EFE2",
  muted: "#8C96AC",
};

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;900&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  .ef-display { font-family: 'Fraunces', serif; }
  .ef-body { font-family: 'Manrope', sans-serif; }
  .ef-mono { font-family: 'JetBrains Mono', monospace; }
`;

function FluencyCompass({ xpPercent = 68, streakPercent = 85, level = 7 }) {
  const size = 168;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const [animatedXp, setAnimatedXp] = useState(0);
  const [animatedStreak, setAnimatedStreak] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimatedXp(xpPercent);
      setAnimatedStreak(streakPercent);
    }, 100);
    return () => clearTimeout(t);
  }, [xpPercent, streakPercent]);

  const starPoints = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4;
    const inner = r - 22;
    const outer = r - 6;
    const x1 = size / 2 + inner * Math.cos(angle);
    const y1 = size / 2 + inner * Math.sin(angle);
    const x2 = size / 2 + outer * Math.cos(angle);
    const y2 = size / 2 + outer * Math.sin(angle);
    return `M${x1},${y1} L${x2},${y2}`;
  }).join(" ");

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute top-0 left-0">
        <path d={starPoints} stroke={colors.muted} strokeWidth="1.5" opacity="0.25" />
        <circle cx={size / 2} cy={size / 2} r={r - 28} stroke={colors.muted} strokeWidth="1" fill="none" opacity="0.2" />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.surfaceHover}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.gold}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animatedXp / 100) * circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 900ms ease-out" }}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r - 16}
          stroke={colors.surfaceHover}
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r - 16}
          stroke={colors.emerald}
          strokeWidth="6"
          fill="none"
          strokeDasharray={2 * Math.PI * (r - 16)}
          strokeDashoffset={
            2 * Math.PI * (r - 16) - (animatedStreak / 100) * 2 * Math.PI * (r - 16)
          }
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 900ms ease-out 150ms" }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <span className="ef-display text-3xl" style={{ color: colors.text }}>
          {level}
        </span>
        <span className="ef-body text-xs" style={{ color: colors.muted }}>
          Level
        </span>
      </div>
    </div>
  );
}

function MissionCard({ icon, title, xp, progress, done }) {
  return (
    <div
      className="flex-shrink-0 w-56 rounded-xl p-4 flex flex-col gap-3"
      style={{ backgroundColor: colors.surface }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            border: `2px solid ${done ? colors.gold : colors.muted}`,
            color: done ? colors.gold : colors.muted,
          }}
        >
          {icon}
        </div>
        <span className="ef-mono text-xs" style={{ color: colors.gold }}>
          +{xp} XP
        </span>
      </div>
      <p className="ef-body text-sm font-medium" style={{ color: colors.text }}>
        {title}
      </p>
      <div className="h-1.5 rounded-full" style={{ backgroundColor: colors.surfaceHover }}>
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${progress}%`, backgroundColor: colors.emerald }}
        />
      </div>
    </div>
  );
}

function StreakRow() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const status = ["done", "done", "done", "today", "upcoming", "upcoming", "upcoming"];
  return (
    <div className="flex items-center gap-2">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center ef-mono text-xs"
            style={{
              backgroundColor: status[i] === "done" ? colors.emerald : "transparent",
              border: `1.5px solid ${
                status[i] === "today" ? colors.emerald : colors.muted
              }`,
              color: status[i] === "done" ? colors.bg : colors.muted,
            }}
          >
            {d}
          </div>
        </div>
      ))}
    </div>
  );
}

const navItems = [
  { icon: <Home size={18} />, label: "Dashboard", active: true },
  { icon: <Target size={18} />, label: "Missions" },
  { icon: <MessageCircle size={18} />, label: "AI Practice" },
  { icon: <TrendingUp size={18} />, label: "Progress" },
  { icon: <User size={18} />, label: "Profile" },
];

export default function Dashboard() {
  return (
    <div className="ef-body min-h-screen flex" style={{ backgroundColor: colors.bg }}>
      <style>{fontImport}</style>

      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 p-5 gap-1 flex-shrink-0"
        style={{ borderRight: `1px solid ${colors.surfaceHover}` }}
      >
        <div className="mb-8">
          <p className="ef-display text-lg" style={{ color: colors.text }}>
            English Fluency
          </p>
          <p className="ef-mono text-xs" style={{ color: colors.muted }}>
            Academy
          </p>
        </div>
        {navItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer"
            style={{
              borderLeft: item.active ? `2px solid ${colors.cyan}` : "2px solid transparent",
              color: item.active ? colors.cyan : colors.muted,
            }}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="ef-display text-2xl" style={{ color: colors.text }}>
              Welcome back, Saleh
            </p>
            <p className="text-sm mt-1" style={{ color: colors.muted }}>
              3 missions left today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={18} color={colors.gold} />
            <span className="ef-mono text-sm" style={{ color: colors.gold }}>
              12-day streak
            </span>
          </div>
        </div>

        {/* Hero row: Compass + streak */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div
            className="rounded-2xl p-6 flex items-center gap-6"
            style={{ backgroundColor: colors.surface }}
          >
            <FluencyCompass xpPercent={68} streakPercent={85} level={7} />
            <div>
              <p className="ef-mono text-3xl" style={{ color: colors.text }}>
                2,340 <span className="text-base" style={{ color: colors.muted }}>XP</span>
              </p>
              <p className="text-sm mt-1" style={{ color: colors.muted }}>
                660 XP to Level 8
              </p>
              <button
                className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                style={{ backgroundColor: colors.gold, color: colors.bg }}
              >
                <Play size={14} /> Continue mission
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 flex-1 flex flex-col justify-between"
            style={{ backgroundColor: colors.surface }}
          >
            <p className="text-sm font-medium mb-3" style={{ color: colors.text }}>
              This week
            </p>
            <StreakRow />
            <p className="text-xs mt-4" style={{ color: colors.muted }}>
              Keep today's session going to hold your streak.
            </p>
          </div>
        </div>

        {/* Missions */}
        <p className="text-sm font-medium mb-3" style={{ color: colors.text }}>
          Today's missions
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2 mb-8">
          <MissionCard icon={<Target size={16} />} title="Past tense drills" xp={40} progress={100} done />
          <MissionCard icon={<MessageCircle size={16} />} title="5-min AI conversation" xp={60} progress={40} />
          <MissionCard icon={<Target size={16} />} title="Vocabulary: travel" xp={30} progress={0} />
        </div>

        {/* AI Conversation preview */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: colors.surface }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium" style={{ color: colors.text }}>
              AI Conversation Partner
            </p>
            <div className="flex items-center gap-1 text-xs" style={{ color: colors.cyan }}>
              Open <ChevronRight size={14} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="self-start max-w-xs rounded-xl px-4 py-2 text-sm"
              style={{ border: `1px solid ${colors.cyan}`, color: colors.text }}
            >
              How was your weekend? Tell me about it.
            </div>
            <div
              className="self-end max-w-xs rounded-xl px-4 py-2 text-sm"
              style={{ backgroundColor: colors.surfaceHover, color: colors.text }}
            >
              I <span style={{ borderBottom: `1.5px solid ${colors.cyan}` }}>have went</span> to Alexandria with my family.
            </div>
          </div>

          <button
            className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
            style={{ border: `1px solid ${colors.cyan}`, color: colors.cyan }}
          >
            <Mic size={14} /> Practice speaking
          </button>
        </div>
      </main>
    </div>
  );
}
