
import React, { useState, useEffect } from 'react';
import { 
  Home, MessageSquare, User, Bell, 
  Sparkles, BookMarked, BarChart3, Users 
} from 'lucide-react';
import { AppSection, AuthStatus, Course, Lesson, Vocabulary, Discussion, StudyGroup } from './types/index';
import { MOCK_COURSES, MOCK_VOCABULARY, MOCK_EXERCISE } from './data/mockData';

// Shared Components
import SearchScreen from './shared/components/Search';
import NotificationsScreen from './shared/components/Notifications';

// Features - Auth
import SplashScreen from './features/auth/components/SplashScreen';
import WelcomeScreen from './features/auth/components/WelcomeScreen';
import LoginScreen from './features/auth/components/LoginScreen';
import RegisterScreen from './features/auth/components/RegisterScreen';
import ForgotPasswordScreen from './features/auth/components/ForgotPasswordScreen';
import Profile from './features/auth/components/Profile';
import EditProfileScreen from './features/auth/components/EditProfile';

// Features - Dashboard & AI
import Dashboard from './features/dashboard/components/Dashboard';
import AITutor from './features/ai-tutor/components/AITutor';

// Features - Courses
import CourseLibrary from './features/courses/components/CourseLibrary';
import CourseDetailScreen from './features/courses/components/CourseDetail';
import CurriculumScreen from './features/courses/components/Curriculum';
import LessonPlayerScreen from './features/courses/components/LessonPlayer';
import ExerciseScreen from './features/courses/components/Exercise';
import ExerciseResultScreen from './features/courses/components/ExerciseResult';

// Features - Vocabulary
import VocabularyScreen from './features/vocabulary/components/VocabularyList';
import VocabularyDetailScreen from './features/vocabulary/components/VocabularyDetail';
import FlashcardDecksScreen from './features/vocabulary/components/FlashcardDecks';
import FlashcardScreen from './features/vocabulary/components/FlashcardPlayer';
import FlashcardResultScreen from './features/vocabulary/components/FlashcardResult';

// Features - Gamification
import ProgressScreen from './features/gamification/components/ProgressReport';
import AchievementsScreen from './features/gamification/components/Achievements';
import LeaderboardScreen from './features/gamification/components/Leaderboard';

// Features - Community & Groups
import DiscussionsScreen from './features/community/components/Discussions';
import DiscussionDetailScreen from './features/community/components/DiscussionDetail';
import CreateDiscussionScreen from './features/community/components/CreateDiscussion';
import StudyGroupsScreen from './features/groups/components/StudyGroups';
import GroupDetailScreen from './features/groups/components/GroupDetail';
import CreateGroupScreen from './features/groups/components/CreateGroup';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.SPLASH);
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVocab, setSelectedVocab] = useState<Vocabulary | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [flashcardStats, setFlashcardStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 });
  const [vocabularyList, setVocabularyList] = useState<Vocabulary[]>(MOCK_VOCABULARY);

  const [userProfile, setUserProfile] = useState({
    name: "Quốc Anh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuocAnh",
    level: 12,
    xp: 2450
  });

  useEffect(() => {
    if (authStatus === AuthStatus.SPLASH) {
      const timer = setTimeout(() => setAuthStatus(AuthStatus.WELCOME), 3000);
      return () => clearTimeout(timer);
    }
  }, [authStatus]);

  const handleToggleLearned = (id: string) => {
    setVocabularyList(prev => prev.map(v => v.id === id ? { ...v, isLearned: !v.isLearned } : v));
  };

  const handleToggleBookmark = (id: string) => {
    setVocabularyList(prev => prev.map(v => v.id === id ? { ...v, isBookmarked: !v.isBookmarked } : v));
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case AppSection.HOME: 
        return <Dashboard onCourseClick={(c) => { setSelectedCourse(c); setActiveSection(AppSection.COURSE_DETAIL); }} onOpenSearch={() => setActiveSection(AppSection.SEARCH)} onVocabClick={() => setActiveSection(AppSection.VOCABULARY)} />;
      case AppSection.EXPLORE: 
        return <CourseLibrary onCourseClick={(c) => { setSelectedCourse(c); setActiveSection(AppSection.COURSE_DETAIL); }} />;
      case AppSection.AI_TUTOR: return <AITutor />;
      case AppSection.PROFILE: return <Profile user={userProfile} onLogout={() => setAuthStatus(AuthStatus.LOGIN)} onEditClick={() => setActiveSection(AppSection.EDIT_PROFILE)} />;
      case AppSection.EDIT_PROFILE: return <EditProfileScreen user={userProfile} onBack={() => setActiveSection(AppSection.PROFILE)} onSave={(newData) => { setUserProfile({...userProfile, ...newData}); setActiveSection(AppSection.PROFILE); }} />;
      case AppSection.SEARCH: return <SearchScreen onBack={() => setActiveSection(AppSection.HOME)} />;
      case AppSection.NOTIFICATIONS: return <NotificationsScreen onBack={() => setActiveSection(AppSection.HOME)} />;
      case AppSection.COURSE_DETAIL: return selectedCourse ? <CourseDetailScreen course={selectedCourse} onBack={() => setActiveSection(AppSection.HOME)} onEnroll={() => setActiveSection(AppSection.CURRICULUM)} /> : null;
      case AppSection.CURRICULUM: return selectedCourse ? <CurriculumScreen course={selectedCourse} onBack={() => setActiveSection(AppSection.COURSE_DETAIL)} onLessonSelect={(l) => l.type === 'quiz' ? setActiveSection(AppSection.EXERCISE) : setActiveSection(AppSection.LESSON_PLAYER)} /> : null;
      case AppSection.LESSON_PLAYER: return selectedCourse ? <LessonPlayerScreen course={selectedCourse} onBack={() => setActiveSection(AppSection.CURRICULUM)} /> : null;
      case AppSection.EXERCISE: return <ExerciseScreen exercise={MOCK_EXERCISE} onBack={() => setActiveSection(AppSection.CURRICULUM)} onComplete={(s) => { setCurrentScore(s); setActiveSection(AppSection.EXERCISE_RESULT); }} />;
      case AppSection.EXERCISE_RESULT: return <ExerciseResultScreen exercise={MOCK_EXERCISE} score={currentScore} onRetry={() => setActiveSection(AppSection.EXERCISE)} onGoHome={() => setActiveSection(AppSection.HOME)} userAnswers={{}} />;
      case AppSection.VOCABULARY: return <VocabularyScreen vocabData={vocabularyList} onBack={() => setActiveSection(AppSection.HOME)} onItemClick={(v) => { setSelectedVocab(v); setActiveSection(AppSection.VOCABULARY_DETAIL); }} onFlashcards={() => setActiveSection(AppSection.FLASHCARD_DECKS)} onToggleBookmark={handleToggleBookmark} onToggleLearned={handleToggleLearned} />;
      case AppSection.VOCABULARY_DETAIL: return selectedVocab ? <VocabularyDetailScreen vocab={selectedVocab} onBack={() => setActiveSection(AppSection.VOCABULARY)} onToggleLearned={handleToggleLearned} /> : null;
      case AppSection.FLASHCARD_DECKS: return <FlashcardDecksScreen onBack={() => setActiveSection(AppSection.VOCABULARY)} onSelectDeck={() => setActiveSection(AppSection.FLASHCARDS)} onCreateDeck={() => {}} />;
      case AppSection.FLASHCARDS: return <FlashcardScreen vocabList={vocabularyList} onBack={() => setActiveSection(AppSection.FLASHCARD_DECKS)} onFinish={(s) => { setFlashcardStats(s); setActiveSection(AppSection.FLASHCARD_RESULT); }} />;
      case AppSection.FLASHCARD_RESULT: return <FlashcardResultScreen stats={flashcardStats} onRetry={() => setActiveSection(AppSection.FLASHCARDS)} onGoHome={() => setActiveSection(AppSection.HOME)} />;
      case AppSection.PROGRESS: return <ProgressScreen onCourseClick={() => setActiveSection(AppSection.CURRICULUM)} onAchievementsClick={() => setActiveSection(AppSection.ACHIEVEMENTS)} onLeaderboardClick={() => setActiveSection(AppSection.LEADERBOARD)} />;
      case AppSection.ACHIEVEMENTS: return <AchievementsScreen onBack={() => setActiveSection(AppSection.PROGRESS)} />;
      case AppSection.LEADERBOARD: return <LeaderboardScreen onBack={() => setActiveSection(AppSection.PROGRESS)} onUserClick={() => {}} />;
      case AppSection.DISCUSSIONS: return <DiscussionsScreen onBack={() => setActiveSection(AppSection.HOME)} onDiscussionClick={(d) => { setSelectedDiscussion(d); setActiveSection(AppSection.DISCUSSION_DETAIL); }} onCreateClick={() => setActiveSection(AppSection.CREATE_DISCUSSION)} />;
      case AppSection.DISCUSSION_DETAIL: return selectedDiscussion ? <DiscussionDetailScreen discussion={selectedDiscussion} onBack={() => setActiveSection(AppSection.DISCUSSIONS)} onAuthorClick={() => {}} /> : null;
      case AppSection.CREATE_DISCUSSION: return <CreateDiscussionScreen onBack={() => setActiveSection(AppSection.DISCUSSIONS)} onPost={() => setActiveSection(AppSection.DISCUSSIONS)} />;
      case AppSection.STUDY_GROUPS: return <StudyGroupsScreen onBack={() => setActiveSection(AppSection.HOME)} onGroupClick={(g) => { setSelectedGroup(g); setActiveSection(AppSection.GROUP_DETAIL); }} onCreateClick={() => setActiveSection(AppSection.CREATE_GROUP)} />;
      case AppSection.GROUP_DETAIL: return selectedGroup ? <GroupDetailScreen group={selectedGroup} onBack={() => setActiveSection(AppSection.STUDY_GROUPS)} /> : null;
      case AppSection.CREATE_GROUP: return <CreateGroupScreen onBack={() => setActiveSection(AppSection.STUDY_GROUPS)} onCreate={() => setActiveSection(AppSection.STUDY_GROUPS)} />;
      default: return <Dashboard onCourseClick={(c) => { setSelectedCourse(c); setActiveSection(AppSection.COURSE_DETAIL); }} onOpenSearch={() => setActiveSection(AppSection.SEARCH)} onVocabClick={() => setActiveSection(AppSection.VOCABULARY)} />;
    }
  };

  if (authStatus !== AuthStatus.AUTHENTICATED) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-[#020617]">
        <div className="w-full max-w-[480px] h-full bg-[#0F172A] relative overflow-hidden">
          {authStatus === AuthStatus.SPLASH && <SplashScreen />}
          {authStatus === AuthStatus.WELCOME && <WelcomeScreen onGetStarted={() => setAuthStatus(AuthStatus.LOGIN)} />}
          {authStatus === AuthStatus.LOGIN && <LoginScreen onLogin={() => setAuthStatus(AuthStatus.AUTHENTICATED)} onGoToRegister={() => setAuthStatus(AuthStatus.REGISTER)} onGoToForgot={() => setAuthStatus(AuthStatus.FORGOT_PASSWORD)} />}
          {authStatus === AuthStatus.REGISTER && <RegisterScreen onRegister={() => setAuthStatus(AuthStatus.AUTHENTICATED)} onGoToLogin={() => setAuthStatus(AuthStatus.LOGIN)} />}
          {authStatus === AuthStatus.FORGOT_PASSWORD && <ForgotPasswordScreen onBackToLogin={() => setAuthStatus(AuthStatus.LOGIN)} />}
        </div>
      </div>
    );
  }

  const hideNav = [
    AppSection.COURSE_DETAIL, AppSection.CURRICULUM, AppSection.LESSON_PLAYER, 
    AppSection.SEARCH, AppSection.NOTIFICATIONS, AppSection.EXERCISE,
    AppSection.EXERCISE_RESULT, AppSection.VOCABULARY_DETAIL, AppSection.FLASHCARDS,
    AppSection.FLASHCARD_RESULT, AppSection.FLASHCARD_DECKS, AppSection.ACHIEVEMENTS,
    AppSection.LEADERBOARD, AppSection.DISCUSSION_DETAIL, AppSection.CREATE_DISCUSSION,
    AppSection.GROUP_DETAIL, AppSection.CREATE_GROUP, AppSection.EDIT_PROFILE
  ].includes(activeSection);

  return (
    <div className="h-screen w-full flex justify-center bg-[#020617]">
      <div className="w-full max-w-[480px] h-full bg-[#0F172A] flex flex-col relative overflow-hidden shadow-2xl">
        {!hideNav && (
          <header className="flex-none bg-[#0F172A]/90 backdrop-blur-xl px-5 py-4 flex items-center justify-between border-b border-white/5 z-40">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-white italic">EduSmart</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveSection(AppSection.NOTIFICATIONS)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-slate-300 border border-white/10 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0F172A]"></span>
              </button>
              <img src={userProfile.avatar} alt="Profile" className="w-10 h-10 rounded-xl border-2 border-white/10 cursor-pointer" onClick={() => setActiveSection(AppSection.PROFILE)} />
            </div>
          </header>
        )}

        <main className={`flex-1 overflow-y-auto scrollbar-none relative page-transition ${!hideNav ? 'pb-24' : ''}`}>
          {renderMainContent()}
        </main>

        {!hideNav && (
          <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-6 z-50">
            <div className="bg-[#1E293B]/90 backdrop-blur-2xl rounded-[32px] px-2 py-2 shadow-2xl flex justify-around items-center border border-white/10">
              <NavItem icon={<Home />} label="Trang chủ" active={activeSection === AppSection.HOME} onClick={() => setActiveSection(AppSection.HOME)} />
              <NavItem icon={<Users />} label="Nhóm học" active={activeSection === AppSection.STUDY_GROUPS} onClick={() => setActiveSection(AppSection.STUDY_GROUPS)} />
              <NavItem icon={<MessageSquare />} label="Diễn đàn" active={activeSection === AppSection.DISCUSSIONS} onClick={() => setActiveSection(AppSection.DISCUSSIONS)} />
              <NavItem icon={<BarChart3 />} label="Tiến độ" active={activeSection === AppSection.PROGRESS} onClick={() => setActiveSection(AppSection.PROGRESS)} />
              <NavItem icon={<User />} label="Hồ sơ" active={activeSection === AppSection.PROFILE} onClick={() => setActiveSection(AppSection.PROFILE)} />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className="relative flex flex-col items-center justify-center p-2.5 group">
    <div className={`p-2.5 rounded-2xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 -translate-y-1' : 'text-slate-500 hover:text-slate-300'}`}>
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    <span className={`text-[9px] font-black mt-1 uppercase tracking-tighter transition-all duration-300 ${active ? 'opacity-100 text-blue-400' : 'opacity-0 h-0 overflow-hidden'}`}>
      {label}
    </span>
  </button>
);

export default App;
