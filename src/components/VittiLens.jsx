import React from 'react';

const ARTICLES = [
  {
    tag: 'ASX WRAP',
    title: 'RBA Cash Rate Trajectory & The Surge of Private Credit',
    desc: 'As traditional commercial banks pull back, private syndicates are capturing prime Australian mid-market lending volume.',
    author: 'Fredrick Chege • Investment Manager'
  },
  {
    tag: 'MACRO STRATEGY',
    title: 'Australian Critical Minerals & Middle Eastern Inflows',
    desc: 'Analyzing Gulf sovereign capital deployment into Australian clean energy and strategic infrastructure assets.',
    author: 'Tushti Chaturvedi • Investment Analyst'
  },
  {
    tag: 'WEBINAR RESEARCH',
    title: 'When the Australian Government Moves Markets',
    desc: 'How the National Reconstruction Fund and federal incentives unlock asymmetric leverage for private hybrid structures.',
    author: 'Aaradhya Khattar • Associate, M&A'
  }
];

export default function VittiLens() {
  return (
    <section className="section-dark" id="vitti-lens">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="section-title">The Vitti Lens</h2>
          <p className="section-subtitle">
            Direct market commentary, debt pricing trends, and cross-border insights from our Sydney research desk.
          </p>
        </div>

        <div className="lens-grid">
          {ARTICLES.map((art, idx) => (
            <article key={idx} className="lens-card">
              <div className="lens-tag">{art.tag}</div>
              <h4>{art.title}</h4>
              <p>{art.desc}</p>
              <div className="lens-author">{art.author}</div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
