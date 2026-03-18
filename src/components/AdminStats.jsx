import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart3, Users, ClipboardList, CheckCircle, XCircle, TrendingUp, PieChart } from 'lucide-react';
import '../styles/AdminComponents.css';

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalApplications: 234,
    pendingReview: 45,
    forCompliance: 12,
    forEndorsement: 8,
    forPayment: 15,
    approvedPermits: 178,
    rejectedApplications: 11,
    applicationsToday: 8,
    revenueCollected: '₱890,000',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch applications
      const { data: apps, error: appsError } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false });

      const { data: pendingApps } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false })
        .eq('status', 'pending-review');

      const { data: complianceApps } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false })
        .eq('status', 'for-compliance');

      const { data: endorsementApps } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false })
        .eq('status', 'for-endorsement');

      const { data: paymentApps } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false })
        .eq('status', 'for-payment');

      const { data: approvedApps } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false })
        .eq('status', 'approved');

      const { data: rejectedApps } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false })
        .eq('status', 'rejected');

      // Count today's applications
      const today = new Date().toISOString().split('T')[0];
      const { data: todayApps } = await supabase
        .from('business_applications')
        .select('*', { count: 'exact', head: false })
        .gte('created_at', today + 'T00:00:00');

      if (!appsError) {
        setStats({
          totalApplications: apps?.length || 0,
          pendingReview: pendingApps?.length || 0,
          forCompliance: complianceApps?.length || 0,
          forEndorsement: endorsementApps?.length || 0,
          forPayment: paymentApps?.length || 0,
          approvedPermits: approvedApps?.length || 0,
          rejectedApplications: rejectedApps?.length || 0,
          applicationsToday: todayApps?.length || 0,
          revenueCollected: '₱' + ((approvedApps?.length || 0) * 5000).toLocaleString(),
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading dashboard statistics...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
        <p>System statistics and key metrics</p>
      </div>

      {/* Key Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', color: '#3b82f6' }}>
            <ClipboardList size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Applications</p>
            <p className="stat-value">{stats.totalApplications}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', color: '#f97316' }}>
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Review</p>
            <p className="stat-value">{stats.pendingReview}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', color: '#ec4899' }}>
            <ClipboardList size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">For Compliance</p>
            <p className="stat-value">{stats.forCompliance}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', color: '#6366f1' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">For Endorsement</p>
            <p className="stat-value">{stats.forEndorsement}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', color: '#22c55e' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">For Payment</p>
            <p className="stat-value">{stats.forPayment}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #c7f0d8 0%, #a7f3d0 100%)', color: '#059669' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Approved Permits</p>
            <p className="stat-value">{stats.approvedPermits}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', color: '#ef4444' }}>
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Rejected Applications</p>
            <p className="stat-value">{stats.rejectedApplications}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)', color: '#a855f7' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Applications Today</p>
            <p className="stat-value">{stats.applicationsToday}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', color: '#d97706' }}>
            <PieChart size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Revenue Collected</p>
            <p className="stat-value" style={{ fontSize: '1.25rem' }}>{stats.revenueCollected}</p>
          </div>
        </div>
      </div>

      {/* Summary Information */}
      <div style={{ marginTop: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '2rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#1e293b', fontSize: '1.1rem', fontWeight: 600 }}>
          System Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Approval Rate</p>
            <p style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0 0 0' }}>
              {Math.round((stats.approvedPermits / (stats.approvedPermits + stats.rejectedApplications)) * 100)}%
            </p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Average Fee</p>
            <p style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0 0 0' }}>
              ₱5,000
            </p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Processing Time</p>
            <p style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0 0 0' }}>
              3-5 days
            </p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Pending Resolution</p>
            <p style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0 0 0' }}>
              {stats.pendingApplications} cases
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
