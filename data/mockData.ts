
import { Course, Vocabulary, Discussion, StudyGroup, Exercise } from '../types';

export const MOCK_COURSES: Course[] = [
  { 
    id: '1', 
    title: "Mastering Figma: Auto Layout 2024", 
    category: "Design", 
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800",
    price: "$49",
    oldPrice: "$99",
    rating: 4.8,
    reviewCount: 1240,
    progress: 65,
    lessonsCount: 24,
    instructor: {
      name: "Sarah Jenkins",
      role: "Lead UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "10+ years in interface design."
    },
    description: "Khóa học này sẽ giúp bạn làm chủ Figma từ cơ bản đến nâng cao.",
    outcomes: ["Làm chủ Auto Layout 4.0", "Xây dựng Design System"],
    requirements: ["Figma Basic"],
    curriculum: [],
    reviews: []
  },
  { 
    id: '2', 
    title: "React & Next.js Pro Architecture", 
    category: "Code", 
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    price: "Free",
    rating: 4.9,
    reviewCount: 3200,
    progress: 32,
    lessonsCount: 48,
    instructor: {
      name: "David Kwon",
      role: "Fullstack Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      bio: "Tech lead at Fortune 500."
    },
    description: "Advanced frontend patterns.",
    outcomes: ["Next.js App Router"],
    requirements: ["JS/TS Basics"],
    curriculum: [],
    reviews: []
  }
];

export const MOCK_VOCABULARY: Vocabulary[] = [
  { 
    id: 'v1', word: 'Hierarchy', phonetic: '/ˈhaɪərɑːrki/', 
    definition: 'Hệ thống phân cấp các yếu tố theo tầm quan trọng.',
    example: 'Visual hierarchy is essential in UI design as it guides the user\'s attention to key elements.',
    category: 'UI/UX Design', difficulty: 'medium', isBookmarked: true, isLearned: false
  },
  { 
    id: 'v2', word: 'Affordance', phonetic: '/əˈfɔːrdəns/', 
    definition: 'Đặc điểm của một vật gợi ý cách sử dụng nó.',
    example: 'A button with a 3D shadow provides a high click affordance.',
    category: 'UI/UX Design', difficulty: 'hard', isBookmarked: false, isLearned: true
  },
  { 
    id: 'v3', word: 'Constraint', phonetic: '/kən\'streɪnt/', 
    definition: 'Sự hạn chế hoặc ràng buộc trong thiết kế.',
    example: 'Designing for smartwatches involves strict screen space constraints.',
    category: 'UI/UX Design', difficulty: 'easy', isBookmarked: false, isLearned: false
  }
];

export const MOCK_DISCUSSIONS: Discussion[] = [
  {
    id: 'd1',
    title: "Làm thế nào để tối ưu Auto Layout trong Figma 2025?",
    content: "Mình đang gặp khó khăn khi xử lý các component phức tạp có nhiều layer lồng nhau...",
    author: { id: 'u1', name: "Hoàng Minh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang" },
    category: "UI/UX",
    repliesCount: 24,
    likesCount: 156,
    date: "2 giờ trước",
    isPinned: true,
    isTrending: true
  },
  {
    id: 'd2',
    title: "Nên học React hay Flutter trong năm nay?",
    content: "Chào mọi người, mình là newbie đang phân vân giữa web và mobile development...",
    author: { id: 'u2', name: "Thanh Trúc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Truc" },
    category: "Development",
    repliesCount: 42,
    likesCount: 89,
    date: "5 giờ trước",
    isTrending: true
  }
];

export const MOCK_GROUPS: StudyGroup[] = [
  {
    id: 'g1',
    name: "Cộng đồng Figma Việt Nam",
    description: "Nơi chia sẻ kiến thức, tài liệu và case study về Figma/UI/UX.",
    category: "Design",
    memberCount: 1240,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Figma",
    isJoined: true,
    goal: "Làm chủ Design System trong 3 tháng",
    recentActivity: "Hoàng Minh vừa đăng 1 tài liệu mới"
  }
];

export const MOCK_EXERCISE: Exercise = {
  id: 'ex1',
  title: 'Bài tập: Nguyên lý Visual Hierarchy',
  timeLimit: 600,
  questions: [
    {
      id: 'q1', type: 'multiple_choice', text: 'Đâu là yếu tố quan trọng nhất để tạo điểm nhấn trong thiết kế giao diện?',
      options: ['Kích thước', 'Màu sắc', 'Vị trí', 'Độ tương phản'],
      correctAnswer: 3, 
      hint: 'Hãy nghĩ về sự khác biệt lớn nhất giữa một nút bấm và văn bản thường.',
      explanation: 'Độ tương phản (Contrast) là yếu tố then chốt tạo ra sự phân cấp thị giác rõ rệt nhất bằng cách làm nổi bật sự khác biệt giữa các yếu tố.'
    }
  ]
};
