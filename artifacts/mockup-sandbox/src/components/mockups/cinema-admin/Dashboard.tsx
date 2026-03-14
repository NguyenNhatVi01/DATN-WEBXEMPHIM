import { useState } from "react";
import {
  LayoutDashboard,
  Film,
  Calendar,
  Building2,
  Ticket,
  Users,
  BarChart3,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Moon,
  Sun,
  Menu,
  DollarSign,
  Percent,
  QrCode,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const PRIMARY = "#E50914";
const PRIMARY_DARK = "#b00710";

const revenueData = [
  { day: "T2", revenue: 42 },
  { day: "T3", revenue: 58 },
  { day: "T4", revenue: 35 },
  { day: "T5", revenue: 71 },
  { day: "T6", revenue: 96 },
  { day: "T7", revenue: 130 },
  { day: "CN", revenue: 118 },
];

const monthlyRevenue = [
  { month: "Th1", revenue: 320 },
  { month: "Th2", revenue: 280 },
  { month: "Th3", revenue: 410 },
  { month: "Th4", revenue: 390 },
  { month: "Th5", revenue: 520 },
  { month: "Th6", revenue: 480 },
];

const topMovies = [
  { rank: 1, title: "Avengers: Doomsday", genre: "Hành động", fill: 94, tickets: 1842, trend: "+12%" },
  { rank: 2, title: "Lilo & Stitch (2025)", genre: "Hoạt hình", fill: 88, tickets: 1624, trend: "+8%" },
  { rank: 3, title: "Mission: Impossible 8", genre: "Hành động", fill: 82, tickets: 1410, trend: "+5%" },
  { rank: 4, title: "Wicked: For Good", genre: "Âm nhạc", fill: 76, tickets: 1198, trend: "-2%" },
  { rank: 5, title: "Minecraft Movie 2", genre: "Phiêu lưu", fill: 69, tickets: 987, trend: "+3%" },
];

const movies = [
  { id: 1, title: "Avengers: Doomsday", genre: "Hành động", duration: "148 phút", status: "Đang chiếu", format: "IMAX" },
  { id: 2, title: "Lilo & Stitch (2025)", genre: "Hoạt hình", duration: "112 phút", status: "Đang chiếu", format: "2D/3D" },
  { id: 3, title: "Mission: Impossible 8", genre: "Hành động", duration: "163 phút", status: "Đang chiếu", format: "IMAX" },
  { id: 4, title: "Wicked: For Good", genre: "Âm nhạc", duration: "145 phút", status: "Đang chiếu", format: "2D" },
  { id: 5, title: "Superman (2025)", genre: "Siêu anh hùng", duration: "130 phút", status: "Sắp chiếu", format: "3D" },
  { id: 6, title: "Jurassic World Rebirth", genre: "Phiêu lưu", duration: "128 phút", status: "Sắp chiếu", format: "IMAX" },
];

const showtimes = [
  { id: 1, movie: "Avengers: Doomsday", room: "Phòng 1 (IMAX)", time: "09:00", endTime: "11:28", date: "14/03", seats: 180, booked: 162 },
  { id: 2, movie: "Lilo & Stitch", room: "Phòng 2", time: "09:30", endTime: "11:22", date: "14/03", seats: 120, booked: 98 },
  { id: 3, movie: "Mission: Impossible 8", room: "Phòng 3", time: "10:00", endTime: "12:43", date: "14/03", seats: 150, booked: 120 },
  { id: 4, movie: "Wicked: For Good", room: "Phòng 4", time: "10:15", endTime: "12:40", date: "14/03", seats: 100, booked: 75 },
  { id: 5, movie: "Avengers: Doomsday", room: "Phòng 1 (IMAX)", time: "13:00", endTime: "15:28", date: "14/03", seats: 180, booked: 178 },
  { id: 6, movie: "Superman (2025)", room: "Phòng 5", time: "14:00", endTime: "16:10", date: "14/03", seats: 130, booked: 44 },
];

const tickets = [
  { id: "VE001234", customer: "Nguyễn Văn A", phone: "0901234567", movie: "Avengers: Doomsday", seat: "F7, F8", amount: "280.000đ", status: "Đã thanh toán", time: "08:45" },
  { id: "VE001235", customer: "Trần Thị B", phone: "0912345678", movie: "Lilo & Stitch", seat: "C4", amount: "95.000đ", status: "Đã check-in", time: "09:20" },
  { id: "VE001236", customer: "Lê Minh C", phone: "0923456789", movie: "Mission: Impossible 8", seat: "H10, H11, H12", amount: "435.000đ", status: "Chờ thanh toán", time: "09:55" },
  { id: "VE001237", customer: "Phạm Thị D", phone: "0934567890", movie: "Wicked: For Good", seat: "A1, A2", amount: "190.000đ", status: "Đã hủy", time: "10:02" },
  { id: "VE001238", customer: "Hoàng Văn E", phone: "0945678901", movie: "Avengers: Doomsday", seat: "D5", amount: "140.000đ", status: "Đã thanh toán", time: "10:15" },
  { id: "VE001239", customer: "Vũ Thị F", phone: "0956789012", movie: "Superman (2025)", seat: "E3, E4", amount: "220.000đ", status: "Đã thanh toán", time: "10:30" },
];

type Module = "dashboard" | "movies" | "showtimes" | "rooms" | "tickets" | "users" | "reports";

const seatMap = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 12 }, (_, col) => {
    const seatNum = row * 12 + col;
    const type = row === 0 || row === 1 ? "vip" : row >= 6 ? "sweetbox" : "normal";
    const status = [3, 7, 15, 22, 31, 45, 67, 72, 88].includes(seatNum) ? "booked" : "available";
    return { row, col, type, status, id: `${String.fromCharCode(65 + row)}${col + 1}` };
  })
);

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  "Đã thanh toán": { color: "#28A745", bg: "#28A74520", label: "Đã thanh toán" },
  "Đã check-in": { color: "#17A2B8", bg: "#17A2B820", label: "Đã check-in" },
  "Chờ thanh toán": { color: "#FFC107", bg: "#FFC10720", label: "Chờ thanh toán" },
  "Đã hủy": { color: "#DC3545", bg: "#DC354520", label: "Đã hủy" },
};

export function Dashboard() {
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chartPeriod, setChartPeriod] = useState<"week" | "month">("week");
  const [movieView, setMovieView] = useState<"grid" | "table">("table");
  const [movieFilter, setMovieFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [ticketSearch, setTicketSearch] = useState("");
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const bg = darkMode ? "#0d0d0f" : "#f4f5f7";
  const surface = darkMode ? "#161618" : "#ffffff";
  const surface2 = darkMode ? "#1e1e21" : "#f9fafb";
  const border = darkMode ? "#2a2a2e" : "#e5e7eb";
  const text = darkMode ? "#f1f1f1" : "#111827";
  const textMuted = darkMode ? "#8b8b8f" : "#6b7280";
  const textSecondary = darkMode ? "#c4c4c8" : "#374151";

  const navItems: { id: Module; icon: React.ReactNode; label: string; badge?: number }[] = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Tổng quan" },
    { id: "movies", icon: <Film size={18} />, label: "Quản lý Phim", badge: 2 },
    { id: "showtimes", icon: <Calendar size={18} />, label: "Lịch chiếu" },
    { id: "rooms", icon: <Building2 size={18} />, label: "Phòng chiếu" },
    { id: "tickets", icon: <Ticket size={18} />, label: "Quản lý Vé" },
    { id: "users", icon: <Users size={18} />, label: "Người dùng" },
    { id: "reports", icon: <BarChart3 size={18} />, label: "Báo cáo" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: bg, color: text, fontFamily: "'Inter', sans-serif", fontSize: 14, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 64,
        background: surface,
        borderRight: `1px solid ${border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        flexShrink: 0,
        overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${border}` }}>
          <div style={{ width: 36, height: 36, background: PRIMARY, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Film size={20} color="#fff" />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: text }}>CineAdmin</div>
              <div style={{ fontSize: 11, color: textMuted }}>v2.5.0</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: activeModule === item.id ? `${PRIMARY}20` : "transparent",
                color: activeModule === item.id ? PRIMARY : textSecondary,
                fontWeight: activeModule === item.id ? 600 : 400,
                transition: "all 0.15s",
                textAlign: "left",
                width: "100%",
                position: "relative",
              }}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span style={{ flex: 1, fontSize: 13 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ background: PRIMARY, color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {activeModule === item.id && (
                <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 24, background: PRIMARY, borderRadius: "2px 0 0 2px" }} />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 8px", borderTop: `1px solid ${border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #E50914, #ff6b35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>A</div>
            {sidebarOpen && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Admin</div>
                <div style={{ fontSize: 11, color: textMuted }}>Super Admin</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Nav */}
        <header style={{
          height: 60,
          background: surface,
          borderBottom: `1px solid ${border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 16,
          flexShrink: 0,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, padding: 4, borderRadius: 6 }}>
            <Menu size={20} />
          </button>

          <div style={{ flex: 1, maxWidth: 400, position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
            <input
              placeholder="Tìm kiếm phim, vé, người dùng..."
              style={{
                width: "100%",
                padding: "8px 12px 8px 34px",
                background: surface2,
                border: `1px solid ${border}`,
                borderRadius: 8,
                color: text,
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ flex: 1 }} />

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, cursor: "pointer", color: text, padding: "8px 10px", display: "flex", alignItems: "center", position: "relative" }}
            >
              <Bell size={18} />
              <span style={{ position: "absolute", top: 5, right: 5, width: 8, height: 8, background: PRIMARY, borderRadius: "50%" }} />
            </button>
            {showNotifications && (
              <div style={{ position: "absolute", right: 0, top: 44, width: 300, background: surface, border: `1px solid ${border}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", zIndex: 100, overflow: "hidden" }}>
                <div style={{ padding: "14px 16px", borderBottom: `1px solid ${border}`, fontWeight: 600, fontSize: 13 }}>Thông báo</div>
                {[
                  { icon: <Ticket size={14} color={PRIMARY} />, msg: "Đơn mới #VE001240 vừa được đặt", time: "1 phút" },
                  { icon: <AlertCircle size={14} color="#FFC107" />, msg: "Phòng 3 có lịch chiếu bị xung đột", time: "5 phút" },
                  { icon: <CheckCircle2 size={14} color="#28A745" />, msg: "Vé #VE001238 đã được check-in", time: "12 phút" },
                ].map((n, i) => (
                  <div key={i} style={{ padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start", borderBottom: i < 2 ? `1px solid ${border}` : "none" }}>
                    <div style={{ marginTop: 2 }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: text }}>{n.msg}</div>
                      <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{n.time} trước</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, cursor: "pointer", color: text, padding: "8px 10px", display: "flex", alignItems: "center" }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #E50914, #ff6b35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>A</div>
            <span style={{ fontSize: 13, color: text }}>Admin</span>
            <ChevronDown size={14} color={textMuted} />
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {/* DASHBOARD */}
          {activeModule === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Tổng quan hôm nay</h1>
                  <p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Thứ Bảy, 14 tháng 3 năm 2026</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ padding: "8px 14px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13 }}>
                    Xuất báo cáo
                  </button>
                  <button style={{ padding: "8px 14px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                    + Thêm mới
                  </button>
                </div>
              </div>

              {/* Stats cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { label: "Doanh thu hôm nay", value: "42.5 tr đ", sub: "+18% so hôm qua", icon: <DollarSign size={22} />, color: PRIMARY },
                  { label: "Vé đã bán hôm nay", value: "1.284", sub: "Còn 2.196 ghế trống", icon: <Ticket size={22} />, color: "#17A2B8" },
                  { label: "Phim đang chiếu", value: "8", sub: "4 phim sắp chiếu", icon: <Film size={22} />, color: "#FFC107" },
                  { label: "Người dùng mới", value: "47", sub: "+12 so hôm qua", icon: <Users size={22} />, color: "#28A745" },
                ].map((card, i) => (
                  <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ margin: 0, fontSize: 12, color: textMuted }}>{card.label}</p>
                        <p style={{ margin: "8px 0 4px", fontSize: 26, fontWeight: 700, color: text }}>{card.value}</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#28A745" }}>{card.sub}</p>
                      </div>
                      <div style={{ width: 48, height: 48, background: `${card.color}20`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: card.color }}>
                        {card.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                {/* Revenue Chart */}
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Doanh thu theo thời gian</h3>
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: textMuted }}>Đơn vị: triệu đồng</p>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {(["week", "month"] as const).map(p => (
                        <button
                          key={p}
                          onClick={() => setChartPeriod(p)}
                          style={{ padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, background: chartPeriod === p ? PRIMARY : surface2, color: chartPeriod === p ? "#fff" : textMuted }}
                        >
                          {p === "week" ? "7 ngày" : "6 tháng"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartPeriod === "week" ? revenueData : monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke={border} />
                      <XAxis dataKey={chartPeriod === "week" ? "day" : "month"} tick={{ fill: textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 12 }} />
                      <Line type="monotone" dataKey="revenue" stroke={PRIMARY} strokeWidth={2.5} dot={{ fill: PRIMARY, r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Movies */}
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Top Phim Ăn Khách</h3>
                    <Star size={16} color="#FFC107" fill="#FFC107" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {topMovies.map(m => (
                      <div key={m.rank} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ width: 22, height: 22, background: m.rank === 1 ? "#FFD700" : m.rank === 2 ? "#C0C0C0" : m.rank === 3 ? "#CD7F32" : surface2, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: m.rank <= 3 ? "#fff" : textMuted, flexShrink: 0 }}>
                          {m.rank}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.title}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                            <div style={{ flex: 1, height: 4, background: border, borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ width: `${m.fill}%`, height: "100%", background: PRIMARY, borderRadius: 2 }} />
                            </div>
                            <span style={{ fontSize: 11, color: PRIMARY, fontWeight: 600, flexShrink: 0 }}>{m.fill}%</span>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: m.trend.startsWith("+") ? "#28A745" : "#DC3545", fontWeight: 600, flexShrink: 0 }}>{m.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Showtimes */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Suất chiếu hôm nay</h3>
                  <button onClick={() => setActiveModule("showtimes")} style={{ background: "none", border: "none", cursor: "pointer", color: PRIMARY, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                    Xem tất cả <ArrowUpRight size={14} />
                  </button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Phim", "Phòng", "Giờ chiếu", "Kết thúc", "Lấp đầy"].map(h => (
                          <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {showtimes.slice(0, 4).map(st => {
                        const pct = Math.round((st.booked / st.seats) * 100);
                        return (
                          <tr key={st.id} style={{ borderBottom: `1px solid ${border}` }}>
                            <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: text }}>{st.movie}</td>
                            <td style={{ padding: "10px 12px", fontSize: 12, color: textMuted }}>{st.room}</td>
                            <td style={{ padding: "10px 12px" }}>
                              <span style={{ background: `${PRIMARY}20`, color: PRIMARY, padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{st.time}</span>
                            </td>
                            <td style={{ padding: "10px 12px", fontSize: 12, color: textMuted }}>{st.endTime}</td>
                            <td style={{ padding: "10px 12px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 80, height: 6, background: border, borderRadius: 3, overflow: "hidden" }}>
                                  <div style={{ width: `${pct}%`, height: "100%", background: pct > 80 ? "#28A745" : pct > 50 ? "#FFC107" : PRIMARY, borderRadius: 3 }} />
                                </div>
                                <span style={{ fontSize: 12, color: pct > 80 ? "#28A745" : textMuted }}>{pct}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MOVIES */}
          {activeModule === "movies" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Quản lý Phim</h1>
                  <p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>{movies.length} phim trong hệ thống</p>
                </div>
                <button onClick={() => setShowMovieForm(true)} style={{ padding: "9px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <Plus size={16} /> Thêm phim mới
                </button>
              </div>

              {/* Filters */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative" }}>
                  <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                  <input placeholder="Tìm kiếm phim..." style={{ padding: "8px 12px 8px 32px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", width: 220 }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["all", "showing", "upcoming"].map(f => (
                    <button
                      key={f}
                      onClick={() => setMovieFilter(f)}
                      style={{ padding: "7px 14px", background: movieFilter === f ? PRIMARY : surface, border: `1px solid ${movieFilter === f ? PRIMARY : border}`, borderRadius: 8, color: movieFilter === f ? "#fff" : text, cursor: "pointer", fontSize: 13 }}
                    >
                      {f === "all" ? "Tất cả" : f === "showing" ? "Đang chiếu" : "Sắp chiếu"}
                    </button>
                  ))}
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                  {(["grid", "table"] as const).map(v => (
                    <button key={v} onClick={() => setMovieView(v)} style={{ padding: "7px 12px", background: movieView === v ? `${PRIMARY}20` : surface, border: `1px solid ${movieView === v ? PRIMARY : border}`, borderRadius: 8, color: movieView === v ? PRIMARY : textMuted, cursor: "pointer", fontSize: 13 }}>
                      {v === "grid" ? "🔲 Grid" : "☰ Bảng"}
                    </button>
                  ))}
                </div>
              </div>

              {movieView === "table" ? (
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: surface2 }}>
                        {["", "Tên phim", "Thể loại", "Thời lượng", "Định dạng", "Trạng thái", "Thao tác"].map(h => (
                          <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {movies.filter(m => movieFilter === "all" || (movieFilter === "showing" && m.status === "Đang chiếu") || (movieFilter === "upcoming" && m.status === "Sắp chiếu")).map(movie => (
                        <tr key={movie.id} style={{ borderBottom: `1px solid ${border}` }}>
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ width: 40, height: 56, background: `${PRIMARY}30`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Film size={18} color={PRIMARY} />
                            </div>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ fontWeight: 600, fontSize: 13, color: text }}>{movie.title}</div>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: textMuted }}>{movie.genre}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, color: textMuted, fontSize: 13 }}>
                              <Clock size={12} /> {movie.duration}
                            </div>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ background: "#17A2B820", color: "#17A2B8", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{movie.format}</span>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ background: movie.status === "Đang chiếu" ? "#28A74520" : "#FFC10720", color: movie.status === "Đang chiếu" ? "#28A745" : "#FFC107", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                              {movie.status}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: textMuted }}><Eye size={14} /></button>
                              <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#17A2B8" }}><Edit size={14} /></button>
                              <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#DC3545" }}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {movies.map(movie => (
                    <div key={movie.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                      <div style={{ height: 140, background: `linear-gradient(135deg, ${PRIMARY}40, #ff6b3540)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Film size={48} color={PRIMARY} />
                      </div>
                      <div style={{ padding: 14 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: text, marginBottom: 6 }}>{movie.title}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                          <span style={{ fontSize: 11, color: textMuted }}>{movie.genre}</span>
                          <span style={{ fontSize: 11, color: textMuted }}>· {movie.duration}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ background: movie.status === "Đang chiếu" ? "#28A74520" : "#FFC10720", color: movie.status === "Đang chiếu" ? "#28A745" : "#FFC107", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{movie.status}</span>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 6px", cursor: "pointer", color: "#17A2B8" }}><Edit size={12} /></button>
                            <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 6px", cursor: "pointer", color: "#DC3545" }}><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Movie Form Modal */}
              {showMovieForm && (
                <div style={{ position: "fixed", inset: 0, background: "#000000a0", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ background: surface, borderRadius: 16, padding: 28, width: 560, maxHeight: "80vh", overflowY: "auto", border: `1px solid ${border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Thêm phim mới</h2>
                      <button onClick={() => setShowMovieForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, fontSize: 20 }}>×</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {[
                        { label: "Tên phim", placeholder: "Nhập tên phim..." },
                        { label: "Đạo diễn", placeholder: "Tên đạo diễn..." },
                        { label: "Diễn viên chính", placeholder: "Tên các diễn viên..." },
                      ].map(field => (
                        <div key={field.label}>
                          <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>{field.label}</label>
                          <input placeholder={field.placeholder} style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                        </div>
                      ))}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Thể loại</label>
                          <select style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none" }}>
                            <option>Hành động</option><option>Hoạt hình</option><option>Kinh dị</option><option>Hài</option><option>Tình cảm</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Định dạng</label>
                          <select style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none" }}>
                            <option>2D</option><option>3D</option><option>IMAX</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Thời lượng (phút)</label>
                          <input type="number" placeholder="120" style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Giới hạn tuổi</label>
                          <select style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none" }}>
                            <option>T13 (Trên 13 tuổi)</option><option>T16 (Trên 16 tuổi)</option><option>T18 (Trên 18 tuổi)</option><option>P (Mọi lứa tuổi)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Trailer (YouTube link)</label>
                        <input placeholder="https://youtube.com/watch?v=..." style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Mô tả nội dung</label>
                        <textarea rows={3} placeholder="Mô tả cốt truyện..." style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Upload Poster</label>
                        <div style={{ border: `2px dashed ${border}`, borderRadius: 8, padding: "20px", textAlign: "center", cursor: "pointer", color: textMuted }}>
                          <Film size={24} style={{ marginBottom: 6 }} />
                          <div style={{ fontSize: 12 }}>Kéo thả hoặc click để upload</div>
                          <div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG tối đa 5MB</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
                      <button onClick={() => setShowMovieForm(false)} style={{ padding: "9px 18px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13 }}>Hủy</button>
                      <button style={{ padding: "9px 18px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Lưu phim</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SHOWTIMES */}
          {activeModule === "showtimes" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Lịch chiếu</h1>
                  <p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Quản lý và sắp xếp suất chiếu</p>
                </div>
                <button style={{ padding: "9px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <Plus size={16} /> Thêm suất chiếu
                </button>
              </div>

              {/* Calendar Navigation */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <button style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: text, display: "flex", alignItems: "center", gap: 4 }}>
                    <ChevronLeft size={16} /> Trước
                  </button>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Tháng 3, 2026</h3>
                  <button style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: text, display: "flex", alignItems: "center", gap: 4 }}>
                    Sau <ChevronRight size={16} />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 12 }}>
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => (
                    <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: textMuted, padding: "6px 0" }}>{d}</div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2;
                    const isToday = day === 14;
                    const hasShowtimes = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].includes(day);
                    return (
                      <div key={i} style={{
                        textAlign: "center",
                        padding: "8px 4px",
                        borderRadius: 8,
                        fontSize: 13,
                        cursor: day > 0 && day <= 31 ? "pointer" : "default",
                        background: isToday ? PRIMARY : "transparent",
                        color: day <= 0 || day > 31 ? border : isToday ? "#fff" : text,
                        position: "relative",
                        fontWeight: isToday ? 700 : 400,
                      }}>
                        {day > 0 && day <= 31 ? day : ""}
                        {hasShowtimes && day > 0 && day <= 31 && !isToday && (
                          <div style={{ width: 4, height: 4, background: PRIMARY, borderRadius: "50%", position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)" }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline view */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Lịch chiếu ngày 14/03/2026</h3>
                  <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                    {[{ color: PRIMARY, label: "IMAX" }, { color: "#17A2B8", label: "3D" }, { color: "#28A745", label: "2D" }].map(l => (
                      <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 10, height: 10, background: l.color, borderRadius: 2 }} />
                        <span style={{ color: textMuted }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room timeline */}
                {["Phòng 1 (IMAX)", "Phòng 2 (3D)", "Phòng 3 (2D)", "Phòng 4 (2D)"].map((room, ri) => (
                  <div key={ri} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                    <div style={{ width: 120, fontSize: 12, color: textMuted, flexShrink: 0 }}>{room}</div>
                    <div style={{ flex: 1, height: 44, background: surface2, borderRadius: 8, position: "relative", overflow: "hidden" }}>
                      {showtimes.filter((_, i) => i % 4 === ri).map((st, si) => {
                        const start = parseInt(st.time.split(":")[0]) * 60 + parseInt(st.time.split(":")[1]);
                        const end = parseInt(st.endTime.split(":")[0]) * 60 + parseInt(st.endTime.split(":")[1]);
                        const totalMin = 18 * 60 - 8 * 60;
                        const left = ((start - 8 * 60) / totalMin) * 100;
                        const width = ((end - start) / totalMin) * 100;
                        const colors = [PRIMARY, "#17A2B8", "#28A745"];
                        return (
                          <div key={si} style={{
                            position: "absolute",
                            left: `${left}%`,
                            width: `${width}%`,
                            height: "100%",
                            background: `${colors[ri % colors.length]}cc`,
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 8,
                            fontSize: 11,
                            color: "#fff",
                            fontWeight: 600,
                            overflow: "hidden",
                            cursor: "pointer",
                            boxSizing: "border-box",
                          }}>
                            {st.movie.split(" ").slice(0, 2).join(" ")} {st.time}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", paddingLeft: 132 }}>
                  {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map(t => (
                    <div key={t} style={{ flex: 1, fontSize: 10, color: textMuted, textAlign: "center" }}>{t}</div>
                  ))}
                </div>
              </div>

              {/* Showtimes table */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Chi tiết suất chiếu</h3>
                  <div style={{ display: "flex", gap: 6 }}>
                    <AlertCircle size={14} color="#FFC107" />
                    <span style={{ fontSize: 12, color: "#FFC107" }}>0 xung đột lịch</span>
                  </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: surface2 }}>
                      {["Phim", "Phòng", "Ngày", "Giờ bắt đầu", "Giờ kết thúc", "Ghế trống", "Thao tác"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {showtimes.map(st => (
                      <tr key={st.id} style={{ borderBottom: `1px solid ${border}` }}>
                        <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: text }}>{st.movie}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{st.room}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{st.date}</td>
                        <td style={{ padding: "10px 16px" }}>
                          <span style={{ background: `${PRIMARY}20`, color: PRIMARY, padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{st.time}</span>
                        </td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{st.endTime}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12 }}>
                          <span style={{ color: st.seats - st.booked < 10 ? "#DC3545" : "#28A745", fontWeight: 600 }}>{st.seats - st.booked}</span>
                          <span style={{ color: textMuted }}> / {st.seats}</span>
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#17A2B8" }}><Edit size={13} /></button>
                            <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#DC3545" }}><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ROOMS */}
          {activeModule === "rooms" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Sơ đồ Phòng chiếu</h1>
                  <p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Quản lý ghế và định giá theo loại ghế</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
                {/* Room list */}
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                  <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600 }}>Danh sách phòng</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { id: 1, name: "Phòng 1 (IMAX)", seats: 180, type: "IMAX" },
                      { id: 2, name: "Phòng 2 (3D)", seats: 120, type: "3D" },
                      { id: 3, name: "Phòng 3", seats: 150, type: "2D" },
                      { id: 4, name: "Phòng 4", seats: 100, type: "2D" },
                      { id: 5, name: "Phòng 5 (VIP)", seats: 80, type: "VIP" },
                    ].map(room => (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 14px",
                          borderRadius: 8,
                          border: `1px solid ${selectedRoom === room.id ? PRIMARY : border}`,
                          background: selectedRoom === room.id ? `${PRIMARY}15` : surface2,
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <Building2 size={18} color={selectedRoom === room.id ? PRIMARY : textMuted} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: text }}>{room.name}</div>
                          <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{room.seats} ghế · {room.type}</div>
                        </div>
                        {selectedRoom === room.id && <ChevronRight size={14} color={PRIMARY} />}
                      </button>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${border}` }}>
                    <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600 }}>Bảng giá vé</h4>
                    {[
                      { type: "Ghế thường (Ngày thường)", price: "95.000đ", color: "#6b7280" },
                      { type: "Ghế thường (Cuối tuần)", price: "120.000đ", color: "#6b7280" },
                      { type: "Ghế VIP (Ngày thường)", price: "150.000đ", color: "#FFC107" },
                      { type: "Ghế VIP (Cuối tuần)", price: "180.000đ", color: "#FFC107" },
                      { type: "Ghế Đôi (Sweetbox)", price: "280.000đ", color: PRIMARY },
                    ].map(p => (
                      <div key={p.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${border}` }}>
                        <span style={{ fontSize: 12, color: textMuted }}>{p.type}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seat Map */}
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Sơ đồ phòng {selectedRoom}</h3>
                    <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
                      {[
                        { color: "#28A74530", border: "#28A745", label: "Trống" },
                        { color: "#6b728030", border: "#6b7280", label: "Đã đặt" },
                        { color: "#FFC10730", border: "#FFC107", label: "VIP" },
                        { color: `${PRIMARY}30`, border: PRIMARY, label: "Sweetbox" },
                      ].map(s => (
                        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 12, height: 12, background: s.color, border: `1.5px solid ${s.border}`, borderRadius: 2 }} />
                          <span style={{ color: textMuted }}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Screen */}
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ height: 8, background: `linear-gradient(90deg, transparent, ${textMuted}60, transparent)`, borderRadius: 4, marginBottom: 6 }} />
                    <div style={{ fontSize: 11, color: textMuted }}>MÀN HÌNH</div>
                  </div>

                  {/* Seat grid */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    {seatMap.map((row, ri) => (
                      <div key={ri} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <span style={{ width: 18, fontSize: 11, color: textMuted, textAlign: "right", flexShrink: 0 }}>{String.fromCharCode(65 + ri)}</span>
                        {row.map((seat) => {
                          const seatColor = seat.status === "booked" ? "#6b7280" : seat.type === "vip" ? "#FFC107" : seat.type === "sweetbox" ? PRIMARY : "#28A745";
                          const seatBg = seat.status === "booked" ? "#6b728030" : seat.type === "vip" ? "#FFC10730" : seat.type === "sweetbox" ? `${PRIMARY}30` : "#28A74530";
                          return (
                            <div
                              key={seat.id}
                              title={seat.id}
                              style={{
                                width: seat.type === "sweetbox" ? 28 : 22,
                                height: 20,
                                background: seatBg,
                                border: `1.5px solid ${seatColor}`,
                                borderRadius: 4,
                                cursor: seat.status === "available" ? "pointer" : "not-allowed",
                                fontSize: 9,
                                color: seatColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                              }}
                            />
                          );
                        })}
                        <span style={{ width: 18, fontSize: 11, color: textMuted, textAlign: "left", flexShrink: 0 }}>{String.fromCharCode(65 + ri)}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                      <span style={{ width: 18 }} />
                      {Array.from({ length: 12 }, (_, i) => (
                        <span key={i} style={{ width: 22, fontSize: 9, color: textMuted, textAlign: "center" }}>{i + 1}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
                    <button style={{ padding: "8px 14px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13 }}>Đặt lại</button>
                    <button style={{ padding: "8px 14px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Lưu sơ đồ</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TICKETS */}
          {activeModule === "tickets" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Quản lý Vé & Giao dịch</h1>
                  <p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Tra cứu và quản lý vé đặt chỗ</p>
                </div>
                <button style={{ padding: "9px 16px", background: "#28A745", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <Download size={16} /> Xuất Excel
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  { label: "Đã thanh toán", value: "856", color: "#28A745", icon: <CheckCircle2 size={18} /> },
                  { label: "Đã check-in", value: "234", color: "#17A2B8", icon: <QrCode size={18} /> },
                  { label: "Chờ thanh toán", value: "48", color: "#FFC107", icon: <Clock size={18} /> },
                  { label: "Đã hủy", value: "23", color: "#DC3545", icon: <XCircle size={18} /> },
                ].map(s => (
                  <div key={s.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: `${s.color}20`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: text }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: textMuted }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search */}
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                  <input
                    value={ticketSearch}
                    onChange={e => setTicketSearch(e.target.value)}
                    placeholder="Tìm theo mã vé, số điện thoại hoặc tên khách hàng..."
                    style={{ width: "100%", padding: "10px 12px 10px 36px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <button style={{ padding: "10px 16px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  <Filter size={14} /> Bộ lọc
                </button>
                <div style={{ position: "relative" }}>
                  <QrCode size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                  <input placeholder="Quét mã QR..." style={{ padding: "10px 12px 10px 34px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", width: 180 }} />
                </div>
              </div>

              {/* Tickets table */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: surface2 }}>
                      {["Mã vé", "Khách hàng", "SĐT", "Phim", "Ghế ngồi", "Số tiền", "Trạng thái", "Giờ đặt", "Thao tác"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "11px 14px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.filter(t => !ticketSearch || t.id.includes(ticketSearch) || t.phone.includes(ticketSearch) || t.customer.toLowerCase().includes(ticketSearch.toLowerCase())).map(ticket => {
                      const sc = statusConfig[ticket.status];
                      return (
                        <tr key={ticket.id} style={{ borderBottom: `1px solid ${border}` }}>
                          <td style={{ padding: "10px 14px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <QrCode size={14} color={textMuted} />
                              <span style={{ fontSize: 12, fontFamily: "monospace", color: PRIMARY, fontWeight: 600 }}>{ticket.id}</span>
                            </div>
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 500, color: text }}>{ticket.customer}</td>
                          <td style={{ padding: "10px 14px", fontSize: 12, color: textMuted }}>{ticket.phone}</td>
                          <td style={{ padding: "10px 14px", fontSize: 12, color: text, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.movie}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{ background: `${PRIMARY}15`, color: PRIMARY, padding: "2px 7px", borderRadius: 5, fontSize: 12, fontFamily: "monospace" }}>{ticket.seat}</span>
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: text }}>{ticket.amount}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{ background: sc?.bg, color: sc?.color, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                              {ticket.status}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 12, color: textMuted }}>{ticket.time}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <div style={{ display: "flex", gap: 5 }}>
                              <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 5, padding: "4px 7px", cursor: "pointer", color: textMuted }}><Eye size={12} /></button>
                              {ticket.status === "Chờ thanh toán" && (
                                <button style={{ background: "none", border: `1px solid #28A745`, borderRadius: 5, padding: "4px 7px", cursor: "pointer", color: "#28A745", fontSize: 11 }}>✓</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeModule === "users" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Người dùng</h1>
                <p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Quản lý tài khoản khách hàng</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {[
                  { name: "Nguyễn Văn A", email: "nva@email.com", tickets: 12, spent: "1.420.000đ", joined: "01/2025", avatar: "N" },
                  { name: "Trần Thị B", email: "ttb@email.com", tickets: 8, spent: "960.000đ", joined: "02/2025", avatar: "T" },
                  { name: "Lê Minh C", email: "lmc@email.com", tickets: 21, spent: "2.640.000đ", joined: "12/2024", avatar: "L" },
                  { name: "Phạm Thị D", email: "ptd@email.com", tickets: 5, spent: "580.000đ", joined: "03/2025", avatar: "P" },
                  { name: "Hoàng Văn E", email: "hve@email.com", tickets: 15, spent: "1.850.000đ", joined: "11/2024", avatar: "H" },
                  { name: "Vũ Thị F", email: "vtf@email.com", tickets: 3, spent: "360.000đ", joined: "03/2026", avatar: "V" },
                ].map((user, i) => (
                  <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${PRIMARY}, #ff6b35)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>
                        {user.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: text }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: textMuted }}>{user.email}</div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div style={{ background: surface2, borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, color: textMuted, marginBottom: 3 }}>Số vé đã mua</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: PRIMARY }}>{user.tickets}</div>
                      </div>
                      <div style={{ background: surface2, borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, color: textMuted, marginBottom: 3 }}>Tổng chi tiêu</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: text }}>{user.spent}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: textMuted }}>Thành viên từ {user.joined}</span>
                      <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: textMuted, fontSize: 12 }}>Xem chi tiết</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS */}
          {activeModule === "reports" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Báo cáo & Phân tích</h1>
                  <p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Thống kê kinh doanh chi tiết</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <select style={{ padding: "8px 12px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none" }}>
                    <option>Tháng 3/2026</option><option>Tháng 2/2026</option><option>Tháng 1/2026</option>
                  </select>
                  <button style={{ padding: "9px 16px", background: "#28A745", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    <Download size={16} /> Xuất Excel
                  </button>
                </div>
              </div>

              {/* Summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {[
                  { label: "Tổng doanh thu tháng", value: "824 tr đ", sub: "+23% tháng trước", color: PRIMARY },
                  { label: "Tổng vé bán ra", value: "12.480", sub: "Trung bình 403/ngày", color: "#17A2B8" },
                  { label: "Tỷ lệ lấp đầy TB", value: "78.4%", sub: "Mục tiêu: 80%", color: "#FFC107" },
                  { label: "Doanh thu / Ghế", value: "66.100đ", sub: "+8% tháng trước", color: "#28A745" },
                ].map(c => (
                  <div key={c.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 18 }}>
                    <div style={{ fontSize: 12, color: textMuted, marginBottom: 8 }}>{c.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: c.color, marginBottom: 4 }}>{c.value}</div>
                    <div style={{ fontSize: 12, color: "#28A745" }}>{c.sub}</div>
                  </div>
                ))}
              </div>

              {/* Monthly bar chart */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Doanh thu 6 tháng gần nhất</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke={border} />
                    <XAxis dataKey="month" tick={{ fill: textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 12 }} />
                    <Bar dataKey="revenue" fill={PRIMARY} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top movies report */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${border}` }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Doanh thu theo phim</h3>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: surface2 }}>
                      {["#", "Tên phim", "Thể loại", "Số suất chiếu", "Vé bán", "Tỷ lệ lấp đầy", "Doanh thu"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topMovies.map(m => (
                      <tr key={m.rank} style={{ borderBottom: `1px solid ${border}` }}>
                        <td style={{ padding: "10px 16px" }}>
                          <span style={{ width: 22, height: 22, background: m.rank <= 3 ? ["#FFD700", "#C0C0C0", "#CD7F32"][m.rank - 1] : surface2, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: m.rank <= 3 ? "#000" : textMuted }}>
                            {m.rank}
                          </span>
                        </td>
                        <td style={{ padding: "10px 16px", fontWeight: 600, fontSize: 13, color: text }}>{m.title}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{m.genre}</td>
                        <td style={{ padding: "10px 16px", fontSize: 13, color: text }}>{24 - m.rank * 2}</td>
                        <td style={{ padding: "10px 16px", fontSize: 13, color: text }}>{m.tickets.toLocaleString()}</td>
                        <td style={{ padding: "10px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 70, height: 6, background: border, borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${m.fill}%`, height: "100%", background: m.fill > 80 ? "#28A745" : m.fill > 60 ? "#FFC107" : PRIMARY, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600, color: m.fill > 80 ? "#28A745" : text }}>{m.fill}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 700, color: PRIMARY }}>{(m.tickets * 120 / 1000).toFixed(0)} tr đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
