/**
 * FindMyClass — Campus Classroom & Location Navigator
 * Modern, responsive vanilla JavaScript navigation logic.
 */

// ==========================================================================
// 1. Campus Locations Dataset
// ==========================================================================
const CAMPUS_LOCATIONS = [
  {
    id: "loc-1",
    name: "CSE Lab",
    category: "Laboratory",
    block: "Block B",
    floor: "2nd Floor",
    room: "B-204",
    description: "Computer Science practical laboratory equipped with high-end workstations and Linux environments.",
    icon: "💻",
    directions: "Enter Block B, proceed up the main staircase to the 2nd Floor, turn right. Located across from the Network Systems Lab.",
    timings: "08:30 AM - 05:30 PM (Mon-Sat)",
    landmark: "Water cooler & Block B Staircase A",
    popular: true
  },
  {
    id: "loc-2",
    name: "Computer Science Classroom",
    category: "Classroom",
    block: "Block B",
    floor: "1st Floor",
    room: "B-102",
    description: "Smart lecture hall with projector facilities and tiered seating for Computer Science lectures.",
    icon: "🖥️",
    directions: "First floor of Block B, direct left from the eastern elevator entrance.",
    timings: "09:00 AM - 04:30 PM (Mon-Fri)",
    landmark: "Adjacent to Faculty Room B-101",
    popular: false
  },
  {
    id: "loc-3",
    name: "Electronics Lab",
    category: "Laboratory",
    block: "Block C",
    floor: "Ground Floor",
    room: "C-005",
    description: "Digital electronics and VLSI hardware testing lab with oscilloscopes and circuit design kits.",
    icon: "⚡",
    directions: "Block C ground level corridor, second door on the left past the main foyer.",
    timings: "09:00 AM - 05:00 PM (Mon-Sat)",
    landmark: "Near Block C East Entrance",
    popular: false
  },
  {
    id: "loc-4",
    name: "Mechanical Lab",
    category: "Laboratory",
    block: "Block C",
    floor: "Ground Floor",
    room: "C-010",
    description: "Heavy machinery, thermodynamics testing setups, and lathe workshops for mechanical engineering.",
    icon: "⚙️",
    directions: "Rear wing of Block C, access via the workshop courtyard ramp.",
    timings: "08:30 AM - 04:30 PM (Mon-Fri)",
    landmark: "Facing Central Workshop Bay",
    popular: false
  },
  {
    id: "loc-5",
    name: "Central Library",
    category: "Student Amenities",
    block: "Block A",
    floor: "1st & 2nd Floor",
    room: "A-110",
    description: "Comprehensive repository of over 60,000 academic titles, quiet reading zones, and digital research bays.",
    icon: "📚",
    directions: "Main atrium entrance of Block A, take the curved central staircase directly to Floor 1.",
    timings: "08:00 AM - 09:00 PM (Every day)",
    landmark: "Central Clock Tower in Block A",
    popular: true
  },
  {
    id: "loc-6",
    name: "Principal Office",
    category: "Administrative",
    block: "Block A",
    floor: "Ground Floor",
    room: "A-001",
    description: "Executive administrative suite of the College Principal and Academic Dean's secretariat.",
    icon: "🏛️",
    directions: "Walk through the main administrative porch of Block A; first door on the right of Reception.",
    timings: "10:00 AM - 04:00 PM (Mon-Fri)",
    landmark: "Opposite College Honors Board",
    popular: false
  },
  {
    id: "loc-7",
    name: "Examination Cell",
    category: "Administrative",
    block: "Block A",
    floor: "Ground Floor",
    room: "A-015",
    description: "Official center for university exam forms, grade transcript verification, and hall ticket clearance.",
    icon: "📝",
    directions: "Block A administrative corridor, next to Accounts and Student Records.",
    timings: "09:30 AM - 04:30 PM (Mon-Sat)",
    landmark: "Beside Notice Board Zone 1",
    popular: false
  },
  {
    id: "loc-8",
    name: "Student Help Desk",
    category: "Administrative",
    block: "Block A",
    floor: "Ground Floor",
    room: "A-004",
    description: "One-stop assistance counter for admission queries, campus IDs, lost and found, and student grievances.",
    icon: "🤝",
    directions: "Immediately at the front entrance foyer of Block A.",
    timings: "09:00 AM - 05:00 PM (Mon-Sat)",
    landmark: "Main Campus Reception Area",
    popular: true
  },
  {
    id: "loc-9",
    name: "College Canteen",
    category: "Student Amenities",
    block: "Block D",
    floor: "Ground Floor",
    room: "D-CAF",
    description: "Spacious cafeteria serving breakfast, hot meals, snacks, smoothies, and coffee with outdoor veranda.",
    icon: "☕",
    directions: "Follow the shaded pedestrian pathway between Block B and Block C toward the green lawns.",
    timings: "07:30 AM - 08:00 PM (Every day)",
    landmark: "Campus Amphitheatre & Lawn Garden",
    popular: true
  },
  {
    id: "loc-10",
    name: "Seminar Hall",
    category: "Auditorium & Halls",
    block: "Block B",
    floor: "3rd Floor",
    room: "B-301",
    description: "Acoustically treated conference hall with 250 seating capacity for technical symposia and workshops.",
    icon: "🎙️",
    directions: "Block B 3rd Floor via lift or central staircase, directly opposite Department Library.",
    timings: "Event scheduled (08:30 AM - 06:00 PM)",
    landmark: "Top floor lobby of Block B",
    popular: false
  },
  {
    id: "loc-11",
    name: "Auditorium",
    category: "Auditorium & Halls",
    block: "Main Complex",
    floor: "Ground Floor",
    room: "AUD-01",
    description: "Grand 1200-seat multi-purpose hall hosting annual fests, convocation ceremonies, and cultural fests.",
    icon: "🎭",
    directions: "Independent grand dome building located straight ahead from the Main Gate.",
    timings: "Open for authorized collegiate events",
    landmark: "Campus Flagpole & Roundabout",
    popular: true
  },
  {
    id: "loc-12",
    name: "Boys Hostel",
    category: "Accommodation",
    block: "Block H1",
    floor: "Multi-Storey (4 Floors)",
    room: "Hostel Office H1-01",
    description: "On-campus residential hall with dining mess, study rooms, gym facility, and warden security office.",
    icon: "🛏️",
    directions: "North campus residential zone, behind the sports ground.",
    timings: "24/7 Access (In-time curfew: 09:30 PM)",
    landmark: "Near Basketball Court",
    popular: false
  },
  {
    id: "loc-13",
    name: "Girls Hostel",
    category: "Accommodation",
    block: "Block H2",
    floor: "Multi-Storey (4 Floors)",
    room: "Hostel Office H2-01",
    description: "Secure residential facility with biometric entry, recreation lounge, infirmary, and resident warden.",
    icon: "🏡",
    directions: "East campus garden sector, adjacent to the campus health clinic.",
    timings: "24/7 Access (In-time curfew: 09:30 PM)",
    landmark: "Beside Campus Health Centre",
    popular: false
  },
  {
    id: "loc-14",
    name: "Main Gate",
    category: "Campus Facility",
    block: "Entrance Sector",
    floor: "Ground Level",
    room: "GATE-01",
    description: "Primary campus entrance with 24/7 security guard cabin, visitor pass registry, and bus pickup bay.",
    icon: "🚪",
    directions: "Main highway campus frontage; primary vehicle and pedestrian entrance.",
    timings: "Open 24/7 (Security ID Check required)",
    landmark: "University Signboard & Security Post",
    popular: true
  },
  {
    id: "loc-15",
    name: "Parking Area",
    category: "Campus Facility",
    block: "Entrance Sector",
    floor: "Ground Level",
    room: "PKG-01",
    description: "Designated covered parking slots for student two-wheelers, faculty vehicles, and EV charging points.",
    icon: "🚗",
    directions: "Immediate left turn upon entering through the Main Gate.",
    timings: "07:00 AM - 10:00 PM",
    landmark: "Adjacent to Security Post 1",
    popular: false
  },
  {
    id: "loc-16",
    name: "Campus Health & Medical Centre",
    category: "Campus Facility",
    block: "Block A",
    floor: "Ground Floor",
    room: "A-008",
    description: "Equipped medical clinic with resident nurse, first-aid station, emergency medicines, and doctor consultation.",
    icon: "🏥",
    directions: "Ground floor of Block A, west wing corridor past the Accounts office.",
    timings: "08:30 AM - 07:00 PM (Emergency on-call 24/7)",
    landmark: "West Garden Exit of Block A",
    popular: true
  }
];

// ==========================================================================
// 2. State & Storage Management
// ==========================================================================
const STORAGE_KEYS = {
  FAVORITES: "findmyclass_favorites",
  RECENT_SEARCHES: "findmyclass_recents"
};

let currentSearchQuery = "";
let currentCategoryFilter = "all";
let showingOnlyFavorites = false;
let userFavorites = loadFavorites();

// DOM Elements
const searchInput = document.getElementById("campusSearchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchSubmitBtn = document.getElementById("searchSubmitBtn");
const locationsGrid = document.getElementById("locationsGrid");
const popularGrid = document.getElementById("popularGrid");
const emptyState = document.getElementById("emptyState");
const visibleCountEl = document.getElementById("visibleCount");
const categoryFilterContainer = document.getElementById("categoryFilters");
const quickTagsContainer = document.getElementById("quickTags");

// Nav & Modals
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.getElementById("navLinks");
const navFavoritesBtn = document.getElementById("navFavoritesBtn");
const favCountBadge = document.getElementById("favCountBadge");

// Location Details Modal
const locationModal = document.getElementById("locationModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalBlock = document.getElementById("modalBlock");
const modalSpecBlock = document.getElementById("modalSpecBlock");
const modalSpecFloor = document.getElementById("modalSpecFloor");
const modalSpecRoom = document.getElementById("modalSpecRoom");
const modalSpecCategory = document.getElementById("modalSpecCategory");
const modalDirections = document.getElementById("modalDirections");
const modalTimings = document.getElementById("modalTimings");
const modalLandmark = document.getElementById("modalLandmark");
const modalFavoriteBtn = document.getElementById("modalFavoriteBtn");
const modalFavText = document.getElementById("modalFavText");
const copyDetailsBtn = document.getElementById("copyDetailsBtn");
let activeModalLocation = null;

// Only reference needed for the top-bar status display
const apiKeyStatusText = document.getElementById("apiKeyStatusText");

// Floating Campus AI Assistant Elements
const aiChatToggleBtn = document.getElementById("aiChatToggleBtn");
const aiChatDrawer = document.getElementById("aiChatDrawer");
const closeAiChatBtn = document.getElementById("closeAiChatBtn");
const clearAiChatBtn = document.getElementById("clearAiChatBtn");
const aiChatMessages = document.getElementById("aiChatMessages");
const aiChatForm = document.getElementById("aiChatForm");
const aiChatInput = document.getElementById("aiChatInput");
const aiPromptChips = document.getElementById("aiPromptChips");

// Wayfinder Elements
const openWayfinderBtn = document.getElementById("openWayfinderBtn");
const wayfinderModal = document.getElementById("wayfinderModal");
const closeWayfinderBtn = document.getElementById("closeWayfinderBtn");
const closeWfFooterBtn = document.getElementById("closeWfFooterBtn");
const wayfinderOrigin = document.getElementById("wayfinderOrigin");
const wayfinderDestination = document.getElementById("wayfinderDestination");
const calcRouteBtn = document.getElementById("calcRouteBtn");
const wayfinderResult = document.getElementById("wayfinderResult");
const wfRouteTitle = document.getElementById("wfRouteTitle");
const wfRouteEst = document.getElementById("wfRouteEst");
const wfStepsList = document.getElementById("wfStepsList");
const wfRouteTips = document.getElementById("wfRouteTips");
const viewTargetLocationBtn = document.getElementById("viewTargetLocationBtn");

const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const toastContainer = document.getElementById("toastContainer");

// ==========================================================================
// 3. Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderPopularSpots();
  renderLocations();
  updateFavoritesBadge();
  initApiKeyStatus();
  initStatsCounters();
  populateWayfinderDestinations();
  initQuickAccess();
  initCampusMap();
  initHeroVisualActions();
  attachEventListeners();
  initFooterYear();
});

function initFooterYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ==========================================================================
// 4. Rendering Locations
// ==========================================================================
function renderLocations() {
  const filtered = filterLocations();

  locationsGrid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    visibleCountEl.textContent = "0";
    return;
  }

  emptyState.style.display = "none";
  visibleCountEl.textContent = filtered.length;

  filtered.forEach(loc => {
    const isFav = userFavorites.includes(loc.id);
    const card = document.createElement("div");
    card.className = "location-card";
    card.setAttribute("data-id", loc.id);

    card.innerHTML = `
      <div>
        <div class="card-top-meta">
          <span class="badge badge-category">${escapeHtml(loc.category)}</span>
          <button class="card-favorite-btn ${isFav ? 'favorited' : ''}" data-fav-id="${loc.id}" title="${isFav ? 'Remove from favorites' : 'Save to favorites'}" aria-label="Favorite">
            ${isFav ? '★' : '☆'}
          </button>
        </div>

        <div class="card-title-row">
          <span class="card-title-icon" aria-hidden="true">${getLocationIcon(loc)}</span>
          <h3 class="card-title">${escapeHtml(loc.name)}</h3>
        </div>

        <p class="card-desc">${escapeHtml(loc.description)}</p>

        <div class="card-details-list">
          <div class="detail-item">
            <span class="detail-item-label">🏢 Block</span>
            <span class="detail-item-val">${escapeHtml(loc.block)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">🚪 Room No</span>
            <span class="detail-item-val">${escapeHtml(loc.room)}</span>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <span class="card-floor-badge">📶 ${escapeHtml(loc.floor)}</span>
        <button class="btn-card-details" data-details-id="${loc.id}">
          View Details
        </button>
      </div>
    `;

    locationsGrid.appendChild(card);
  });
}

function renderPopularSpots() {
  const popularSpots = CAMPUS_LOCATIONS.filter(item => item.popular);
  popularGrid.innerHTML = "";

  popularSpots.forEach(item => {
    const card = document.createElement("div");
    card.className = "popular-card";
    card.setAttribute("data-id", item.id);
    card.innerHTML = `
      <div class="popular-icon">${getLocationIcon(item)}</div>
      <div class="popular-info">
        <h3>${escapeHtml(item.name)}</h3>
        <p>🏢 ${escapeHtml(item.block)} • 🚪 ${escapeHtml(item.room)}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      openLocationModal(item);
    });

    popularGrid.appendChild(card);
  });
}

// ==========================================================================
// 5. Filtering & Search Engine
// ==========================================================================
function filterLocations() {
  const query = currentSearchQuery.trim().toLowerCase();

  return CAMPUS_LOCATIONS.filter(loc => {
    // 1. Favorites-only filter toggle
    if (showingOnlyFavorites && !userFavorites.includes(loc.id)) {
      return false;
    }

    // 2. Category filter
    if (currentCategoryFilter !== "all" && loc.category.toLowerCase() !== currentCategoryFilter.toLowerCase()) {
      return false;
    }

    // 3. Search query matching
    if (!query) return true;

    const nameMatch = loc.name.toLowerCase().includes(query);
    const categoryMatch = loc.category.toLowerCase().includes(query);
    const blockMatch = loc.block.toLowerCase().includes(query);
    const roomMatch = loc.room.toLowerCase().includes(query);
    const descMatch = loc.description.toLowerCase().includes(query);
    const floorMatch = loc.floor.toLowerCase().includes(query);

    // Clean comparison: e.g. "b-204" vs "b204"
    const cleanQuery = query.replace(/[^a-z0-9]/g, "");
    const cleanRoom = loc.room.toLowerCase().replace(/[^a-z0-9]/g, "");
    const roomExactOrCleanMatch = cleanRoom.includes(cleanQuery);

    return (
      nameMatch ||
      categoryMatch ||
      blockMatch ||
      roomMatch ||
      roomExactOrCleanMatch ||
      descMatch ||
      floorMatch
    );
  });
}

// ==========================================================================
// 6. Favorites System with LocalStorage
// ==========================================================================
function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("LocalStorage not accessible for favorites:", e);
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (e) {
    console.warn("Could not save favorites to LocalStorage:", e);
  }
}

function toggleFavorite(id) {
  const index = userFavorites.indexOf(id);
  const location = CAMPUS_LOCATIONS.find(l => l.id === id);
  const locName = location ? location.name : "Location";

  if (index > -1) {
    userFavorites.splice(index, 1);
    showToast(`Removed "${locName}" from saved spots`);
  } else {
    userFavorites.push(id);
    showToast(`⭐ Saved "${locName}" to your favorites!`, "success");
  }

  saveFavorites(userFavorites);
  updateFavoritesBadge();
  renderLocations();

  // If active modal is for this item, update modal button
  if (activeModalLocation && activeModalLocation.id === id) {
    updateModalFavoriteBtnState();
  }
}

function updateFavoritesBadge() {
  if (favCountBadge) {
    favCountBadge.textContent = userFavorites.length;
  }
}

// ==========================================================================
// 7. Modal Handlers
// ==========================================================================
function openLocationModal(location) {
  activeModalLocation = location;

  modalName.textContent = location.name;
  modalDescription.textContent = location.description;
  modalCategory.textContent = location.category;
  modalBlock.textContent = location.block;
  modalSpecBlock.textContent = location.block;
  modalSpecFloor.textContent = location.floor;
  modalSpecRoom.textContent = location.room;
  modalSpecCategory.textContent = location.category;
  modalDirections.textContent = location.directions || "Follow primary building signage to reach this destination.";
  modalTimings.textContent = location.timings || "Normal campus hours";
  modalLandmark.textContent = location.landmark || "Central Corridor";

  updateModalFavoriteBtnState();

  locationModal.classList.add("active");
  locationModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLocationModal() {
  locationModal.classList.remove("active");
  locationModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeModalLocation = null;
}

function updateModalFavoriteBtnState() {
  if (!activeModalLocation) return;
  const isFav = userFavorites.includes(activeModalLocation.id);
  if (isFav) {
    modalFavText.textContent = "Saved in Favorites";
    modalFavoriteBtn.classList.remove("btn-outline");
    modalFavoriteBtn.classList.add("btn-primary");
  } else {
    modalFavText.textContent = "Save to Favorites";
    modalFavoriteBtn.classList.remove("btn-primary");
    modalFavoriteBtn.classList.add("btn-outline");
  }
}

// ==========================================================================
// 8. Campus AI Assistant & Reasoning Engine
// ==========================================================================
function initApiKeyStatus() {
  if (apiKeyStatusText) {
    apiKeyStatusText.textContent = "AI Assistant: Online";
  }
}

function toggleAiChat(forceOpen) {
  if (!aiChatDrawer) return;
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !aiChatDrawer.classList.contains("open");

  if (shouldOpen) {
    aiChatDrawer.classList.add("open");
    aiChatDrawer.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      if (aiChatInput) aiChatInput.focus();
    }, 150);
  } else {
    aiChatDrawer.classList.remove("open");
    aiChatDrawer.setAttribute("aria-hidden", "true");
  }
}

function appendUserMessage(text) {
  if (!aiChatMessages) return;
  const msgEl = document.createElement("div");
  msgEl.className = "ai-message ai-message-user";
  msgEl.innerHTML = `
    <div class="ai-message-content">
      <p>${escapeHtml(text)}</p>
    </div>
  `;
  aiChatMessages.appendChild(msgEl);
  scrollAiChatToBottom();
}

function showAiTypingIndicator() {
  if (!aiChatMessages) return null;
  const indEl = document.createElement("div");
  indEl.className = "ai-message ai-message-bot ai-indicator-msg";
  indEl.innerHTML = `
    <div class="ai-message-avatar">🤖</div>
    <div class="ai-message-content">
      <div class="ai-typing-indicator">
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
      </div>
    </div>
  `;
  aiChatMessages.appendChild(indEl);
  scrollAiChatToBottom();
  return indEl;
}

function appendAiMessage(htmlContent) {
  if (!aiChatMessages) return;
  const msgEl = document.createElement("div");
  msgEl.className = "ai-message ai-message-bot";
  msgEl.innerHTML = `
    <div class="ai-message-avatar">🤖</div>
    <div class="ai-message-content">
      ${htmlContent}
    </div>
  `;
  aiChatMessages.appendChild(msgEl);

  // Bind any direct location action buttons
  const actionBtns = msgEl.querySelectorAll(".ai-action-btn");
  actionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const locId = btn.getAttribute("data-location-id");
      const loc = CAMPUS_LOCATIONS.find((l) => l.id === locId);
      if (loc) openLocationModal(loc);
    });
  });

  // Also bind any chips dynamically rendered in AI responses
  const innerChips = msgEl.querySelectorAll(".ai-chip");
  innerChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-query");
      if (q) {
        if (aiChatInput) aiChatInput.value = q;
        processAiQuery(q);
      }
    });
  });

  scrollAiChatToBottom();
}

function scrollAiChatToBottom() {
  if (aiChatMessages) {
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }
}

function resetAiChat() {
  if (!aiChatMessages) return;
  aiChatMessages.innerHTML = `
    <div class="ai-message ai-message-bot">
      <div class="ai-message-avatar">🤖</div>
      <div class="ai-message-content">
        <p><strong>Hello! I'm your AI Campus Guide.</strong></p>
        <p>Ask me anything in natural language! For example, ask about directions, study areas, food, library hours, or specific classrooms.</p>
        
        <div class="ai-prompt-chips" id="aiPromptChips">
          <button type="button" class="ai-chip" data-query="How do I reach the CSE Lab?">🧭 Directions to CSE Lab</button>
          <button type="button" class="ai-chip" data-query="Where can I study quietly with WiFi?">📚 Quiet study spots</button>
          <button type="button" class="ai-chip" data-query="Where can I eat lunch or get snacks?">☕ Food & Canteen</button>
          <button type="button" class="ai-chip" data-query="Where is the medical room or first aid?">🏥 Medical & First Aid</button>
          <button type="button" class="ai-chip" data-query="Where is the Principal's office?">🏛️ Principal's Office</button>
        </div>
      </div>
    </div>
  `;
  bindPromptChips();
}

function bindPromptChips() {
  const chips = document.querySelectorAll(".ai-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-query");
      if (q) {
        if (aiChatInput) aiChatInput.value = q;
        processAiQuery(q);
      }
    });
  });
}

async function processAiQuery(queryText) {
  const text = (queryText || (aiChatInput ? aiChatInput.value : "")).trim();
  if (!text) return;

  if (aiChatInput) aiChatInput.value = "";
  appendUserMessage(text);

  const indicator = showAiTypingIndicator();

  const apiUrl = (typeof CAMPUS_AI_CONFIG !== "undefined" && CAMPUS_AI_CONFIG.BACKEND_API_URL) || "/api/ai";
  let responseHtml = "";

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.text) {
        responseHtml = formatAiResponse(data.text, data.location);
      } else {
        responseHtml = resolveCampusAiQuery(text);
      }
    } else {
      responseHtml = resolveCampusAiQuery(text);
    }
  } catch (err) {
    // When deployed as static frontend only (e.g. GitHub Pages without a separate server),
    // smoothly fallback to offline campus reasoning engine so users always get complete directions!
    responseHtml = resolveCampusAiQuery(text);
  }

  if (indicator && indicator.parentNode) {
    indicator.parentNode.removeChild(indicator);
  }

  appendAiMessage(responseHtml);
}

function formatAiResponse(rawText, locationMeta) {
  const lower = rawText.toLowerCase();
  if (lower.includes("sorry, i couldn't find that location in this campus")) {
    return `<p>Sorry, I couldn't find that location in this campus.</p>`;
  }

  let matchedLoc = null;
  if (locationMeta && locationMeta.id) {
    matchedLoc = CAMPUS_LOCATIONS.find((l) => l.id === locationMeta.id);
  }
  if (!matchedLoc) {
    for (const loc of CAMPUS_LOCATIONS) {
      if (lower.includes(loc.name.toLowerCase()) || lower.includes(loc.room.toLowerCase())) {
        matchedLoc = loc;
        break;
      }
    }
  }

  let html = `<p>${escapeHtml(rawText).replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  if (matchedLoc) {
    html += `
      <div class="ai-route-card">
        <strong>📍 Recommended Location:</strong> ${matchedLoc.name} (${matchedLoc.room}, ${matchedLoc.block})
        <br>
        <button type="button" class="ai-action-btn" data-location-id="${matchedLoc.id}">
          📍 View ${matchedLoc.name} Details
        </button>
      </div>
    `;
  }
  return html;
}

// Intelligent Offline Campus AI Reasoning Engine
function resolveCampusAiQuery(query) {
  const q = query.toLowerCase();

  const makeLocationAnswer = (loc, tip) => `
    <p><strong>${loc.name}</strong> is located in <strong>${loc.block}</strong>, <strong>${loc.floor}</strong> (Room <strong>${loc.room}</strong>).</p>
    <div class="ai-route-card">
      <ul class="ai-route-steps">
        <li class="ai-route-step">
          <span class="ai-route-step-num">1</span>
          <span>${loc.directions}</span>
        </li>
        <li class="ai-route-step">
          <span class="ai-route-step-num">2</span>
          <span><strong>Landmark:</strong> ${loc.landmark}</span>
        </li>
        <li class="ai-route-step">
          <span class="ai-route-step-num">3</span>
          <span><strong>Hours:</strong> ${loc.timings}</span>
        </li>
      </ul>
      ${tip ? `<p style="font-size: 0.8rem; color: #475569; margin: 0.2rem 0;">💡 <em>Tip: ${tip}</em></p>` : ""}
      <button type="button" class="ai-action-btn" data-location-id="${loc.id}">
        📍 View Details & Save
      </button>
    </div>
  `;

  // 1. CSE Lab & Computer Science
  if (q.includes("cse") || q.includes("computer science") || q.includes("programming") || q.includes("coding lab")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-1") || CAMPUS_LOCATIONS[0];
    return makeLocationAnswer(loc, "Bring your Student ID card. Linux terminals and fast campus WiFi available.");
  }

  // 2. Quiet Study & Library
  if (q.includes("study") || q.includes("quiet") || q.includes("library") || q.includes("book") || q.includes("wifi")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-5");
    return makeLocationAnswer(loc, "The 2nd Floor houses quiet study cubicles and reference journals.");
  }

  // 3. Food, Canteen, Coffee & Snacks
  if (q.includes("food") || q.includes("canteen") || q.includes("eat") || q.includes("lunch") || q.includes("snack") || q.includes("coffee") || q.includes("hungry") || q.includes("breakfast")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-9");
    return makeLocationAnswer(loc, "Peak lunch rush is between 01:00 PM and 02:00 PM.");
  }

  // 4. Medical, First Aid & Emergencies
  if (q.includes("medical") || q.includes("doctor") || q.includes("first aid") || q.includes("sick") || q.includes("headache") || q.includes("emergency") || q.includes("medicine") || q.includes("clinic") || q.includes("unwell") || q.includes("hurt")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-16") || CAMPUS_LOCATIONS.find((l) => l.name.includes("Health"));
    if (loc) {
      return makeLocationAnswer(loc, "Free basic first-aid, ORS, pain relief, and emergency doctor consultations available.");
    }
  }

  // 5. Principal, Dean & Administration
  if (q.includes("principal") || q.includes("dean") || q.includes("director") || q.includes("head of institution")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-6");
    return makeLocationAnswer(loc, "Visiting hours for students are usually 02:00 PM to 04:00 PM on weekdays.");
  }

  // 6. Examination Cell & Hall Tickets
  if (q.includes("exam") || q.includes("hall ticket") || q.includes("transcript") || q.includes("grade") || q.includes("marksheet") || q.includes("admit card")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-7");
    return makeLocationAnswer(loc, "Keep your university roll number handy when approaching Counter 2.");
  }

  // 7. Student Help Desk, Admissions & Lost/Found
  if (q.includes("help") || q.includes("lost") || q.includes("id card") || q.includes("enquiry") || q.includes("reception") || q.includes("admission") || q.includes("found")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-8");
    return makeLocationAnswer(loc, "The front desk can verify documents and redirect you to specific departmental heads.");
  }

  // 8. Electronics & Circuit Lab
  if (q.includes("electronics") || q.includes("ece") || q.includes("circuit") || q.includes("vlsi") || q.includes("iot")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-3");
    return makeLocationAnswer(loc, "Make sure to sign in on the lab entry logbook at Counter 1.");
  }

  // 9. Mechanical Lab & Workshop
  if (q.includes("mechanical") || q.includes("mech") || q.includes("workshop") || q.includes("lathe") || q.includes("machinery")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-4");
    return makeLocationAnswer(loc, "Safety shoes and workshop aprons are mandatory for entry.");
  }

  // 10. Auditorium & Cultural Fests
  if (q.includes("auditorium") || q.includes("fest") || q.includes("cultural") || q.includes("event") || q.includes("convocation") || q.includes("stage")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-11");
    return makeLocationAnswer(loc, "Main entry is via the central campus plaza opposite the flagpole.");
  }

  // 11. Seminar Hall
  if (q.includes("seminar") || q.includes("conference") || q.includes("symposium") || q.includes("presentation")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-10");
    return makeLocationAnswer(loc, "Take the eastern elevator of Block B for direct top-floor access.");
  }

  // 12. Hostels
  if (q.includes("hostel") || q.includes("dorm") || q.includes("residence") || q.includes("stay")) {
    if (q.includes("girl") || q.includes("women") || q.includes("female")) {
      const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-13");
      return makeLocationAnswer(loc, "Biometric entry strictly monitored by the Warden office.");
    }
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-12");
    return makeLocationAnswer(loc, "Warden office is located on the ground floor foyer.");
  }

  // 13. Parking & Vehicles
  if (q.includes("park") || q.includes("bike") || q.includes("car") || q.includes("vehicle") || q.includes("scooter")) {
    const loc = CAMPUS_LOCATIONS.find((l) => l.id === "loc-15");
    return makeLocationAnswer(loc, "Display your student parking permit sticker on your vehicle.");
  }

  // 14. Washrooms / Drinking Water
  if (q.includes("washroom") || q.includes("toilet") || q.includes("restroom") || q.includes("water") || q.includes("drink")) {
    return `
      <p>🚰 <strong>Washrooms & Clean Water Points:</strong></p>
      <p>Clean restrooms and RO water coolers are situated on <strong>every floor</strong> of Blocks A, B, and C adjacent to the central staircases.</p>
      <div class="ai-route-card">
        <ul class="ai-route-steps">
          <li class="ai-route-step"><span class="ai-route-step-num">A</span><span><strong>Block A:</strong> Ground Floor near Reception, 1st & 2nd Floor next to Library.</span></li>
          <li class="ai-route-step"><span class="ai-route-step-num">B</span><span><strong>Block B:</strong> Right next to Staircase A on all floors (near CSE Lab on Floor 2).</span></li>
          <li class="ai-route-step"><span class="ai-route-step-num">C</span><span><strong>Block C:</strong> North corridor opposite Electronics Lab.</span></li>
        </ul>
      </div>
    `;
  }

  // 15. Search by room number (e.g. B-204, A-001, C-005, etc.) or partial title match
  for (const loc of CAMPUS_LOCATIONS) {
    const roomMatch = loc.room.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanQuery = q.replace(/[^a-z0-9]/g, "");
    if (cleanQuery && (roomMatch.includes(cleanQuery) || q.includes(loc.name.toLowerCase()))) {
      return makeLocationAnswer(loc);
    }
  }

  // Default intelligent campus guide assistance
  return `
    <p>I understand you're looking for campus guidance on <em>"${escapeHtml(query)}"</em>.</p>
    <p>Here are quick topics I can direct you to:</p>
    <div class="ai-prompt-chips">
      <button type="button" class="ai-chip" data-query="How do I reach the CSE Lab?">🧭 CSE Lab Directions</button>
      <button type="button" class="ai-chip" data-query="Where is the Central Library?">📚 Central Library</button>
      <button type="button" class="ai-chip" data-query="Where is the Canteen?">☕ College Canteen</button>
      <button type="button" class="ai-chip" data-query="Where is the Health Center?">🏥 Medical Room</button>
    </div>
    <p style="margin-top: 0.6rem; font-size: 0.82rem; color: #64748b;">Or type any room number (e.g. <strong>B-204</strong>, <strong>A-001</strong>) or facility name above!</p>
  `;
}



// ==========================================================================
// 9. Event Listeners
// ==========================================================================
function attachEventListeners() {
  // Real-time search as user types
  searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    clearSearchBtn.style.display = currentSearchQuery.length > 0 ? "flex" : "none";
    renderLocations();
  });

  // Clear search button
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    currentSearchQuery = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    renderLocations();
  });

  // Search submit button
  searchSubmitBtn.addEventListener("click", () => {
    currentSearchQuery = searchInput.value;
    renderLocations();
    const locSection = document.getElementById("locations");
    if (locSection) {
      locSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Quick tag chips in Hero
  quickTagsContainer.addEventListener("click", (e) => {
    const chip = e.target.closest(".tag-chip");
    if (!chip) return;
    const query = chip.getAttribute("data-query");
    searchInput.value = query;
    currentSearchQuery = query;
    clearSearchBtn.style.display = "flex";
    renderLocations();

    const locSection = document.getElementById("locations");
    if (locSection) {
      locSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Category filter pills
  categoryFilterContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;

    categoryFilterContainer.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");

    currentCategoryFilter = pill.getAttribute("data-category");
    showingOnlyFavorites = false; // reset favorites view
    navFavoritesBtn.classList.remove("active");
    renderLocations();
  });

  // Favorites Nav Button
  navFavoritesBtn.addEventListener("click", () => {
    showingOnlyFavorites = !showingOnlyFavorites;
    if (showingOnlyFavorites) {
      navFavoritesBtn.style.background = "#fbbf24";
      navFavoritesBtn.style.color = "#000000";
      showToast("Showing your Saved Locations ⭐");
    } else {
      navFavoritesBtn.style.background = "";
      navFavoritesBtn.style.color = "";
    }
    renderLocations();
    const locSection = document.getElementById("locations");
    if (locSection) {
      locSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Grid click delegation for Details and Favorites
  locationsGrid.addEventListener("click", (e) => {
    // Details button
    const detailsBtn = e.target.closest(".btn-card-details");
    if (detailsBtn) {
      const id = detailsBtn.getAttribute("data-details-id");
      const loc = CAMPUS_LOCATIONS.find(l => l.id === id);
      if (loc) openLocationModal(loc);
      return;
    }

    // Favorite star button
    const favBtn = e.target.closest(".card-favorite-btn");
    if (favBtn) {
      const id = favBtn.getAttribute("data-fav-id");
      toggleFavorite(id);
      return;
    }
  });

  // Modal Close buttons
  closeModalBtn.addEventListener("click", closeLocationModal);
  locationModal.addEventListener("click", (e) => {
    if (e.target === locationModal) closeLocationModal();
  });

  // Modal Favorite button
  modalFavoriteBtn.addEventListener("click", () => {
    if (activeModalLocation) {
      toggleFavorite(activeModalLocation.id);
    }
  });

  // Copy details button
  copyDetailsBtn.addEventListener("click", () => {
    if (!activeModalLocation) return;
    const text = `📍 ${activeModalLocation.name} (${activeModalLocation.room})\n🏢 ${activeModalLocation.block} - ${activeModalLocation.floor}\n🏷️ ${activeModalLocation.category}\n🧭 Directions: ${activeModalLocation.directions}`;
    
    navigator.clipboard.writeText(text).then(() => {
      showToast("📋 Location details copied to clipboard!", "success");
    }).catch(() => {
      showToast("Location: " + activeModalLocation.name + " (" + activeModalLocation.room + ")");
    });
  });

  // Empty state reset button
  resetFiltersBtn.addEventListener("click", () => {
    searchInput.value = "";
    currentSearchQuery = "";
    clearSearchBtn.style.display = "none";
    currentCategoryFilter = "all";
    showingOnlyFavorites = false;
    navFavoritesBtn.style.background = "";
    navFavoritesBtn.style.color = "";

    categoryFilterContainer.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.toggle("active", p.getAttribute("data-category") === "all");
    });

    renderLocations();
  });

  // Empty state suggestions
  emptyState.addEventListener("click", (e) => {
    const btn = e.target.closest(".suggest-btn");
    if (!btn) return;
    const q = btn.getAttribute("data-query");
    searchInput.value = q;
    currentSearchQuery = q;
    clearSearchBtn.style.display = "flex";
    renderLocations();
  });

  // Footer block links
  document.querySelectorAll(".footer-block-link").forEach(link => {
    link.addEventListener("click", (e) => {
      const blockQuery = e.currentTarget.getAttribute("data-query");
      searchInput.value = blockQuery;
      currentSearchQuery = blockQuery;
      clearSearchBtn.style.display = "flex";
      renderLocations();
      document.getElementById("locations").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Mobile navigation hamburger toggle
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Close mobile nav when clicking link
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("show");
    }
  });

  // Campus AI Assistant widget listeners
  if (aiChatToggleBtn) {
    aiChatToggleBtn.addEventListener("click", () => toggleAiChat());
  }
  if (closeAiChatBtn) {
    closeAiChatBtn.addEventListener("click", () => toggleAiChat(false));
  }
  if (clearAiChatBtn) {
    clearAiChatBtn.addEventListener("click", resetAiChat);
  }
  if (aiChatForm) {
    aiChatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (aiChatInput) processAiQuery(aiChatInput.value);
    });
  }

  // Initial binding of prompt chips
  bindPromptChips();

  // Wayfinder modal triggers
  if (openWayfinderBtn) {
    openWayfinderBtn.addEventListener("click", openWayfinderModal);
  }
  if (closeWayfinderBtn) {
    closeWayfinderBtn.addEventListener("click", closeWayfinderModal);
  }
  if (closeWfFooterBtn) {
    closeWfFooterBtn.addEventListener("click", closeWayfinderModal);
  }
  if (calcRouteBtn) {
    calcRouteBtn.addEventListener("click", calculateWayfinderRoute);
  }
  if (wayfinderModal) {
    wayfinderModal.addEventListener("click", (e) => {
      if (e.target === wayfinderModal) closeWayfinderModal();
    });
  }

  // Keyboard navigation: Escape closes open location modal, wayfinder, or AI chat drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (locationModal && locationModal.classList.contains("active")) {
        closeLocationModal();
      } else if (wayfinderModal && wayfinderModal.classList.contains("active")) {
        closeWayfinderModal();
      } else if (aiChatDrawer && aiChatDrawer.classList.contains("open")) {
        toggleAiChat(false);
      }
    }
  });
}

// ==========================================================================
// 10. Utility Functions
// ==========================================================================
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "toast-success" : ""}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 2800);
}

// ==========================================================================
// 11. Category Icons Mapping
// ==========================================================================
function getLocationIcon(loc) {
  if (loc.category === "Classroom") return "🏫";
  if (loc.category === "Laboratory") return "🧪";
  if (loc.name.toLowerCase().includes("library")) return "📚";
  if (loc.name.toLowerCase().includes("canteen")) return "🍔";
  if (loc.category === "Administrative") return "🏢";
  if (loc.category === "Accommodation") return "🏠";
  if (loc.name.toLowerCase().includes("health") || loc.name.toLowerCase().includes("medical")) return "🏥";
  if (loc.category === "Auditorium & Halls") return "🎭";
  if (loc.category === "Campus Facility") {
    if (loc.name.toLowerCase().includes("gate")) return "🚪";
    if (loc.name.toLowerCase().includes("park")) return "🚗";
    return "📍";
  }
  return loc.icon || "📍";
}

// ==========================================================================
// 12. Animated Statistics Counters
// ==========================================================================
function initStatsCounters() {
  const statsSection = document.getElementById("statsSection");
  if (!statsSection) return;

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        const counters = statsSection.querySelectorAll(".counter");
        counters.forEach(counter => {
          const target = +counter.getAttribute("data-target");
          if (!target) return;
          const duration = 1200;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.ceil(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsSection);
}

// ==========================================================================
// 13. Quick Access Shortcuts
// ==========================================================================
function initQuickAccess() {
  const quickCards = document.querySelectorAll(".quick-card");
  quickCards.forEach(card => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      const query = card.getAttribute("data-query");

      if (category) {
        currentCategoryFilter = category;
        document.querySelectorAll(".filter-pill").forEach(pill => {
          if (pill.getAttribute("data-category") === category) {
            pill.classList.add("active");
          } else {
            pill.classList.remove("active");
          }
        });
      }

      if (query) {
        searchInput.value = query;
        currentSearchQuery = query;
        clearSearchBtn.style.display = "flex";
      } else {
        searchInput.value = "";
        currentSearchQuery = "";
        clearSearchBtn.style.display = "none";
      }

      renderLocations();

      const locSection = document.getElementById("locations");
      if (locSection) {
        locSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ==========================================================================
// 14. Interactive Campus Map
// ==========================================================================
function initCampusMap() {
  const mapNodes = document.querySelectorAll(".map-node");
  mapNodes.forEach(node => {
    node.addEventListener("click", () => {
      mapNodes.forEach(n => n.classList.remove("active-building"));
      node.classList.add("active-building");

      const block = node.getAttribute("data-block");
      const query = node.getAttribute("data-query");

      if (query) {
        searchInput.value = query;
        currentSearchQuery = query;
        clearSearchBtn.style.display = "flex";
      } else if (block) {
        searchInput.value = block;
        currentSearchQuery = block;
        clearSearchBtn.style.display = "flex";
      }

      renderLocations();

      const buildingName = node.querySelector("strong") ? node.querySelector("strong").textContent : "Building";
      showToast(`Selected ${buildingName} on map`, "info");
      const locSection = document.getElementById("locations");
      if (locSection) {
        locSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const resetMapBtn = document.getElementById("resetMapSelectionBtn");
  if (resetMapBtn) {
    resetMapBtn.addEventListener("click", () => {
      mapNodes.forEach(n => n.classList.remove("active-building"));
      currentCategoryFilter = "all";
      document.querySelectorAll(".filter-pill").forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-category") === "all");
      });
      searchInput.value = "";
      currentSearchQuery = "";
      clearSearchBtn.style.display = "none";
      renderLocations();
      showToast("Map selection reset", "info");
    });
  }
}

// ==========================================================================
// 15. Hero Visual Actions
// ==========================================================================
function initHeroVisualActions() {
  const tryRouteBtn = document.getElementById("heroTryRouteBtn");
  if (tryRouteBtn) {
    tryRouteBtn.addEventListener("click", () => {
      const cseLab = CAMPUS_LOCATIONS.find(l => l.id === "loc-1");
      if (cseLab) openLocationModal(cseLab);
    });
  }

  const exploreAllBtn = document.getElementById("heroExploreAllBtn");
  if (exploreAllBtn) {
    exploreAllBtn.addEventListener("click", () => {
      const locSection = document.getElementById("locations");
      if (locSection) locSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

// ==========================================================================
// 16. Interactive "I'm Lost" Wayfinder
// ==========================================================================
function populateWayfinderDestinations() {
  if (!wayfinderDestination) return;
  wayfinderDestination.innerHTML = "";

  CAMPUS_LOCATIONS.forEach(loc => {
    const opt = document.createElement("option");
    opt.value = loc.id;
    opt.textContent = `${loc.name} (${loc.room} • ${loc.block})`;
    wayfinderDestination.appendChild(opt);
  });
}

function openWayfinderModal() {
  if (!wayfinderModal) return;
  wayfinderModal.classList.add("active");
  wayfinderModal.setAttribute("aria-hidden", "false");
}

function closeWayfinderModal() {
  if (!wayfinderModal) return;
  wayfinderModal.classList.remove("active");
  wayfinderModal.setAttribute("aria-hidden", "true");
}

function calculateWayfinderRoute() {
  if (!wayfinderOrigin || !wayfinderDestination) return;

  const origin = wayfinderOrigin.value;
  const targetId = wayfinderDestination.value;
  const targetLoc = CAMPUS_LOCATIONS.find(l => l.id === targetId);
  if (!targetLoc) return;

  if (wfRouteTitle) wfRouteTitle.textContent = `Route from ${origin} to ${targetLoc.name}`;
  if (wfRouteEst) wfRouteEst.textContent = `⏱️ ~3 min walk • ${targetLoc.floor}`;

  if (wfStepsList) {
    wfStepsList.innerHTML = `
      <div class="wf-step-item">
        <span class="wf-step-num">1</span>
        <span>Start at <strong>${escapeHtml(origin)}</strong> and proceed along the main paved campus concourse.</span>
      </div>
      <div class="wf-step-item">
        <span class="wf-step-num">2</span>
        <span>Head towards <strong>${escapeHtml(targetLoc.block)}</strong> via the central pedestrian walkway.</span>
      </div>
      <div class="wf-step-item">
        <span class="wf-step-num">3</span>
        <span>${escapeHtml(targetLoc.directions)}</span>
      </div>
      <div class="wf-step-item">
        <span class="wf-step-num">4</span>
        <span>Arrive at <strong>${escapeHtml(targetLoc.name)}</strong> (Room <strong>${escapeHtml(targetLoc.room)}</strong>, ${escapeHtml(targetLoc.floor)}).</span>
      </div>
    `;
  }

  if (wfRouteTips) {
    wfRouteTips.innerHTML = `
      💡 <strong>Landmark checkpoint:</strong> ${escapeHtml(targetLoc.landmark)}.<br>
      ⏰ <strong>Operating hours:</strong> ${escapeHtml(targetLoc.timings)}.
    `;
  }

  if (viewTargetLocationBtn) {
    viewTargetLocationBtn.style.display = "inline-flex";
    viewTargetLocationBtn.onclick = () => {
      closeWayfinderModal();
      openLocationModal(targetLoc);
    };
  }

  if (wayfinderResult) {
    wayfinderResult.style.display = "block";
  }
}

