
import React, { useState, useEffect } from 'react';
import { Search, Star, Users, Play, Heart, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Course } from '../types';

const CATEGORIES = ["All", "Design", "Code", "AI", "Business", "Marketing"];

const MOCK_COURSES: Course[] = [
  { 
    id: '1', 
    title: "Mastering Figma: Auto Layout 2024", 
    category: "Design", 
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=400&h=250&fit=crop",
    price: "$49",
    oldPrice: "$99",
    rating: 4.8,
    reviewCount: 1240,
    progress: 0,
    lessonsCount: 24,
    instructor: {
      name: "Sarah Jenkins",
      role: "Lead UI Designer",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      bio: "10+ years in interface design."
    },
    description: "Learn professional UI architecture.",
    outcomes: ["Design Systems", "Auto Layout"],
    requirements: ["Figma Basic"],
    curriculum: [],
    reviews: []
  },
  { 
    id: '2', 
    title: "React & Next.js Pro Architecture", 
    category: "Code", 
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    price: "Free",
    rating: 4.9,
    reviewCount: 3200,
    progress: 0,
    lessonsCount: 48,
    instructor: {
      name: "David Kwon",
      role: "Fullstack Architect",
      avatar: "https://i.pravatar.cc/150?u=david",
      bio: "Tech lead at Fortune 500."
    },
    description: "Advanced frontend patterns.",
    outcomes: ["Next.js App Router"],
    requirements: ["JS/TS Basics"],
    curriculum: [],
    reviews: []
  }
];

interface CourseLibraryProps {
  onCourseClick: (course: Course) => void;
}

const CourseLibrary: React.FC<CourseLibraryProps> = ({ onCourseClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Popular");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = MOCK_COURSES.filter(course => 
    (selectedCategory === "All" || course.category === selectedCategory) &&
    (course.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-5 space-y-8 animate-in fade-in duration-500 bg-[#0F172A]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-1">Explore</h2>
          <p className="text-slate-400 text-sm font-medium">Find your next skill</p>
        </div>
        <button className="w-12 h-12 bg-[#1E293B] border border-white/5 rounded-2xl flex items-center justify-center text-slate-300 active:scale-90 transition-transform">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search lessons..." 
          className="w-full pl-12 pr-4 py-4 bg-[#1E293B] border border-white/5 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white font-medium placeholder:text-slate-500 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-5 px-5">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-7 py-3 rounded-2xl whitespace-nowrap text-xs font-black tracking-widest uppercase transition-all active:scale-95 ${
              selectedCategory === cat 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'bg-[#1E293B] text-slate-400 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs font-black text-slate-500 uppercase tracking-widest px-1">
        <span>{filteredCourses.length} Courses Found</span>
        <button onClick={() => setSortBy(sortBy === "Popular" ? "Newest" : "Popular")} className="flex items-center gap-1.5 text-blue-500">
          <ArrowUpDown className="w-3.5 h-3.5" /> {sortBy}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-7">
        {isLoading ? (
          [1, 2].map(i => <div key={i} className="h-72 bg-[#1E293B] rounded-[32px] animate-pulse" />)
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div 
              key={course.id} 
              onClick={() => onCourseClick(course)}
              className="bg-[#1E293B] rounded-[32px] overflow-hidden shadow-sm border border-white/5 group cursor-pointer hover:shadow-xl transition-all duration-300 active:scale-98"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button 
                  onClick={(e) => { e.stopPropagation(); }} 
                  className="absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur shadow-sm rounded-2xl text-white/70 hover:text-rose-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase">
                  {course.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h4 className="text-lg font-black text-white leading-tight flex-1">{course.title}</h4>
                  <span className="text-blue-400 font-black text-lg">{course.price}</span>
                </div>
                
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <div className="flex items-center gap-5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {course.reviewCount > 1000 ? `${(course.reviewCount/1000).toFixed(1)}k` : course.reviewCount}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase leading-none mb-1">Duration</p>
                      <p className="text-xs font-black text-slate-300">12h 45m</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-blue-500 transition-colors">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="bg-[#1E293B] w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <Search className="w-10 h-10" />
            </div>
            <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLibrary;
