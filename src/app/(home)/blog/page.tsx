import React from "react";
import Image from "next/image";
import { FaRegCalendarAlt, FaRegUser, FaArrowRight } from "react-icons/fa";

// Generating real-world event blog references
const blogPosts = [
  {
    id: 1,
    title: "How to Promote Your Event on Social Media: 10 Expert Tips",
    excerpt: "Social media is one of the most powerful tools in an event creator's arsenal. Learn how to reach your target audience and drive ticket sales across every platform.",
    author: "Eventbrite Blog",
    date: "2026",
    category: "Promotion",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    featured: true,
    link: "https://www.eventbrite.com/blog/how-to-promote-event-social-media-ds00"
  },
  {
    id: 2,
    title: "Executive Events: Industry Insights and Strategic Planning",
    excerpt: "Deep dive into corporate event management and high-level strategic planning to ensure every workshop and conference hits its goals.",
    author: "Executive Vents",
    date: "2026",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    link: "https://www.executivevents.com/blog"
  },
  {
    id: 3,
    title: "Event Management: Why Being Childish Fuels Remarkable Creativity",
    excerpt: "Why playfulness is the key to groundbreaking events. Discover how embracing your inner child leads to unforgettable guest experiences.",
    author: "Medium Blog",
    date: "2026",
    category: "Creativity",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    link: "https://medium.com/the-event-blog/event-management-why-being-childish-fuels-creativity-47de8bc7f177"
  },
  {
    id: 4,
    title: "Securing the Future: How to Get Sponsors for Your Next Venue",
    excerpt: "Sponsorship is a craft. Learn how to present value to potential partners and secure funding for events of any size.",
    author: "Events Air",
    date: "2026",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    link: "https://www.eventsair.com/blog/how-to-get-sponsors-for-an-event"
  },
  {
    id: 5,
    title: "The Latest in Event Tech: Innovation Drives Engagement",
    excerpt: "From AI matchmaking to digital hubs, see the technology that's defining the modern event attendee experience today.",
    author: "Event Drive",
    date: "2026",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    link: "https://www.eventdrive.com/en/blog"
  },
];

const BlogPage = () => {
  return (
    <div className="bg-transparent min-h-screen">
      {/* Hero Section */}
      <section className="w-11/12 mx-auto pt-16 lg:pt-24 text-center space-y-6">
        <h1 className="text-4xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
          Insights & <span className="text-primary italic">Inspiration</span>
        </h1>
        <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto italic">
          &quot;Discover the latest trends in event management, creator stories, and expert community guides.&quot;
        </p>
        <div className="flex justify-center gap-4 py-4 flex-wrap">
          {['All Posts', 'Promotion', 'Technology', 'Community', 'Creativity'].map((cat, i) => (
            <button key={cat} className={`px-6 py-2 rounded-full border border-white/10 text-sm font-medium transition-all hover:border-primary/50 hover:bg-primary/5 ${i === 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-11/12 mx-auto py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col bg-gray-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 ${post.featured ? 'lg:col-span-2 lg:flex-row h-full lg:h-112.5' : ''}`}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden ${post.featured ? 'lg:w-1/2 h-64 lg:h-full' : 'h-64'} w-full`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                  {post.category}
                </div>
              </div>

              {/* Content Container */}
              <div className={`flex flex-col p-8 ${post.featured ? 'lg:w-1/2' : ''} h-full`}>
                {/* Meta */}
                <div className="flex items-center gap-4 text-slate-500 text-xs font-semibold mb-4 uppercase tracking-widest shrink-0">
                  <span className="flex items-center gap-1.5"><FaRegCalendarAlt className="text-primary"/> {post.date}</span>
                  <span className="flex items-center gap-1.5"><FaRegUser className="text-primary"/> {post.author}</span>
                </div>

                <h3 className={`text-white font-extrabold transition-colors group-hover:text-primary mb-4 shrink-0 ${post.featured ? 'text-2xl lg:text-3xl lg:leading-tight' : 'text-xl'}`}>
                  {post.title}
                </h3>
                
                <p className="text-slate-400 text-base leading-relaxed grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between shrink-0">
                  <span className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-widest text-xs">
                    Read Article <FaArrowRight />
                  </span>
                  <div className="flex gap-1.5 opacity-40">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Search & Newsletter mini-section */}
      <section className="w-11/12 mx-auto pb-24">
         <div className="bg-linear-to-br from-primary/10 to-transparent border border-white/5 rounded-[2.5rem] p-12 text-center space-y-8">
            <h2 className="text-3xl font-bold text-white">Never Miss an Insight</h2>
            <p className="text-slate-400 max-w-md mx-auto italic">Join our weekly newsletter to get the best event hosting tips directly in your inbox.</p>
            <form className="max-w-md mx-auto flex gap-3 flex-col sm:flex-row">
               <input type="email" placeholder="email@example.com" className="bg-black/40 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 grow text-sm" />
               <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 text-sm">Join Now</button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default BlogPage;