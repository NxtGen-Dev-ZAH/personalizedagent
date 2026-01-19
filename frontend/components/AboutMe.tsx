import { GlassPanel } from "@/components/ui/GlassPanel";
import { aboutMeData } from "@/lib/data/aboutMe";

export function AboutMe() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <GlassPanel className="overflow-hidden p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl mb-2">
              {aboutMeData.fullName}
            </h1>
            <p className="text-xl text-cyan-200 mb-4">
              {aboutMeData.title}
            </p>
            <p className="text-white/70 mb-2">
              {aboutMeData.location} • Age {aboutMeData.age}
            </p>
            <p className="text-white/60 text-sm max-w-2xl">
              {aboutMeData.coreFocus}
            </p>
          </div>
          <div className="glass-panel p-5 border border-white/15 min-w-[200px]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
              Current Role
            </p>
            <p className="text-sm font-semibold text-white">
              {aboutMeData.currentRole}
            </p>
          </div>
        </div>
      </GlassPanel>

      {/* Education */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-cyan-200 mb-4 uppercase tracking-[0.05em]">
          Education
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-white font-medium">{aboutMeData.education.degree}</p>
            <p className="text-white/70 text-sm">{aboutMeData.education.university}</p>
            <p className="text-white/60 text-sm">
              {aboutMeData.education.currentYear} • CGPA: {aboutMeData.education.cgpa}
            </p>
          </div>
          {aboutMeData.education.focusAreas && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/60 text-xs uppercase tracking-[0.1em] mb-2">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {aboutMeData.education.focusAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="rounded-full px-3 py-1 text-xs bg-white/5 border border-white/10 text-white/80"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlassPanel>

      {/* Professional Experience */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-rose-200 mb-4 uppercase tracking-[0.05em]">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {aboutMeData.professionalExperience?.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-white/10 pl-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-white font-semibold">{exp.role}</p>
                  <p className="text-cyan-200 text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-white/50 uppercase tracking-[0.1em]">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-1 mt-2">
                {exp.responsibilities.map((resp, respIdx) => (
                  <li
                    key={respIdx}
                    className="text-white/70 text-sm leading-relaxed pl-2"
                  >
                    • {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Key Projects */}
      {aboutMeData.keyProjects && (
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold text-purple-200 mb-4 uppercase tracking-[0.05em]">
            Key Projects & Workflows
          </h2>
          <ul className="space-y-3">
            {aboutMeData.keyProjects.map((project, idx) => (
              <li
                key={idx}
                className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-purple-400/50 transition-colors"
              >
                {project}
              </li>
            ))}
          </ul>
        </GlassPanel>
      )}

      {/* Technical Skills */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-amber-200 mb-4 uppercase tracking-[0.05em]">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aboutMeData.keySkills.map((skill, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
            >
              {skill}
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Career Goals */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold text-emerald-200 mb-4 uppercase tracking-[0.05em]">
            Short-Term Goals
          </h2>
          <ul className="space-y-2">
            {aboutMeData.careerGoals.shortTerm.map((goal, idx) => (
              <li
                key={idx}
                className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-emerald-400/50 transition-colors"
              >
                {goal}
              </li>
            ))}
          </ul>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold text-purple-200 mb-4 uppercase tracking-[0.05em]">
            Long-Term Goals
          </h2>
          <ul className="space-y-2">
            {aboutMeData.careerGoals.longTerm.map((goal, idx) => (
              <li
                key={idx}
                className="text-white/80 text-sm leading-relaxed pl-4 border-l-2 border-white/10 hover:border-purple-400/50 transition-colors"
              >
                {goal}
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}

