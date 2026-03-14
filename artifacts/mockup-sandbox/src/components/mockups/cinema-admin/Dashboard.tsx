import { useState } from "react";
import {
  LayoutDashboard, Film, Calendar, Building2, Ticket, Users, BarChart3,
  Bell, Search, ChevronDown, Star, Clock, CheckCircle2, XCircle,
  AlertCircle, Download, Plus, Edit, Trash2, Eye, Filter, Moon, Sun,
  Menu, DollarSign, QrCode, ChevronRight, ChevronLeft, ArrowUpRight,
  LogOut, UserCircle, UserPlus, Camera, Shield, Key, Mail, Phone,
  MapPin, Save, X,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";

const PRIMARY = "#E50914";

const revenueData = [
  { day: "T2", revenue: 42 }, { day: "T3", revenue: 58 },
  { day: "T4", revenue: 35 }, { day: "T5", revenue: 71 },
  { day: "T6", revenue: 96 }, { day: "T7", revenue: 130 }, { day: "CN", revenue: 118 },
];
const monthlyRevenue = [
  { month: "Th1", revenue: 320 }, { month: "Th2", revenue: 280 },
  { month: "Th3", revenue: 410 }, { month: "Th4", revenue: 390 },
  { month: "Th5", revenue: 520 }, { month: "Th6", revenue: 480 },
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

type Module = "dashboard" | "movies" | "showtimes" | "rooms" | "tickets" | "users" | "reports" | "profile";

const seatMap = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 12 }, (_, col) => {
    const seatNum = row * 12 + col;
    const type = row === 0 || row === 1 ? "vip" : row >= 6 ? "sweetbox" : "normal";
    const status = [3, 7, 15, 22, 31, 45, 67, 72, 88].includes(seatNum) ? "booked" : "available";
    return { row, col, type, status, id: `${String.fromCharCode(65 + row)}${col + 1}` };
  })
);

const statusConfig: Record<string, { color: string; bg: string }> = {
  "Đã thanh toán": { color: "#28A745", bg: "#28A74520" },
  "Đã check-in": { color: "#17A2B8", bg: "#17A2B820" },
  "Chờ thanh toán": { color: "#FFC107", bg: "#FFC10720" },
  "Đã hủy": { color: "#DC3545", bg: "#DC354520" },
};

/* ─── Reusable Modal wrapper ─── */
function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000b0", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#161618", border: "1px solid #2a2a2e", borderRadius: 16, padding: 28, width: wide ? 680 : 560, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#f1f1f1" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#8b8b8f", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#8b8b8f", display: "block", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", background: "#1e1e21", border: "1px solid #2a2a2e",
  borderRadius: 8, color: "#f1f1f1", fontSize: 13, outline: "none", boxSizing: "border-box",
};
const selectStyle: React.CSSProperties = { ...inputStyle };

export function Dashboard() {
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chartPeriod, setChartPeriod] = useState<"week" | "month">("week");
  const [movieView, setMovieView] = useState<"grid" | "table">("table");
  const [movieFilter, setMovieFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [ticketSearch, setTicketSearch] = useState("");
  // Modals
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showShowtimeForm, setShowShowtimeForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  // Rooms: seat selection + price editing
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatPrices, setSeatPrices] = useState({ normal: "95.000", vip: "150.000", sweetbox: "280.000" });
  const [showPricePanel, setShowPricePanel] = useState(false);
  const [priceApplied, setPriceApplied] = useState(false);

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

      {/* ── SIDEBAR ── */}
      <div style={{ width: sidebarOpen ? 240 : 64, background: surface, borderRight: `1px solid ${border}`, display: "flex", flexDirection: "column", transition: "width 0.2s ease", flexShrink: 0, overflow: "hidden" }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${border}` }}>
          <div style={{ width: 36, height: 36, background: PRIMARY, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Film size={20} color="#fff" />
          </div>
          {sidebarOpen && <div><div style={{ fontWeight: 700, fontSize: 16, color: text }}>CineAdmin</div><div style={{ fontSize: 11, color: textMuted }}>v2.5.0</div></div>}
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveModule(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: activeModule === item.id ? `${PRIMARY}20` : "transparent", color: activeModule === item.id ? PRIMARY : textSecondary, fontWeight: activeModule === item.id ? 600 : 400, transition: "all 0.15s", textAlign: "left", width: "100%", position: "relative" }}>
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (<><span style={{ flex: 1, fontSize: 13 }}>{item.label}</span>{item.badge && <span style={{ background: PRIMARY, color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{item.badge}</span>}</>)}
              {activeModule === item.id && <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 24, background: PRIMARY, borderRadius: "2px 0 0 2px" }} />}
            </button>
          ))}
        </nav>

        {/* Sidebar bottom: profile + logout */}
        <div style={{ padding: "12px 8px", borderTop: `1px solid ${border}`, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Profile shortcut */}
          <button onClick={() => setActiveModule("profile")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: activeModule === "profile" ? `${PRIMARY}20` : "transparent", cursor: "pointer", width: "100%", textAlign: "left" }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #E50914, #ff6b35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>A</div>
            {sidebarOpen && (<div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: activeModule === "profile" ? PRIMARY : text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Nguyễn Admin</div><div style={{ fontSize: 11, color: textMuted }}>Super Admin</div></div>)}
          </button>
          {/* Logout button */}
          <button onClick={() => setShowLogoutConfirm(true)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", width: "100%", color: "#DC3545", transition: "background 0.15s" }} onMouseEnter={e => (e.currentTarget.style.background = "#DC354518")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 500 }}>Đăng xuất</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Nav */}
        <header style={{ height: 60, background: surface, borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, padding: 4, borderRadius: 6 }}>
            <Menu size={20} />
          </button>
          <div style={{ flex: 1, maxWidth: 400, position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
            <input placeholder="Tìm kiếm phim, vé, người dùng..." style={{ width: "100%", padding: "8px 12px 8px 34px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" as const }} />
          </div>
          <div style={{ flex: 1 }} />

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }} style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, cursor: "pointer", color: text, padding: "8px 10px", display: "flex", alignItems: "center", position: "relative" }}>
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
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: text }}>{n.msg}</div><div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{n.time} trước</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, cursor: "pointer", color: text, padding: "8px 10px", display: "flex", alignItems: "center" }}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile dropdown */}
          <div style={{ position: "relative" }}>
            <button onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, cursor: "pointer" }}>
              <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #E50914, #ff6b35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>A</div>
              <span style={{ fontSize: 13, color: text }}>Nguyễn Admin</span>
              <ChevronDown size={14} color={textMuted} />
            </button>
            {showProfileMenu && (
              <div style={{ position: "absolute", right: 0, top: 48, width: 200, background: surface, border: `1px solid ${border}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", zIndex: 100, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: text }}>Nguyễn Admin</div>
                  <div style={{ fontSize: 11, color: textMuted }}>admin@cineadmin.vn</div>
                </div>
                {[
                  { icon: <UserCircle size={15} />, label: "Trang cá nhân", action: () => { setActiveModule("profile"); setShowProfileMenu(false); } },
                  { icon: <Shield size={15} />, label: "Bảo mật", action: () => { setActiveModule("profile"); setShowProfileMenu(false); } },
                ].map((item, i) => (
                  <button key={i} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: "none", border: "none", cursor: "pointer", color: textSecondary, fontSize: 13, width: "100%", textAlign: "left" }}>
                    <span style={{ color: textMuted }}>{item.icon}</span>{item.label}
                  </button>
                ))}
                <div style={{ borderTop: `1px solid ${border}` }}>
                  <button onClick={() => { setShowLogoutConfirm(true); setShowProfileMenu(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: "none", border: "none", cursor: "pointer", color: "#DC3545", fontSize: 13, width: "100%", textAlign: "left", fontWeight: 500 }}>
                    <LogOut size={15} /> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main style={{ flex: 1, overflow: "auto", padding: 24 }}>

          {/* DASHBOARD */}
          {activeModule === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Tổng quan hôm nay</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Thứ Bảy, 14 tháng 3 năm 2026</p></div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button style={{ padding: "8px 14px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    <Download size={14} /> Xuất báo cáo
                  </button>
                  {/* Quick-add dropdown */}
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => setShowQuickAdd(!showQuickAdd)}
                      style={{ padding: "8px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Plus size={16} /> Thêm mới <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: showQuickAdd ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </button>
                    {showQuickAdd && (
                      <div style={{ position: "absolute", right: 0, top: 44, width: 240, background: surface, border: `1px solid ${border}`, borderRadius: 14, boxShadow: "0 12px 32px rgba(0,0,0,0.4)", zIndex: 200, overflow: "hidden" }}>
                        <div style={{ padding: "10px 14px 8px", fontSize: 11, fontWeight: 700, color: textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Thêm nhanh</div>
                        {[
                          { icon: <Film size={16} />, label: "Thêm phim mới", desc: "Thêm phim vào hệ thống", color: "#17A2B8", action: () => { setShowMovieForm(true); setShowQuickAdd(false); } },
                          { icon: <Calendar size={16} />, label: "Thêm suất chiếu", desc: "Lên lịch phim mới", color: "#28A745", action: () => { setShowShowtimeForm(true); setShowQuickAdd(false); } },
                          { icon: <UserPlus size={16} />, label: "Thêm người dùng", desc: "Tạo tài khoản khách hàng", color: "#FFC107", action: () => { setShowUserForm(true); setShowQuickAdd(false); } },
                          { icon: <Ticket size={16} />, label: "Tạo vé thủ công", desc: "Xuất vé tại quầy", color: PRIMARY, action: () => setShowQuickAdd(false) },
                        ].map((item, i) => (
                          <button
                            key={i}
                            onClick={item.action}
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", transition: "background 0.1s" }}
                            onMouseEnter={e => (e.currentTarget.style.background = surface2)}
                            onMouseLeave={e => (e.currentTarget.style.background = "none")}
                          >
                            <div style={{ width: 36, height: 36, background: `${item.color}20`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>{item.icon}</div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: text }}>{item.label}</div>
                              <div style={{ fontSize: 11, color: textMuted, marginTop: 1 }}>{item.desc}</div>
                            </div>
                          </button>
                        ))}
                        <div style={{ borderTop: `1px solid ${border}`, padding: "8px 14px 10px" }}>
                          <button
                            onClick={() => { setActiveModule("reports"); setShowQuickAdd(false); }}
                            style={{ width: "100%", padding: "8px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: textMuted, fontSize: 12, cursor: "pointer", textAlign: "center" as const }}
                          >
                            Xem toàn bộ báo cáo →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { label: "Doanh thu hôm nay", value: "42.5 tr đ", sub: "+18% so hôm qua", icon: <DollarSign size={22} />, color: PRIMARY },
                  { label: "Vé đã bán hôm nay", value: "1.284", sub: "Còn 2.196 ghế trống", icon: <Ticket size={22} />, color: "#17A2B8" },
                  { label: "Phim đang chiếu", value: "8", sub: "4 phim sắp chiếu", icon: <Film size={22} />, color: "#FFC107" },
                  { label: "Người dùng mới", value: "47", sub: "+12 so hôm qua", icon: <Users size={22} />, color: "#28A745" },
                ].map((card, i) => (
                  <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div><p style={{ margin: 0, fontSize: 12, color: textMuted }}>{card.label}</p><p style={{ margin: "8px 0 4px", fontSize: 26, fontWeight: 700, color: text }}>{card.value}</p><p style={{ margin: 0, fontSize: 12, color: "#28A745" }}>{card.sub}</p></div>
                      <div style={{ width: 48, height: 48, background: `${card.color}20`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: card.color }}>{card.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div><h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Doanh thu theo thời gian</h3><p style={{ margin: "3px 0 0", fontSize: 12, color: textMuted }}>Đơn vị: triệu đồng</p></div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {(["week", "month"] as const).map(p => (
                        <button key={p} onClick={() => setChartPeriod(p)} style={{ padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, background: chartPeriod === p ? PRIMARY : surface2, color: chartPeriod === p ? "#fff" : textMuted }}>{p === "week" ? "7 ngày" : "6 tháng"}</button>
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
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Top Phim Ăn Khách</h3>
                    <Star size={16} color="#FFC107" fill="#FFC107" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {topMovies.map(m => (
                      <div key={m.rank} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ width: 22, height: 22, background: m.rank === 1 ? "#FFD700" : m.rank === 2 ? "#C0C0C0" : m.rank === 3 ? "#CD7F32" : surface2, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: m.rank <= 3 ? "#fff" : textMuted, flexShrink: 0 }}>{m.rank}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.title}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                            <div style={{ flex: 1, height: 4, background: border, borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${m.fill}%`, height: "100%", background: PRIMARY, borderRadius: 2 }} /></div>
                            <span style={{ fontSize: 11, color: PRIMARY, fontWeight: 600, flexShrink: 0 }}>{m.fill}%</span>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: m.trend.startsWith("+") ? "#28A745" : "#DC3545", fontWeight: 600, flexShrink: 0 }}>{m.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Suất chiếu hôm nay</h3>
                  <button onClick={() => setActiveModule("showtimes")} style={{ background: "none", border: "none", cursor: "pointer", color: PRIMARY, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>Xem tất cả <ArrowUpRight size={14} /></button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Phim", "Phòng", "Giờ chiếu", "Kết thúc", "Lấp đầy"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {showtimes.slice(0, 4).map(st => {
                      const pct = Math.round((st.booked / st.seats) * 100);
                      return (
                        <tr key={st.id} style={{ borderBottom: `1px solid ${border}` }}>
                          <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: text }}>{st.movie}</td>
                          <td style={{ padding: "10px 12px", fontSize: 12, color: textMuted }}>{st.room}</td>
                          <td style={{ padding: "10px 12px" }}><span style={{ background: `${PRIMARY}20`, color: PRIMARY, padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{st.time}</span></td>
                          <td style={{ padding: "10px 12px", fontSize: 12, color: textMuted }}>{st.endTime}</td>
                          <td style={{ padding: "10px 12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 80, height: 6, background: border, borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: pct > 80 ? "#28A745" : pct > 50 ? "#FFC107" : PRIMARY, borderRadius: 3 }} /></div>
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
          )}

          {/* MOVIES */}
          {activeModule === "movies" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Quản lý Phim</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>{movies.length} phim trong hệ thống</p></div>
                <button onClick={() => setShowMovieForm(true)} style={{ padding: "9px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Plus size={16} /> Thêm phim mới</button>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const }}>
                <div style={{ position: "relative" }}>
                  <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                  <input placeholder="Tìm kiếm phim..." style={{ padding: "8px 12px 8px 32px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", width: 220 }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["all", "showing", "upcoming"].map(f => (
                    <button key={f} onClick={() => setMovieFilter(f)} style={{ padding: "7px 14px", background: movieFilter === f ? PRIMARY : surface, border: `1px solid ${movieFilter === f ? PRIMARY : border}`, borderRadius: 8, color: movieFilter === f ? "#fff" : text, cursor: "pointer", fontSize: 13 }}>
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
                    <thead><tr style={{ background: surface2 }}>{["", "Tên phim", "Thể loại", "Thời lượng", "Định dạng", "Trạng thái", "Thao tác"].map(h => <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {movies.filter(m => movieFilter === "all" || (movieFilter === "showing" && m.status === "Đang chiếu") || (movieFilter === "upcoming" && m.status === "Sắp chiếu")).map(movie => (
                        <tr key={movie.id} style={{ borderBottom: `1px solid ${border}` }}>
                          <td style={{ padding: "12px 16px" }}><div style={{ width: 40, height: 56, background: `${PRIMARY}30`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}><Film size={18} color={PRIMARY} /></div></td>
                          <td style={{ padding: "12px 16px" }}><div style={{ fontWeight: 600, fontSize: 13, color: text }}>{movie.title}</div></td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: textMuted }}>{movie.genre}</td>
                          <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 4, color: textMuted, fontSize: 13 }}><Clock size={12} /> {movie.duration}</div></td>
                          <td style={{ padding: "12px 16px" }}><span style={{ background: "#17A2B820", color: "#17A2B8", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{movie.format}</span></td>
                          <td style={{ padding: "12px 16px" }}><span style={{ background: movie.status === "Đang chiếu" ? "#28A74520" : "#FFC10720", color: movie.status === "Đang chiếu" ? "#28A745" : "#FFC107", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{movie.status}</span></td>
                          <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", gap: 6 }}><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: textMuted }}><Eye size={14} /></button><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#17A2B8" }}><Edit size={14} /></button><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#DC3545" }}><Trash2 size={14} /></button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {movies.map(movie => (
                    <div key={movie.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                      <div style={{ height: 140, background: `linear-gradient(135deg, ${PRIMARY}40, #ff6b3540)`, display: "flex", alignItems: "center", justifyContent: "center" }}><Film size={48} color={PRIMARY} /></div>
                      <div style={{ padding: 14 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: text, marginBottom: 6 }}>{movie.title}</div>
                        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 10 }}><span style={{ fontSize: 11, color: textMuted }}>{movie.genre}</span><span style={{ fontSize: 11, color: textMuted }}>· {movie.duration}</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ background: movie.status === "Đang chiếu" ? "#28A74520" : "#FFC10720", color: movie.status === "Đang chiếu" ? "#28A745" : "#FFC107", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{movie.status}</span>
                          <div style={{ display: "flex", gap: 6 }}><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 6px", cursor: "pointer", color: "#17A2B8" }}><Edit size={12} /></button><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 6px", cursor: "pointer", color: "#DC3545" }}><Trash2 size={12} /></button></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SHOWTIMES */}
          {activeModule === "showtimes" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Lịch chiếu</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Quản lý và sắp xếp suất chiếu</p></div>
                <button onClick={() => setShowShowtimeForm(true)} style={{ padding: "9px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Plus size={16} /> Thêm suất chiếu</button>
              </div>

              {/* Calendar */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <button style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: text, display: "flex", alignItems: "center", gap: 4 }}><ChevronLeft size={16} /> Trước</button>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Tháng 3, 2026</h3>
                  <button style={{ background: surface2, border: `1px solid ${border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: text, display: "flex", alignItems: "center", gap: 4 }}>Sau <ChevronRight size={16} /></button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: textMuted, padding: "6px 0" }}>{d}</div>)}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2;
                    const isToday = day === 14;
                    const hasShowtimes = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].includes(day);
                    return (
                      <div key={i} style={{ textAlign: "center", padding: "8px 4px", borderRadius: 8, fontSize: 13, cursor: day > 0 && day <= 31 ? "pointer" : "default", background: isToday ? PRIMARY : "transparent", color: day <= 0 || day > 31 ? border : isToday ? "#fff" : text, position: "relative", fontWeight: isToday ? 700 : 400 }}>
                        {day > 0 && day <= 31 ? day : ""}
                        {hasShowtimes && day > 0 && day <= 31 && !isToday && <div style={{ width: 4, height: 4, background: PRIMARY, borderRadius: "50%", position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)" }} />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Lịch chiếu ngày 14/03/2026</h3>
                  <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                    {[{ color: PRIMARY, label: "IMAX" }, { color: "#17A2B8", label: "3D" }, { color: "#28A745", label: "2D" }].map(l => (
                      <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, background: l.color, borderRadius: 2 }} /><span style={{ color: textMuted }}>{l.label}</span></div>
                    ))}
                  </div>
                </div>
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
                          <div key={si} style={{ position: "absolute", left: `${left}%`, width: `${width}%`, height: "100%", background: `${colors[ri % colors.length]}cc`, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 11, color: "#fff", fontWeight: 600, overflow: "hidden", cursor: "pointer", boxSizing: "border-box" as const }}>
                            {st.movie.split(" ").slice(0, 2).join(" ")} {st.time}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", paddingLeft: 132 }}>
                  {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map(t => <div key={t} style={{ flex: 1, fontSize: 10, color: textMuted, textAlign: "center" }}>{t}</div>)}
                </div>
              </div>

              {/* Table */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Chi tiết suất chiếu</h3>
                  <div style={{ display: "flex", gap: 6 }}><AlertCircle size={14} color="#FFC107" /><span style={{ fontSize: 12, color: "#FFC107" }}>0 xung đột lịch</span></div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: surface2 }}>{["Phim", "Phòng", "Ngày", "Giờ bắt đầu", "Giờ kết thúc", "Ghế trống", "Thao tác"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {showtimes.map(st => (
                      <tr key={st.id} style={{ borderBottom: `1px solid ${border}` }}>
                        <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: text }}>{st.movie}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{st.room}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{st.date}</td>
                        <td style={{ padding: "10px 16px" }}><span style={{ background: `${PRIMARY}20`, color: PRIMARY, padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{st.time}</span></td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{st.endTime}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12 }}><span style={{ color: st.seats - st.booked < 10 ? "#DC3545" : "#28A745", fontWeight: 600 }}>{st.seats - st.booked}</span><span style={{ color: textMuted }}> / {st.seats}</span></td>
                        <td style={{ padding: "10px 16px" }}><div style={{ display: "flex", gap: 6 }}><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#17A2B8" }}><Edit size={13} /></button><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#DC3545" }}><Trash2 size={13} /></button></div></td>
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
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Sơ đồ Phòng chiếu</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Chọn ghế để chỉnh giá · Phòng {selectedRoom}</p></div>
                <div style={{ display: "flex", gap: 10 }}>
                  {selectedSeats.length > 0 && (
                    <button
                      onClick={() => setShowPricePanel(true)}
                      style={{ padding: "9px 16px", background: "#FFC107", border: "none", borderRadius: 8, color: "#000", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <DollarSign size={15} /> Đặt giá ({selectedSeats.length} ghế)
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedSeats([])}
                    style={{ padding: "9px 14px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <X size={14} /> Bỏ chọn
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
                {/* Left: room list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 16 }}>
                    <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: textMuted, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>Danh sách phòng</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {[{ id: 1, name: "Phòng 1", sub: "IMAX · 180 ghế", color: "#17A2B8" }, { id: 2, name: "Phòng 2", sub: "3D · 120 ghế", color: "#28A745" }, { id: 3, name: "Phòng 3", sub: "2D · 150 ghế", color: "#6b7280" }, { id: 4, name: "Phòng 4", sub: "2D · 100 ghế", color: "#6b7280" }, { id: 5, name: "Phòng 5", sub: "VIP · 80 ghế", color: "#FFC107" }].map(room => (
                        <button key={room.id} onClick={() => { setSelectedRoom(room.id); setSelectedSeats([]); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: `1px solid ${selectedRoom === room.id ? PRIMARY : border}`, background: selectedRoom === room.id ? `${PRIMARY}15` : "transparent", cursor: "pointer", textAlign: "left" as const }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: room.color, flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: selectedRoom === room.id ? PRIMARY : text }}>{room.name}</div>
                            <div style={{ fontSize: 11, color: textMuted }}>{room.sub}</div>
                          </div>
                          {selectedRoom === room.id && <ChevronRight size={13} color={PRIMARY} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price table */}
                  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: textMuted, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>Giá vé hiện tại</h3>
                      <button onClick={() => setShowPricePanel(true)} style={{ fontSize: 11, color: PRIMARY, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Sửa</button>
                    </div>
                    {[
                      { label: "Ghế thường", price: seatPrices.normal, color: "#28A745" },
                      { label: "Ghế VIP", price: seatPrices.vip, color: "#FFC107" },
                      { label: "Sweetbox", price: seatPrices.sweetbox, color: PRIMARY },
                    ].map(p => (
                      <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${border}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
                          <span style={{ fontSize: 12, color: textMuted }}>{p.label}</span>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.price}đ</span>
                      </div>
                    ))}
                    {priceApplied && (
                      <div style={{ marginTop: 10, padding: "6px 10px", background: "#28A74520", border: "1px solid #28A74540", borderRadius: 6, display: "flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle2 size={12} color="#28A745" /><span style={{ fontSize: 11, color: "#28A745" }}>Đã cập nhật giá</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: seat map */}
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                  {/* Legend + selection info */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 14, fontSize: 11 }}>
                      {[
                        { bg: "#28A74520", b: "#28A745", label: "Trống" },
                        { bg: "#2a2a2e", b: "#6b7280", label: "Đã đặt" },
                        { bg: "#FFC10725", b: "#FFC107", label: "VIP" },
                        { bg: `${PRIMARY}22`, b: PRIMARY, label: "Sweetbox" },
                        { bg: "#6366f125", b: "#6366f1", label: "Đang chọn" },
                      ].map(s => (
                        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 13, height: 13, background: s.bg, border: `1.5px solid ${s.b}`, borderRadius: 3 }} />
                          <span style={{ color: textMuted }}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                    {selectedSeats.length > 0 && (
                      <div style={{ padding: "5px 12px", background: "#6366f120", border: "1px solid #6366f140", borderRadius: 20, fontSize: 12, color: "#a5b4fc", fontWeight: 600 }}>
                        {selectedSeats.length} ghế đang chọn
                      </div>
                    )}
                  </div>

                  {/* Screen */}
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ height: 6, background: `linear-gradient(90deg, transparent 0%, ${textMuted}50 20%, ${textMuted}80 50%, ${textMuted}50 80%, transparent 100%)`, borderRadius: 4, marginBottom: 6, maxWidth: 500, margin: "0 auto 6px" }} />
                    <div style={{ fontSize: 10, color: textMuted, letterSpacing: 3, textTransform: "uppercase" as const }}>Màn hình</div>
                  </div>

                  {/* Seat grid */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
                    {seatMap.map((row, ri) => (
                      <div key={ri} style={{ display: "flex", gap: 3, alignItems: "center" }}>
                        <span style={{ width: 20, fontSize: 11, color: textMuted, textAlign: "right" as const, flexShrink: 0, fontWeight: 600 }}>{String.fromCharCode(65 + ri)}</span>
                        <div style={{ width: 8 }} />
                        {row.map(seat => {
                          const isSelected = selectedSeats.includes(seat.id);
                          const isBooked = seat.status === "booked";
                          let bg: string, bd: string;
                          if (isSelected) { bg = "#6366f125"; bd = "#6366f1"; }
                          else if (isBooked) { bg = "#2a2a2e"; bd = "#6b7280"; }
                          else if (seat.type === "vip") { bg = "#FFC10725"; bd = "#FFC107"; }
                          else if (seat.type === "sweetbox") { bg = `${PRIMARY}22`; bd = PRIMARY; }
                          else { bg = "#28A74520"; bd = "#28A745"; }
                          return (
                            <div
                              key={seat.id}
                              title={`${seat.id} · ${seat.type === "vip" ? "VIP" : seat.type === "sweetbox" ? "Sweetbox" : "Thường"}`}
                              onClick={() => {
                                if (isBooked) return;
                                setSelectedSeats(prev =>
                                  isSelected ? prev.filter(s => s !== seat.id) : [...prev, seat.id]
                                );
                              }}
                              style={{
                                width: seat.type === "sweetbox" ? 28 : 22,
                                height: 18,
                                background: bg,
                                border: `1.5px solid ${bd}`,
                                borderRadius: 4,
                                cursor: isBooked ? "not-allowed" : "pointer",
                                transition: "transform 0.1s",
                                transform: isSelected ? "scale(1.15)" : "scale(1)",
                                boxShadow: isSelected ? `0 0 6px ${bd}80` : "none",
                              }}
                            />
                          );
                        })}
                        <div style={{ width: 8 }} />
                        <span style={{ width: 20, fontSize: 11, color: textMuted, flexShrink: 0, fontWeight: 600 }}>{String.fromCharCode(65 + ri)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Row labels: type callouts */}
                  <div style={{ marginTop: 14, display: "flex", gap: 10, justifyContent: "center", fontSize: 11 }}>
                    <span style={{ color: "#FFC107" }}>Hàng A–B: VIP</span>
                    <span style={{ color: textMuted }}>·</span>
                    <span style={{ color: "#c4c4c8" }}>Hàng C–F: Thường</span>
                    <span style={{ color: textMuted }}>·</span>
                    <span style={{ color: PRIMARY }}>Hàng G–H: Sweetbox</span>
                  </div>

                  {/* Action bar */}
                  <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: `1px solid ${border}` }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { const all = seatMap.flat().filter(s => s.status === "available").map(s => s.id); setSelectedSeats(all); }} style={{ padding: "7px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 12 }}>Chọn tất cả</button>
                      <button onClick={() => setSelectedSeats(seatMap.flat().filter(s => s.type === "vip" && s.status === "available").map(s => s.id))} style={{ padding: "7px 12px", background: "#FFC10715", border: "1px solid #FFC10740", borderRadius: 8, color: "#FFC107", cursor: "pointer", fontSize: 12 }}>Chọn VIP</button>
                      <button onClick={() => setSelectedSeats(seatMap.flat().filter(s => s.type === "sweetbox" && s.status === "available").map(s => s.id))} style={{ padding: "7px 12px", background: `${PRIMARY}15`, border: `1px solid ${PRIMARY}40`, borderRadius: 8, color: PRIMARY, cursor: "pointer", fontSize: 12 }}>Chọn Sweetbox</button>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setSelectedSeats([])} style={{ padding: "8px 14px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13 }}>Đặt lại</button>
                      <button
                        onClick={() => { if (selectedSeats.length > 0) setShowPricePanel(true); }}
                        style={{ padding: "8px 16px", background: selectedSeats.length > 0 ? "#FFC107" : surface2, border: "none", borderRadius: 8, color: selectedSeats.length > 0 ? "#000" : textMuted, cursor: selectedSeats.length > 0 ? "pointer" : "default", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
                      >
                        <DollarSign size={14} /> Đặt lại giá vé
                      </button>
                      <button style={{ padding: "8px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                        <Save size={14} /> Lưu sơ đồ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Price Panel Modal */}
          {showPricePanel && (
            <Modal title={`Đặt lại giá vé — ${selectedSeats.length} ghế đã chọn`} onClose={() => setShowPricePanel(false)}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Selected seats display */}
                <div style={{ background: "#1e1e21", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#8b8b8f", marginBottom: 10 }}>Ghế đang chỉnh giá</div>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                    {selectedSeats.slice(0, 24).map(s => (
                      <span key={s} style={{ background: "#6366f120", border: "1px solid #6366f140", color: "#a5b4fc", padding: "2px 8px", borderRadius: 5, fontSize: 12, fontFamily: "monospace" }}>{s}</span>
                    ))}
                    {selectedSeats.length > 24 && <span style={{ color: "#8b8b8f", fontSize: 12 }}>+{selectedSeats.length - 24} ghế nữa</span>}
                  </div>
                </div>

                {/* Price inputs */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f1f1" }}>Cập nhật giá theo loại ghế</div>
                  {[
                    { key: "normal" as const, label: "Ghế thường", desc: "Hàng C–F", color: "#28A745", icon: "🪑" },
                    { key: "vip" as const, label: "Ghế VIP", desc: "Hàng A–B", color: "#FFC107", icon: "⭐" },
                    { key: "sweetbox" as const, label: "Ghế Sweetbox (Đôi)", desc: "Hàng G–H", color: PRIMARY, icon: "💑" },
                  ].map(p => (
                    <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: `${p.color}10`, border: `1px solid ${p.color}30`, borderRadius: 10 }}>
                      <div style={{ fontSize: 22 }}>{p.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f1f1" }}>{p.label}</div>
                        <div style={{ fontSize: 11, color: "#8b8b8f", marginTop: 1 }}>{p.desc}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input
                          value={seatPrices[p.key]}
                          onChange={e => setSeatPrices(prev => ({ ...prev, [p.key]: e.target.value }))}
                          style={{ width: 100, padding: "8px 10px", background: "#1e1e21", border: `1px solid ${p.color}60`, borderRadius: 8, color: p.color, fontSize: 14, fontWeight: 700, outline: "none", textAlign: "right" as const }}
                        />
                        <span style={{ fontSize: 12, color: "#8b8b8f" }}>đ</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick presets */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#8b8b8f", marginBottom: 8 }}>Mẫu giá nhanh</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { label: "Ngày thường", prices: { normal: "95.000", vip: "150.000", sweetbox: "280.000" } },
                      { label: "Cuối tuần", prices: { normal: "120.000", vip: "180.000", sweetbox: "320.000" } },
                      { label: "Ngày lễ", prices: { normal: "140.000", vip: "210.000", sweetbox: "380.000" } },
                    ].map(preset => (
                      <button key={preset.label} onClick={() => setSeatPrices(preset.prices)} style={{ flex: 1, padding: "8px", background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 8, color: "#c4c4c8", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>{preset.label}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
                  <button onClick={() => setShowPricePanel(false)} style={{ padding: "9px 18px", background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 8, color: "#f1f1f1", cursor: "pointer", fontSize: 13 }}>Hủy</button>
                  <button onClick={() => { setShowPricePanel(false); setPriceApplied(true); setTimeout(() => setPriceApplied(false), 3000); }} style={{ padding: "9px 18px", background: "#FFC107", border: "none", borderRadius: 8, color: "#000", cursor: "pointer", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={15} /> Áp dụng giá mới
                  </button>
                </div>
              </div>
            </Modal>
          )}

          {/* TICKETS */}
          {activeModule === "tickets" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Quản lý Vé & Giao dịch</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Tra cứu và quản lý vé đặt chỗ</p></div>
                <button style={{ padding: "9px 16px", background: "#28A745", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Download size={16} /> Xuất Excel</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[{ label: "Đã thanh toán", value: "856", color: "#28A745", icon: <CheckCircle2 size={18} /> }, { label: "Đã check-in", value: "234", color: "#17A2B8", icon: <QrCode size={18} /> }, { label: "Chờ thanh toán", value: "48", color: "#FFC107", icon: <Clock size={18} /> }, { label: "Đã hủy", value: "23", color: "#DC3545", icon: <XCircle size={18} /> }].map(s => (
                  <div key={s.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: `${s.color}20`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
                    <div><div style={{ fontSize: 20, fontWeight: 700, color: text }}>{s.value}</div><div style={{ fontSize: 11, color: textMuted }}>{s.label}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                  <input value={ticketSearch} onChange={e => setTicketSearch(e.target.value)} placeholder="Tìm theo mã vé, SĐT hoặc tên khách hàng..." style={{ width: "100%", padding: "10px 12px 10px 36px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" as const }} />
                </div>
                <button style={{ padding: "10px 16px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Filter size={14} /> Bộ lọc</button>
                <div style={{ position: "relative" }}>
                  <QrCode size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                  <input placeholder="Quét mã QR..." style={{ padding: "10px 12px 10px 34px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", width: 180 }} />
                </div>
              </div>
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: surface2 }}>{["Mã vé", "Khách hàng", "SĐT", "Phim", "Ghế ngồi", "Số tiền", "Trạng thái", "Giờ đặt", "Thao tác"].map(h => <th key={h} style={{ textAlign: "left", padding: "11px 14px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {tickets.filter(t => !ticketSearch || t.id.includes(ticketSearch) || t.phone.includes(ticketSearch) || t.customer.toLowerCase().includes(ticketSearch.toLowerCase())).map(ticket => {
                      const sc = statusConfig[ticket.status];
                      return (
                        <tr key={ticket.id} style={{ borderBottom: `1px solid ${border}` }}>
                          <td style={{ padding: "10px 14px" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><QrCode size={14} color={textMuted} /><span style={{ fontSize: 12, fontFamily: "monospace", color: PRIMARY, fontWeight: 600 }}>{ticket.id}</span></div></td>
                          <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 500, color: text }}>{ticket.customer}</td>
                          <td style={{ padding: "10px 14px", fontSize: 12, color: textMuted }}>{ticket.phone}</td>
                          <td style={{ padding: "10px 14px", fontSize: 12, color: text, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{ticket.movie}</td>
                          <td style={{ padding: "10px 14px" }}><span style={{ background: `${PRIMARY}15`, color: PRIMARY, padding: "2px 7px", borderRadius: 5, fontSize: 12, fontFamily: "monospace" }}>{ticket.seat}</span></td>
                          <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: text }}>{ticket.amount}</td>
                          <td style={{ padding: "10px 14px" }}><span style={{ background: sc?.bg, color: sc?.color, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{ticket.status}</span></td>
                          <td style={{ padding: "10px 14px", fontSize: 12, color: textMuted }}>{ticket.time}</td>
                          <td style={{ padding: "10px 14px" }}><div style={{ display: "flex", gap: 5 }}><button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 5, padding: "4px 7px", cursor: "pointer", color: textMuted }}><Eye size={12} /></button>{ticket.status === "Chờ thanh toán" && <button style={{ background: "none", border: "1px solid #28A745", borderRadius: 5, padding: "4px 7px", cursor: "pointer", color: "#28A745", fontSize: 11 }}>✓</button>}</div></td>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Người dùng</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Quản lý tài khoản khách hàng · 6 người dùng</p></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ position: "relative" }}>
                    <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                    <input placeholder="Tìm người dùng..." style={{ padding: "8px 12px 8px 30px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", width: 200 }} />
                  </div>
                  <button onClick={() => setShowUserForm(true)} style={{ padding: "9px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><UserPlus size={16} /> Thêm người dùng</button>
                </div>
              </div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[{ label: "Tổng người dùng", value: "4.821", color: "#17A2B8" }, { label: "Mới tháng này", value: "247", color: "#28A745" }, { label: "Người dùng VIP", value: "312", color: "#FFC107" }, { label: "Đã vô hiệu hóa", value: "18", color: "#DC3545" }].map(s => (
                  <div key={s.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "14px 18px" }}>
                    <div style={{ fontSize: 11, color: textMuted, marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {[
                  { name: "Nguyễn Văn A", email: "nva@email.com", tickets: 12, spent: "1.420.000đ", joined: "01/2025", avatar: "N", role: "Thành viên" },
                  { name: "Trần Thị B", email: "ttb@email.com", tickets: 8, spent: "960.000đ", joined: "02/2025", avatar: "T", role: "Thành viên" },
                  { name: "Lê Minh C", email: "lmc@email.com", tickets: 21, spent: "2.640.000đ", joined: "12/2024", avatar: "L", role: "VIP" },
                  { name: "Phạm Thị D", email: "ptd@email.com", tickets: 5, spent: "580.000đ", joined: "03/2025", avatar: "P", role: "Thành viên" },
                  { name: "Hoàng Văn E", email: "hve@email.com", tickets: 15, spent: "1.850.000đ", joined: "11/2024", avatar: "H", role: "VIP" },
                  { name: "Vũ Thị F", email: "vtf@email.com", tickets: 3, spent: "360.000đ", joined: "03/2026", avatar: "V", role: "Mới" },
                ].map((user, i) => (
                  <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${PRIMARY}, #ff6b35)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>{user.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: text }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: textMuted }}>{user.email}</div>
                      </div>
                      <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: user.role === "VIP" ? "#FFC10720" : user.role === "Mới" ? "#17A2B820" : `${PRIMARY}20`, color: user.role === "VIP" ? "#FFC107" : user.role === "Mới" ? "#17A2B8" : PRIMARY }}>{user.role}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div style={{ background: surface2, borderRadius: 8, padding: "10px 12px" }}><div style={{ fontSize: 11, color: textMuted, marginBottom: 3 }}>Số vé đã mua</div><div style={{ fontSize: 18, fontWeight: 700, color: PRIMARY }}>{user.tickets}</div></div>
                      <div style={{ background: surface2, borderRadius: 8, padding: "10px 12px" }}><div style={{ fontSize: 11, color: textMuted, marginBottom: 3 }}>Tổng chi tiêu</div><div style={{ fontSize: 14, fontWeight: 700, color: text }}>{user.spent}</div></div>
                    </div>
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: textMuted }}>Thành viên từ {user.joined}</span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#17A2B8" }}><Edit size={12} /></button>
                        <button style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#DC3545" }}><Trash2 size={12} /></button>
                      </div>
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
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Báo cáo & Phân tích</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Thống kê kinh doanh chi tiết</p></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <select style={{ padding: "8px 12px", background: surface, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none" }}><option>Tháng 3/2026</option><option>Tháng 2/2026</option><option>Tháng 1/2026</option></select>
                  <button style={{ padding: "9px 16px", background: "#28A745", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Download size={16} /> Xuất Excel</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {[{ label: "Tổng doanh thu tháng", value: "824 tr đ", sub: "+23% tháng trước", color: PRIMARY }, { label: "Tổng vé bán ra", value: "12.480", sub: "Trung bình 403/ngày", color: "#17A2B8" }, { label: "Tỷ lệ lấp đầy TB", value: "78.4%", sub: "Mục tiêu: 80%", color: "#FFC107" }, { label: "Doanh thu / Ghế", value: "66.100đ", sub: "+8% tháng trước", color: "#28A745" }].map(c => (
                  <div key={c.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 18 }}><div style={{ fontSize: 12, color: textMuted, marginBottom: 8 }}>{c.label}</div><div style={{ fontSize: 24, fontWeight: 700, color: c.color, marginBottom: 4 }}>{c.value}</div><div style={{ fontSize: 12, color: "#28A745" }}>{c.sub}</div></div>
                ))}
              </div>
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
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${border}` }}><h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Doanh thu theo phim</h3></div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: surface2 }}>{["#", "Tên phim", "Thể loại", "Số suất chiếu", "Vé bán", "Tỷ lệ lấp đầy", "Doanh thu"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 12, color: textMuted, fontWeight: 600, borderBottom: `1px solid ${border}` }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {topMovies.map(m => (
                      <tr key={m.rank} style={{ borderBottom: `1px solid ${border}` }}>
                        <td style={{ padding: "10px 16px" }}><span style={{ width: 22, height: 22, background: m.rank <= 3 ? ["#FFD700", "#C0C0C0", "#CD7F32"][m.rank - 1] : surface2, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: m.rank <= 3 ? "#000" : textMuted }}>{m.rank}</span></td>
                        <td style={{ padding: "10px 16px", fontWeight: 600, fontSize: 13, color: text }}>{m.title}</td>
                        <td style={{ padding: "10px 16px", fontSize: 12, color: textMuted }}>{m.genre}</td>
                        <td style={{ padding: "10px 16px", fontSize: 13, color: text }}>{24 - m.rank * 2}</td>
                        <td style={{ padding: "10px 16px", fontSize: 13, color: text }}>{m.tickets.toLocaleString()}</td>
                        <td style={{ padding: "10px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 70, height: 6, background: border, borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${m.fill}%`, height: "100%", background: m.fill > 80 ? "#28A745" : m.fill > 60 ? "#FFC107" : PRIMARY, borderRadius: 3 }} /></div><span style={{ fontSize: 12, fontWeight: 600, color: m.fill > 80 ? "#28A745" : text }}>{m.fill}%</span></div></td>
                        <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 700, color: PRIMARY }}>{(m.tickets * 120 / 1000).toFixed(0)} tr đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ADMIN PROFILE ── */}
          {activeModule === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Trang cá nhân</h1><p style={{ margin: "4px 0 0", color: textMuted, fontSize: 13 }}>Quản lý thông tin và bảo mật tài khoản</p></div>
              </div>

              {/* Profile header card */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ height: 120, background: `linear-gradient(135deg, ${PRIMARY}, #b00710 40%, #ff6b35)`, position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                </div>
                <div style={{ padding: "0 28px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
                    <div style={{ position: "relative", marginTop: -40 }}>
                      <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #E50914, #ff6b35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "#fff", border: `4px solid ${surface}` }}>A</div>
                      <button style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, background: PRIMARY, border: `2px solid ${surface}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Camera size={13} color="#fff" />
                      </button>
                    </div>
                    <button style={{ padding: "8px 16px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Save size={14} /> Lưu thay đổi</button>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: text }}>Nguyễn Admin</div>
                    <div style={{ fontSize: 13, color: textMuted, marginTop: 2 }}>Super Admin · CineAdmin System</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                      <span style={{ background: "#28A74520", color: "#28A745", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>● Đang hoạt động</span>
                      <span style={{ fontSize: 12, color: textMuted, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} /> Hà Nội, Việt Nam</span>
                      <span style={{ fontSize: 12, color: textMuted, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> Đăng nhập lúc 07:30 hôm nay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two-column layout */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Personal info */}
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 22 }}>
                  <h3 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}><UserCircle size={16} color={PRIMARY} /> Thông tin cá nhân</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[{ label: "Họ và tên", val: "Nguyễn Admin", icon: <UserCircle size={14} /> }, { label: "Email", val: "admin@cineadmin.vn", icon: <Mail size={14} /> }, { label: "Số điện thoại", val: "0901 234 567", icon: <Phone size={14} /> }, { label: "Địa chỉ", val: "Hà Nội, Việt Nam", icon: <MapPin size={14} /> }].map(f => (
                      <div key={f.label}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>{f.label}</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8 }}>
                          <span style={{ color: textMuted }}>{f.icon}</span>
                          <span style={{ fontSize: 13, color: text }}>{f.val}</span>
                        </div>
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Ngày sinh</label>
                      <input type="date" defaultValue="1990-05-15" style={{ width: "100%", padding: "9px 12px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                  </div>
                </div>

                {/* Security + Activity */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Security */}
                  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 22 }}>
                    <h3 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}><Shield size={16} color={PRIMARY} /> Bảo mật tài khoản</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Mật khẩu hiện tại</label>
                        <div style={{ position: "relative" }}>
                          <Key size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                          <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "9px 12px 9px 32px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" as const }} />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6 }}>Mật khẩu mới</label>
                        <div style={{ position: "relative" }}>
                          <Key size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
                          <input type="password" placeholder="Nhập mật khẩu mới..." style={{ width: "100%", padding: "9px 12px 9px 32px", background: surface2, border: `1px solid ${border}`, borderRadius: 8, color: text, fontSize: 13, outline: "none", boxSizing: "border-box" as const }} />
                        </div>
                      </div>
                      <button style={{ padding: "9px", background: `${PRIMARY}20`, border: `1px solid ${PRIMARY}40`, borderRadius: 8, color: PRIMARY, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Đổi mật khẩu</button>
                    </div>
                    {/* 2FA */}
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: text }}>Xác thực 2 bước (2FA)</div>
                        <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>Bảo vệ tài khoản với mã OTP</div>
                      </div>
                      <div style={{ width: 44, height: 24, background: "#28A745", borderRadius: 12, position: "relative", cursor: "pointer" }}>
                        <div style={{ width: 18, height: 18, background: "#fff", borderRadius: "50%", position: "absolute", top: 3, right: 4, transition: "right 0.2s" }} />
                      </div>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 22 }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>Hoạt động gần đây</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { action: "Đăng nhập từ Chrome · Hà Nội", time: "Hôm nay, 07:30", status: "ok" },
                        { action: "Thêm suất chiếu phim Avengers", time: "Hôm qua, 14:22", status: "ok" },
                        { action: "Xuất báo cáo doanh thu Tháng 2", time: "13/03, 09:15", status: "ok" },
                        { action: "Đăng nhập thất bại (sai mật khẩu)", time: "12/03, 23:41", status: "warn" },
                      ].map((a, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${border}` : "none" }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.status === "ok" ? "#28A745" : "#FFC107", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: text }}>{a.action}</div><div style={{ fontSize: 11, color: textMuted, marginTop: 1 }}>{a.time}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 22 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}><Shield size={16} color={PRIMARY} /> Quyền hạn tài khoản</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {[
                    { label: "Quản lý phim", granted: true }, { label: "Quản lý lịch chiếu", granted: true },
                    { label: "Quản lý phòng chiếu", granted: true }, { label: "Xem báo cáo tài chính", granted: true },
                    { label: "Quản lý người dùng", granted: true }, { label: "Xuất dữ liệu", granted: true },
                    { label: "Cài đặt hệ thống", granted: true }, { label: "Quản lý admin khác", granted: false },
                  ].map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: surface2, borderRadius: 8, border: `1px solid ${p.granted ? "#28A74530" : border}` }}>
                      {p.granted ? <CheckCircle2 size={15} color="#28A745" /> : <XCircle size={15} color="#6b7280" />}
                      <span style={{ fontSize: 12, color: p.granted ? text : textMuted }}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── MODALS ── */}

      {/* Add Movie Modal */}
      {showMovieForm && (
        <Modal title="Thêm phim mới" onClose={() => setShowMovieForm(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[{ label: "Tên phim", placeholder: "Nhập tên phim..." }, { label: "Đạo diễn", placeholder: "Tên đạo diễn..." }, { label: "Diễn viên chính", placeholder: "Tên các diễn viên..." }].map(f => (
              <FieldRow key={f.label} label={f.label}><input placeholder={f.placeholder} style={inputStyle} /></FieldRow>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FieldRow label="Thể loại"><select style={selectStyle}><option>Hành động</option><option>Hoạt hình</option><option>Kinh dị</option><option>Tình cảm</option></select></FieldRow>
              <FieldRow label="Định dạng"><select style={selectStyle}><option>2D</option><option>3D</option><option>IMAX</option></select></FieldRow>
              <FieldRow label="Thời lượng (phút)"><input type="number" placeholder="120" style={inputStyle} /></FieldRow>
              <FieldRow label="Giới hạn tuổi"><select style={selectStyle}><option>P (Mọi lứa tuổi)</option><option>T13</option><option>T16</option><option>T18</option></select></FieldRow>
            </div>
            <FieldRow label="Trailer YouTube"><input placeholder="https://youtube.com/watch?v=..." style={inputStyle} /></FieldRow>
            <FieldRow label="Mô tả"><textarea rows={3} placeholder="Mô tả cốt truyện..." style={{ ...inputStyle, resize: "none" as const }} /></FieldRow>
            <FieldRow label="Upload Poster">
              <div style={{ border: "2px dashed #2a2a2e", borderRadius: 8, padding: "20px", textAlign: "center", cursor: "pointer", color: "#8b8b8f" }}><Film size={24} style={{ marginBottom: 6 }} /><div style={{ fontSize: 12 }}>Kéo thả hoặc click để upload</div><div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG tối đa 5MB</div></div>
            </FieldRow>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button onClick={() => setShowMovieForm(false)} style={{ padding: "9px 18px", background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 8, color: "#f1f1f1", cursor: "pointer", fontSize: 13 }}>Hủy</button>
              <button style={{ padding: "9px 18px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Lưu phim</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Showtime Modal */}
      {showShowtimeForm && (
        <Modal title="Thêm suất chiếu mới" onClose={() => setShowShowtimeForm(false)} wide>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Conflict warning banner */}
            <div style={{ background: "#FFC10720", border: "1px solid #FFC10740", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <AlertCircle size={15} color="#FFC107" />
              <span style={{ fontSize: 12, color: "#FFC107" }}>Hệ thống sẽ tự động kiểm tra xung đột lịch chiếu trước khi lưu.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <FieldRow label="Phim *">
                <select style={selectStyle}>
                  <option value="">-- Chọn phim --</option>
                  {movies.map(m => <option key={m.id}>{m.title}</option>)}
                </select>
              </FieldRow>
              <FieldRow label="Phòng chiếu *">
                <select style={selectStyle}>
                  <option>Phòng 1 (IMAX · 180 ghế)</option>
                  <option>Phòng 2 (3D · 120 ghế)</option>
                  <option>Phòng 3 (2D · 150 ghế)</option>
                  <option>Phòng 4 (2D · 100 ghế)</option>
                  <option>Phòng 5 (VIP · 80 ghế)</option>
                </select>
              </FieldRow>
              <FieldRow label="Ngày chiếu *">
                <input type="date" defaultValue="2026-03-15" style={inputStyle} />
              </FieldRow>
              <FieldRow label="Giờ bắt đầu *">
                <input type="time" defaultValue="10:00" style={inputStyle} />
              </FieldRow>
              <FieldRow label="Ngôn ngữ">
                <select style={selectStyle}><option>Lồng tiếng Việt</option><option>Phụ đề Việt</option><option>Nguyên gốc</option></select>
              </FieldRow>
              <FieldRow label="Định dạng chiếu">
                <select style={selectStyle}><option>2D</option><option>3D</option><option>IMAX</option><option>4DX</option></select>
              </FieldRow>
            </div>
            {/* Pricing override */}
            <div style={{ background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f1f1", marginBottom: 12 }}>Giá vé cho suất chiếu này</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[{ label: "Ghế thường", default: "95.000" }, { label: "Ghế VIP", default: "150.000" }, { label: "Ghế Sweetbox", default: "280.000" }].map(p => (
                  <div key={p.label}>
                    <label style={{ fontSize: 11, color: "#8b8b8f", display: "block", marginBottom: 5 }}>{p.label}</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <input defaultValue={p.default} style={{ ...inputStyle, textAlign: "right" as const }} />
                      <span style={{ fontSize: 12, color: "#8b8b8f", flexShrink: 0 }}>đ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Estimated end time */}
            <div style={{ background: `${PRIMARY}15`, border: `1px solid ${PRIMARY}30`, borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#c4c4c8" }}>Thời gian kết thúc dự kiến (gồm 15 phút dọn dẹp)</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: PRIMARY }}>12:13</span>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button onClick={() => setShowShowtimeForm(false)} style={{ padding: "9px 18px", background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 8, color: "#f1f1f1", cursor: "pointer", fontSize: 13 }}>Hủy</button>
              <button style={{ padding: "9px 18px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><CheckCircle2 size={15} /> Kiểm tra & Lưu</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add User Modal */}
      {showUserForm && (
        <Modal title="Thêm người dùng mới" onClose={() => setShowUserForm(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, #E50914, #ff6b35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                <UserPlus size={28} color="#fff" />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, background: "#1e1e21", border: "2px solid #2a2a2e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><Camera size={11} color="#8b8b8f" /></div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FieldRow label="Họ và tên *"><input placeholder="Nguyễn Văn A" style={inputStyle} /></FieldRow>
              <FieldRow label="Số điện thoại *">
                <div style={{ position: "relative" }}>
                  <Phone size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#8b8b8f" }} />
                  <input placeholder="0901 234 567" style={{ ...inputStyle, paddingLeft: 30 }} />
                </div>
              </FieldRow>
              <FieldRow label="Email *">
                <div style={{ position: "relative" }}>
                  <Mail size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#8b8b8f" }} />
                  <input type="email" placeholder="email@example.com" style={{ ...inputStyle, paddingLeft: 30 }} />
                </div>
              </FieldRow>
              <FieldRow label="Ngày sinh">
                <input type="date" style={inputStyle} />
              </FieldRow>
              <FieldRow label="Vai trò">
                <select style={selectStyle}><option>Thành viên</option><option>VIP</option><option>Admin</option></select>
              </FieldRow>
              <FieldRow label="Trạng thái">
                <select style={selectStyle}><option>Hoạt động</option><option>Vô hiệu hóa</option></select>
              </FieldRow>
            </div>
            <FieldRow label="Mật khẩu tạm thời *">
              <div style={{ position: "relative" }}>
                <Key size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#8b8b8f" }} />
                <input type="password" placeholder="Nhập mật khẩu..." style={{ ...inputStyle, paddingLeft: 30 }} />
              </div>
            </FieldRow>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "#28A74510", border: "1px solid #28A74530", borderRadius: 8 }}>
              <input type="checkbox" id="sendEmail" defaultChecked style={{ accentColor: PRIMARY }} />
              <label htmlFor="sendEmail" style={{ fontSize: 12, color: "#c4c4c8", cursor: "pointer" }}>Gửi email thông báo kích hoạt tài khoản cho người dùng</label>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button onClick={() => setShowUserForm(false)} style={{ padding: "9px 18px", background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 8, color: "#f1f1f1", cursor: "pointer", fontSize: 13 }}>Hủy</button>
              <button style={{ padding: "9px 18px", background: PRIMARY, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><UserPlus size={14} /> Tạo tài khoản</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Logout confirm */}
      {showLogoutConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "#000000b0", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#161618", border: "1px solid #2a2a2e", borderRadius: 16, padding: 32, width: 380, textAlign: "center" }}>
            <div style={{ width: 64, height: 64, background: "#DC354520", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <LogOut size={28} color="#DC3545" />
            </div>
            <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700, color: "#f1f1f1" }}>Đăng xuất khỏi hệ thống?</h3>
            <p style={{ margin: "0 0 24px", fontSize: 13, color: "#8b8b8f", lineHeight: 1.6 }}>Bạn có chắc chắn muốn đăng xuất?<br />Mọi phiên làm việc chưa lưu sẽ bị mất.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: "10px 24px", background: "#1e1e21", border: "1px solid #2a2a2e", borderRadius: 8, color: "#f1f1f1", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Huỷ bỏ</button>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: "10px 24px", background: "#DC3545", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><LogOut size={14} /> Đăng xuất</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
