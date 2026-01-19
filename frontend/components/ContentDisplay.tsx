"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import type { TabId } from "./Sidebar";
import { useState, useEffect } from "react";
import { knowledgeData } from "@/lib/data/knowledge";
import { lessonData } from "@/lib/data/lesson";
import { routineData, weeklyScheduleData, routineHabitsData } from "@/lib/data/routine";
import { todosData } from "@/lib/data/todos";
import { researchSitesData } from "@/lib/data/researchSites";
import { aboutMeData } from "@/lib/data/aboutMe";
import type { RoutineItem, WeeklyScheduleItem } from "@/lib/data/routine";

type ContentDisplayProps = {
  activeTab: TabId;
};

function RoutineDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      setCurrentDay(days[new Date().getDay()]);
    }, 60000); // Update every minute

    // Initial set
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setCurrentDay(days[new Date().getDay()]);

    return () => clearInterval(timer);
  }, []);

  const getTimeStatus = (item: RoutineItem): "current" | "upcoming" | "past" | "all-day" => {
    const now = currentTime;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    if (item.time === "00:00") {
      return "all-day";
    }

    const [hours, minutes] = item.time.split(":").map(Number);
    const taskStartMinutes = hours * 60 + minutes;
    const taskEndMinutes = taskStartMinutes + (item.duration || 0);

    if (nowMinutes >= taskStartMinutes && nowMinutes < taskEndMinutes) {
      return "current";
    } else if (nowMinutes < taskStartMinutes) {
      return "upcoming";
    } else {
      return "past";
    }
  };

  const getWeeklyScheduleStatus = (item: WeeklyScheduleItem): "current" | "upcoming" | "past" => {
    if (item.day !== currentDay) {
      return "past"; // Only show current day's items as active
    }

    const now = currentTime;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [startHours, startMins] = item.startTime.split(":").map(Number);
    const [endHours, endMins] = item.endTime.split(":").map(Number);
    const startMinutes = startHours * 60 + startMins;
    const endMinutes = endHours * 60 + endMins;

    if (nowMinutes >= startMinutes && nowMinutes < endMinutes) {
      return "current";
    } else if (nowMinutes < startMinutes) {
      return "upcoming";
    } else {
      return "past";
    }
  };

  const formatTime = (time: string): string => {
    if (time === "00:00") return "All Day";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const isTaskPast = (item: WeeklyScheduleItem): boolean => {
    if (item.day !== currentDay) return true;
    const now = currentTime;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [endHours, endMins] = item.endTime.split(":").map(Number);
    const endMinutes = endHours * 60 + endMins;
    return nowMinutes >= endMinutes;
  };

  // Convert daily habits to weekly schedule format
  const convertHabitToScheduleItem = (item: RoutineItem, day: string, index: number): WeeklyScheduleItem => {
    const [hours, minutes] = item.time.split(":").map(Number);
    const durationMinutes = item.duration || 0;
    const totalStartMinutes = hours * 60 + minutes;
    const totalEndMinutes = totalStartMinutes + durationMinutes;
    const endHours = Math.floor(totalEndMinutes / 60) % 24;
    const endMins = totalEndMinutes % 60;
    
    const formatTimeSlot = (startH: number, startM: number, endH: number, endM: number) => {
      const formatHour = (h: number, m: number) => {
        const hour12 = h % 12 || 12;
        const ampm = h >= 12 ? "PM" : "AM";
        return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
      };
      return `${formatHour(startH, startM)} – ${formatHour(endH, endM)}`;
    };

    const durationStr = durationMinutes > 0 
      ? durationMinutes >= 60 
        ? `${Math.floor(durationMinutes / 60)} hr${durationMinutes % 60 > 0 ? ` ${durationMinutes % 60} min` : ''}`
        : `${durationMinutes} min`
      : "All Day";

    return {
      id: `habit-${day.toLowerCase()}-${index}`,
      day,
      timeSlot: item.time === "00:00" ? "All Day" : formatTimeSlot(hours, minutes, endHours, endMins),
      duration: durationStr,
      activity: item.task,
      alignment: "Daily Habit",
      startTime: item.time === "00:00" ? "00:00" : `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
      endTime: item.time === "00:00" ? "23:59" : `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`,
    };
  };

  // Group weekly schedule by day and merge with daily habits
  const scheduleByDay: { [key: string]: WeeklyScheduleItem[] } = {};
  
  // First, add weekly schedule items
  weeklyScheduleData.forEach((item) => {
    if (!scheduleByDay[item.day]) {
      scheduleByDay[item.day] = [];
    }
    scheduleByDay[item.day].push(item);
  });

  // Then, add daily habits to each day (except all-day reminders which go at the end)
  const allDayHabits: RoutineItem[] = [];
  const timedHabits: RoutineItem[] = [];

  routineData.sections.forEach((section) => {
    section.items.forEach((item) => {
      if (item.time === "00:00") {
        allDayHabits.push(item);
      } else {
        timedHabits.push(item);
      }
    });
  });

  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Add timed habits to each day
  dayOrder.forEach((day) => {
    if (!scheduleByDay[day]) {
      scheduleByDay[day] = [];
    }
    
    // Add timed habits (avoid duplicates with weekly schedule)
    timedHabits.forEach((habit, idx) => {
      // Skip if it's a duplicate (e.g., "Gym in the morning" already in weekly schedule)
      const isDuplicate = scheduleByDay[day].some(
        (existing) => {
          const existingLower = existing.activity.toLowerCase();
          const habitLower = habit.task.toLowerCase();
          // Check for common keywords that indicate duplicates
          const gymKeywords = ["gym", "run", "workout", "exercise"];
          const isGymDuplicate = gymKeywords.some(keyword => 
            existingLower.includes(keyword) && habitLower.includes(keyword)
          );
          return isGymDuplicate || 
                 existingLower.includes(habitLower.substring(0, 20)) ||
                 habitLower.includes(existingLower.substring(0, 20));
        }
      );
      
      if (!isDuplicate) {
        scheduleByDay[day].push(convertHabitToScheduleItem(habit, day, idx));
      }
    });

    // Add all-day habits at the end
    allDayHabits.forEach((habit, idx) => {
      scheduleByDay[day].push(convertHabitToScheduleItem(habit, day, `all-day-${idx}`));
    });
  });

  // Sort items within each day by start time (all-day items go to the end)
  Object.keys(scheduleByDay).forEach((day) => {
    scheduleByDay[day].sort((a, b) => {
      if (a.startTime === "00:00") return 1;
      if (b.startTime === "00:00") return -1;
      return a.startTime.localeCompare(b.startTime);
    });
  });

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">{routineData.title}</h1>
        <p className="text-white/60">Daily routines, habits, and lifestyle practices</p>
        <p className="text-white/40 text-sm mt-2">
          Current Time (Asia/Islamabad): {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" })} • {currentDay}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Weekly Schedule + Daily Habits */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Schedule with Merged Daily Habits */}
          <GlassPanel className="p-6">
            <h2 className="text-lg font-semibold text-cyan-200 mb-6 uppercase tracking-[0.05em]">
              Weekly Schedule & Daily Habits
            </h2>
            <div className="space-y-6">
              {dayOrder.map((day) => {
                const dayItems = scheduleByDay[day] || [];
                if (dayItems.length === 0) return null;

                return (
                  <div key={day} className="border-b border-white/10 last:border-0 pb-6 last:pb-0">
                    <h3 className={`text-md font-semibold mb-4 ${
                      day === currentDay ? "text-cyan-300" : "text-white/70"
                    }`}>
                      {day} {day === currentDay && <span className="text-xs text-emerald-400">(Today)</span>}
                    </h3>
                    <ul className="space-y-3">
                      {dayItems.map((item) => {
                        const status = getWeeklyScheduleStatus(item);
                        const isCurrent = status === "current";
                        const isPast = isTaskPast(item);
                        const isCompleted = completedTasks.has(item.id);
                        const isDisabled = isPast && !isCompleted;
                        const isHabit = item.alignment === "Daily Habit";
                        const isAllDay = item.startTime === "00:00";

                        return (
                          <li
                            key={item.id}
                            className={`flex items-start gap-4 px-4 py-3 rounded-xl border-l-4 transition-all ${
                              isCurrent
                                ? isHabit
                                  ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                                  : "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                                : isPast && !isCompleted
                                ? "bg-white/5 border-white/10 text-white/40 opacity-60"
                                : isHabit
                                ? "bg-white/5 border-emerald-300/30 text-white/80 hover:bg-white/10"
                                : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                            } ${isDisabled ? "cursor-not-allowed" : ""}`}
                          >
                            <div className="shrink-0 mt-1">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => !isDisabled && toggleTaskCompletion(item.id)}
                                disabled={isDisabled && !isAllDay}
                                className={`w-5 h-5 rounded border-white/30 bg-white/5 focus:ring-offset-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 ${
                                  isHabit ? "text-emerald-400 focus:ring-emerald-400" : "text-cyan-400 focus:ring-cyan-400"
                                }`}
                              />
                            </div>
                            <div className="shrink-0 min-w-[140px]">
                              <span
                                className={`text-xs font-semibold uppercase tracking-wider block ${
                                  isCurrent
                                    ? isHabit ? "text-emerald-300" : "text-cyan-300"
                                    : isPast && !isCompleted
                                    ? "text-white/30"
                                    : isHabit ? "text-emerald-200/70" : "text-white/60"
                                }`}
                              >
                                {item.timeSlot}
                              </span>
                              <span className="block text-xs text-white/40 mt-1">
                                {item.duration}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm leading-relaxed ${
                                    isCompleted ? "line-through text-white/50" : ""
                                  }`}>
                                    {item.activity}
                                  </span>
                                  {isHabit && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                                      Habit
                                    </span>
                                  )}
                                </div>
                                {isCurrent && (
                                  <span className={`ml-2 inline-flex items-center gap-1 text-xs font-medium shrink-0 ${
                                    isHabit ? "text-emerald-300" : "text-cyan-300"
                                  }`}>
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                                      isHabit ? "bg-emerald-400" : "bg-cyan-400"
                                    }`}></span>
                                    Active Now
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-white/50 mt-1 block">{item.alignment}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </div>

        {/* Right Column: Core Habits & Principles */}
        <div className="lg:col-span-1">
          <GlassPanel className="p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-purple-200 mb-4 uppercase tracking-[0.05em]">
              Core Habits & Principles
            </h2>
            <ul className="space-y-2">
              {routineHabitsData.map((habit, idx) => (
                <li
                  key={idx}
                  className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-purple-400/50 transition-colors py-2"
                >
                  {habit}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}

export function ContentDisplay({ activeTab }: ContentDisplayProps) {
  const renderContent = () => {
    if (activeTab === null) {
      return null;
    }

    switch (activeTab) {
      case "knowledge":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white mb-2">{knowledgeData.title}</h1>
              <p className="text-white/60">Your knowledge repository and learning resources</p>
            </div>
            {knowledgeData.sections.map((section, idx) => (
              <GlassPanel key={idx} className="p-6">
                <h2 className="text-lg font-semibold text-cyan-200 mb-4 uppercase tracking-[0.05em]">
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-cyan-400/50 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
          </div>
        );

      case "lesson":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white mb-2">{lessonData.title}</h1>
              <p className="text-white/60">Life lessons, discipline, and personal growth principles</p>
            </div>
            {lessonData.sections.map((section, idx) => (
              <GlassPanel key={idx} className="p-6">
                <h2 className="text-lg font-semibold text-amber-200 mb-4 uppercase tracking-[0.05em]">
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-amber-400/50 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
          </div>
        );

      case "routine":
        return <RoutineDisplay />;

      case "todos":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white mb-2">{todosData.title}</h1>
              <p className="text-white/60">Action items, projects, and tasks to accomplish</p>
            </div>
            {todosData.sections.map((section, idx) => (
              <GlassPanel key={idx} className="p-6">
                <h2 className="text-lg font-semibold text-rose-200 mb-4 uppercase tracking-[0.05em]">
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-rose-400/50 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
          </div>
        );

      case "researchsites":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white mb-2">{researchSitesData.title}</h1>
              <p className="text-white/60">Research platforms, paper aggregators, and academic resources</p>
            </div>
            {researchSitesData.sections.map((section, idx) => (
              <GlassPanel key={idx} className="p-6">
                <h2 className="text-lg font-semibold text-purple-200 mb-4 uppercase tracking-[0.05em]">
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => {
                    const urlMatch = item.match(/(https?:\/\/[^\s]+)/);
                    const url = urlMatch ? urlMatch[1] : null;
                    const text = url ? item.replace(url, "").trim() : item;

                    return (
                      <li
                        key={itemIdx}
                        className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-purple-400/50 transition-colors"
                      >
                        {url ? (
                          <span>
                            {text && `${text}: `}
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-300 hover:text-cyan-200 underline"
                            >
                              {url}
                            </a>
                          </span>
                        ) : (
                          item
                        )}
                      </li>
                    );
                  })}
                </ul>
              </GlassPanel>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="w-full">{renderContent()}</div>;
}

