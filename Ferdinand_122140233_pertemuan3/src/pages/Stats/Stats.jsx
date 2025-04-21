import React from 'react';
import { useBookStats } from '../../hooks/useBookStats';
import { BOOK_STATUS } from '../../context/BookContext';
import './Stats.css';

const Stats = () => {
  const stats = useBookStats();

  // Data untuk grafik donut
  const chartData = [
    { status: 'Dimiliki', count: stats.ownedBooks, color: '#4CAF50' },
    { status: 'Sedang Dibaca', count: stats.readingBooks, color: '#2196F3' },
    { status: 'Ingin Dibeli', count: stats.wishlistBooks, color: '#FF9800' },
  ];

  // Hitung persentase untuk grafik donut
  const total = stats.totalBooks || 1; // Mencegah division by zero
  const calculatePercentage = (value) => ((value / total) * 100).toFixed(1);

  return (
    <div className="stats-page">
      <h2>Statistik Koleksi Buku</h2>
      
      <div className="stats-container">
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Buku</h3>
            <div className="stat-value">{stats.totalBooks}</div>
          </div>
          
          <div className="stat-card">
            <h3>Buku Dimiliki</h3>
            <div className="stat-value">{stats.ownedBooks}</div>
          </div>
          
          <div className="stat-card">
            <h3>Sedang Dibaca</h3>
            <div className="stat-value">{stats.readingBooks}</div>
          </div>
          
          <div className="stat-card">
            <h3>Wishlist</h3>
            <div className="stat-value">{stats.wishlistBooks}</div>
          </div>
        </div>
        
        {stats.totalBooks > 0 && (
          <>
            <div className="stats-chart">
              <h3>Distribusi Buku</h3>
              <div className="donut-chart-container">
                <div className="donut-chart">
                  {chartData.map((item, index) => (
                    item.count > 0 && (
                      <div 
                        key={index}
                        className="donut-segment"
                        style={{
                          '--percentage': `${calculatePercentage(item.count)}%`,
                          '--fill-color': item.color,
                          '--start-offset': index > 0 ? 
                            `${chartData
                              .slice(0, index)
                              .reduce((acc, curr) => acc + (curr.count / total * 100), 0)}%` : '0%'
                        }}
                      />
                    )
                  ))}
                </div>
                <div className="donut-chart-legend">
                  {chartData.map((item, index) => (
                    item.count > 0 && (
                      <div key={index} className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                        <div className="legend-label">{item.status}: {calculatePercentage(item.count)}%</div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
            
            <div className="author-stats">
              <h3>Penulis Favorit</h3>
              {stats.topAuthor.name !== 'None' ? (
                <div className="top-author">
                  <div className="author-name">{stats.topAuthor.name}</div>
                  <div className="author-count">{stats.topAuthor.count} buku</div>
                </div>
              ) : (
                <p>Belum ada data penulis</p>
              )}
            </div>
          </>
        )}
        
        {stats.totalBooks === 0 && (
          <div className="empty-stats">
            <p>Belum ada buku yang ditambahkan. Tambahkan buku untuk melihat statistik.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;