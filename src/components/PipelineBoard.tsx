import React from 'react';
import { motion } from 'framer-motion';
import { 
  MoreVertical, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Star, 
  Clock, 
  MessageSquare, 
  Paperclip 
} from 'lucide-react';

const PipelineBoard: React.FC = () => {
  const stages = [
    { id: 'applied', label: 'Applied', count: 12, color: 'bg-blue-500' },
    { id: 'screening', label: 'Screening', count: 8, color: 'bg-indigo-500' },
    { id: 'interview', label: 'Interview', count: 5, color: 'bg-amber-500' },
    { id: 'offer', label: 'Offer', count: 3, color: 'bg-emerald-500' },
    { id: 'hired', label: 'Hired', count: 2, color: 'bg-purple-500' },
  ];

  const candidates = [
    { id: '1', name: 'Sarah Johnson', role: 'Senior Product Designer', stage: 'applied', score: 92, avatar: 'SJ', tags: ['UI/UX', 'Figma'] },
    { id: '2', name: 'Michael Chen', role: 'Full Stack Engineer', stage: 'screening', score: 88, avatar: 'MC', tags: ['React', 'Node.js'] },
    { id: '3', name: 'Emily Davis', role: 'Marketing Manager', stage: 'interview', score: 75, avatar: 'ED', tags: ['SEO', 'Content'] },
    { id: '4', name: 'David Wilson', role: 'DevOps Engineer', stage: 'offer', score: 95, avatar: 'DW', tags: ['AWS', 'Docker'] },
    { id: '5', name: 'Jessica Lee', role: 'Product Manager', stage: 'applied', score: 82, avatar: 'JL', tags: ['Agile', 'Jira'] },
    { id: '6', name: 'Robert Brown', role: 'Backend Developer', stage: 'screening', score: 68, avatar: 'RB', tags: ['Python', 'Django'] },
  ];

  const getCandidatesByStage = (stageId: string) => {
    return candidates.filter(c => c.stage === stageId);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Hiring Pipeline</h2>
          <p className="text-[#6B7280]">Manage your candidates across different stages of the recruitment process.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white border border-[#E9ECEF] rounded-xl text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-[#E9ECEF] rounded-xl text-[#6B7280] hover:text-[#111827] transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-[#4338CA] transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Candidate
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {stages.map((stage) => (
            <div key={stage.id} className="w-80 flex flex-col bg-[#F3F4F6]/50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                  <h3 className="font-bold text-[#111827]">{stage.label}</h3>
                  <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-[#6B7280] border border-[#E9ECEF]">
                    {getCandidatesByStage(stage.id).length}
                  </span>
                </div>
                <button className="text-[#9CA3AF] hover:text-[#111827] transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {getCandidatesByStage(stage.id).map((candidate) => (
                  <motion.div
                    key={candidate.id}
                    layoutId={candidate.id}
                    className="bg-white p-4 rounded-xl border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#4F46E5] font-bold text-sm">
                        {candidate.avatar}
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        candidate.score >= 85 ? 'bg-emerald-50 text-emerald-600' :
                        candidate.score >= 70 ? 'bg-blue-50 text-blue-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        AI Score: {candidate.score}
                      </div>
                    </div>

                    <h4 className="font-bold text-[#111827] mb-1">{candidate.name}</h4>
                    <p className="text-xs text-[#6B7280] mb-3">{candidate.role}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {candidate.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-[10px] font-medium rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                      <div className="flex items-center gap-3 text-[#9CA3AF]">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="text-[10px]">3</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span className="text-[10px]">2</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#9CA3AF]">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px]">2d</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <button className="w-full py-3 border-2 border-dashed border-[#E9ECEF] rounded-xl text-[#9CA3AF] hover:text-[#4F46E5] hover:border-[#4F46E5] hover:bg-white transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  Add Candidate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineBoard;
