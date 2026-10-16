import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const BLOG_ITEMS = [
  {
    title: 'Private Wealth Management in Sydney: Building a Strategy for Long-Term Growth',
    summary: 'Discover how Sydney wealth managers protect and grow wholesale assets through bespoke asset allocation, alternative investments, and succession planning.',
    category: 'PRIVATE WEALTH',
    readTime: '5 min read',
    date: 'OCT 2026'
  },
  {
    title: 'Corporate Advisory in Sydney: How the Right Partner Drives Business Growth',
    summary: 'Australian M&A deal value climbed 11% year-on-year. How the right corporate advisory partner unlocks cross-border capital markets and syndication.',
    category: 'CORPORATE ADVISORY',
    readTime: '6 min read',
    date: 'OCT 2026'
  },
  {
    title: 'Listed Investment Companies in Australia: Are LICs Right for Your Portfolio?',
    summary: 'What is an LIC? An ASX-listed entity holding diversified assets with franking credit distribution advantages for high-net-worth investors.',
    category: 'EQUITIES & LICS',
    readTime: '4 min read',
    date: 'SEP 2026'
  },
  {
    title: 'Alternative Investments in Australia: Exploring Options Beyond Shares and Property',
    summary: 'Australian household wealth hit $19.2 trillion. Why institutional allocators are shifting capital toward private credit and real asset funds.',
    category: 'ALTERNATIVES',
    readTime: '7 min read',
    date: 'SEP 2026'
  },
  {
    title: 'Convertible Notes and Private Credit in Australia: Combining Them in Hybrid Structures',
    summary: 'A convertible note pairs senior-secured downside protection with equity upside participation. Strategic mechanics for Australian mid-market growth.',
    category: 'STRUCTURED FINANCE',
    readTime: '6 min read',
    date: 'AUG 2026'
  },
  {
    title: 'What Is a Sophisticated Investor Certificate? A Complete Guide for Australian Investors',
    summary: 'A comprehensive guide to qualifying under Section 708 of the Corporations Act 2001 (Cth) via net assets ($2.5M+) or gross income ($250k+).',
    category: 'REGULATORY GUIDE',
    readTime: '5 min read',
    date: 'AUG 2026'
  }
];

export default function BlogBand({ onOpenModal }) {
  // Duplicate for seamless infinite marquee loop
  const scrollBlogs = [...BLOG_ITEMS, ...BLOG_ITEMS];

  return (
    <section className="blog-band-section" id="blogs">
      <div className="blog-band-container">
        
        {/* Left 30%: Text "Blogs" (strictly NO PILLS above per AGENTS.md rule) */}
        <div className="blog-band-left">
          <div className="blog-band-left-inner">
            <h2 className="blog-band-headline">
              Blogs
            </h2>
          </div>
        </div>

        {/* Right 70%: Horizontally scrolling blogs just like daily updates */}
        <div className="blog-band-right">
          <div className="blog-ticker-track">
            {scrollBlogs.map((blog, idx) => (
              <div 
                key={`${blog.title}-${idx}`} 
                className="blog-card-item"
                onClick={() => onOpenModal && onOpenModal(`Blog Inquiry: ${blog.title}`)}
                role="button"
                tabIndex={0}
              >
                <div className="blog-card-top">
                  <span className="blog-card-time">{blog.readTime}</span>
                </div>
                <h4 className="blog-card-title">{blog.title}</h4>
                <p className="blog-card-summary">{blog.summary}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{blog.date}</span>
                  <span className="blog-card-read">
                    Read Article <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
