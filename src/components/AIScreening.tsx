import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Zap, 
  BrainCircuit,
  X
} from 'lucide-react';
import { screenResume } from '../services/gemini';

const AIScreening: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) return;
    setIsAnalyzing(true);
    const analysis = await screenResume(resumeText, jobDescription);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setResult(null);
    setResumeText('');
    setJobDescription('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">AI Resume Screening</h2>
          <p className="text-[#6B7280]">Leverage Gemini AI to analyze resumes and match them with job descriptions.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#4F46E5] rounded-xl font-semibold text-sm">
          <BrainCircuit className="w-5 h-5" />
          Powered by Gemini 3 Flash
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Job Description Input */}
            <div className="bg-white p-8 rounded-2xl border border-[#E9ECEF] shadow-sm space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827]">Job Description</h3>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-64 p-4 bg-[#F9FAFB] border border-[#E9ECEF] rounded-xl text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all resize-none"
              />
            </div>

            {/* Resume Input */}
            <div className="bg-white p-8 rounded-2xl border border-[#E9ECEF] shadow-sm space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827]">Candidate Resume</h3>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the candidate's resume text here..."
                className="w-full h-64 p-4 bg-[#F9FAFB] border border-[#E9ECEF] rounded-xl text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all resize-none"
              />
            </div>

            <div className="lg:col-span-2 flex justify-center pt-4">
              <button
                onClick={handleAnalyze}
                disabled={!resumeText || !jobDescription || isAnalyzing}
                className={`flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all ${
                  !resumeText || !jobDescription || isAnalyzing
                    ? 'bg-[#E9ECEF] text-[#9CA3AF] cursor-not-allowed'
                    : 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-indigo-100'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6" />
                    Run AI Screening
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-3xl border border-[#E9ECEF] shadow-xl space-y-8"
          >
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-8">
              <div className="flex items-center gap-6">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black ${
                  result.score >= 85 ? 'bg-emerald-50 text-emerald-600' :
                  result.score >= 70 ? 'bg-blue-50 text-blue-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {result.score}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#111827] mb-1">{result.result} Candidate</h3>
                  <p className="text-lg text-[#6B7280] font-medium">Recommended Action: <span className="text-[#4F46E5]">{result.action}</span></p>
                </div>
              </div>
              <button 
                onClick={reset}
                className="p-3 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <h4 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  AI Recommendation Summary
                </h4>
                <div className="bg-[#F9FAFB] p-8 rounded-2xl border border-[#E9ECEF] text-[#4B5563] leading-relaxed text-lg italic">
                  "{result.recommendation}"
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold text-[#111827]">Match Details</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Technical Skills', score: result.score > 80 ? 95 : 70 },
                    { label: 'Experience Level', score: result.score > 80 ? 90 : 65 },
                    { label: 'Cultural Fit', score: result.score > 80 ? 85 : 75 },
                    { label: 'Communication', score: result.score > 80 ? 88 : 80 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-[#6B7280]">{item.label}</span>
                        <span className="text-[#111827]">{item.score}%</span>
                      </div>
                      <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full rounded-full ${
                            item.score >= 85 ? 'bg-emerald-500' :
                            item.score >= 70 ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-[#F3F4F6]">
              <button className="flex-1 bg-[#4F46E5] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#4338CA] transition-all shadow-lg shadow-indigo-100">
                Move to Interview
              </button>
              <button className="flex-1 bg-white border-2 border-[#E9ECEF] text-[#4B5563] py-4 rounded-2xl font-bold text-lg hover:bg-[#F9FAFB] transition-all">
                Save for Later
              </button>
              <button className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-bold text-lg hover:bg-red-100 transition-all">
                Reject Candidate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIScreening;
