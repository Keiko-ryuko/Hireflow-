import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Star,
  ChevronRight,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Candidate {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  status: string;
  score: number;
  tags: string[];
}

const Candidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Product Designer',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      experience: '8 years',
      status: 'Interviewing',
      score: 92,
      tags: ['Figma', 'React', 'UX Research'],
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Full Stack Engineer',
      email: 'm.chen@example.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      experience: '5 years',
      status: 'Screening',
      score: 88,
      tags: ['Node.js', 'TypeScript', 'AWS'],
    },
    {
      id: '3',
      name: 'Emily Davis',
      role: 'Marketing Manager',
      email: 'emily.d@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      experience: '6 years',
      status: 'Offer Sent',
      score: 95,
      tags: ['SEO', 'Content Strategy', 'Analytics'],
    },
    {
      id: '4',
      name: 'David Wilson',
      role: 'DevOps Engineer',
      email: 'david.w@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Seattle, WA',
      experience: '10 years',
      status: 'Rejected',
      score: 65,
      tags: ['Kubernetes', 'Docker', 'CI/CD'],
    },
    {
      id: '5',
      name: 'Jessica Lee',
      role: 'Backend Developer',
      email: 'j.lee@example.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      experience: '4 years',
      status: 'Applied',
      score: 82,
      tags: ['Python', 'Django', 'PostgreSQL'],
    },
  ];

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Candidate Pool</h2>
          <p className="text-[#6B7280]">Manage and track all candidates across your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E9ECEF] rounded-xl text-sm font-semibold text-[#4B5563] hover:bg-[#F9FAFB] transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-100 hover:bg-[#4338CA] transition-all">
            Add Candidate
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E9ECEF] shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, role, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F3F4F6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#F3F4F6] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-[#E9ECEF] transition-all">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9ECEF] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E9ECEF]">
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">AI Score</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Experience</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9ECEF]">
            {filteredCandidates.map((candidate) => (
              <motion.tr 
                key={candidate.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-[#F9FAFB] transition-all cursor-pointer group"
                onClick={() => setSelectedCandidate(candidate)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#4F46E5] font-bold">
                      {candidate.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-[#111827]">{candidate.name}</p>
                      <p className="text-xs text-[#6B7280]">{candidate.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    candidate.status === 'Offer Sent' ? 'bg-emerald-50 text-emerald-600' :
                    candidate.status === 'Interviewing' ? 'bg-blue-50 text-blue-600' :
                    candidate.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-xs font-bold text-[#111827]">
                      {candidate.score}
                    </div>
                    <div className="flex-1 h-1.5 w-16 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          candidate.score >= 90 ? 'bg-emerald-500' :
                          candidate.score >= 80 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${candidate.score}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#4B5563]">
                  {candidate.experience}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#9CA3AF] hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-all">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-[#9CA3AF] hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-all">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#4F46E5] transition-all" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Candidate Detail Modal (Simplified) */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-[#F3F4F6] rounded-3xl flex items-center justify-center text-3xl font-bold text-[#4F46E5]">
                    {selectedCandidate.name[0]}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#111827]">{selectedCandidate.name}</h3>
                    <p className="text-lg text-[#6B7280]">{selectedCandidate.role}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-sm text-[#9CA3AF]">
                        <MapPin className="w-4 h-4" />
                        {selectedCandidate.location}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-[#9CA3AF]">
                        <Briefcase className="w-4 h-4" />
                        {selectedCandidate.experience}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-full transition-all"
                >
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Skills & Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[#F3F4F6] text-[#4B5563] rounded-lg text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">AI Assessment</h4>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-black text-[#4F46E5]">{selectedCandidate.score}</div>
                    <div className="text-xs text-[#6B7280] font-medium leading-tight">
                      Top 5% of<br />applicants
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-[#F3F4F6]">
                <button className="flex-1 bg-[#4F46E5] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#4338CA] transition-all shadow-lg shadow-indigo-100">
                  Schedule Interview
                </button>
                <button className="flex-1 bg-white border-2 border-[#E9ECEF] text-[#4B5563] py-4 rounded-2xl font-bold text-lg hover:bg-[#F9FAFB] transition-all">
                  View Full Resume
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
