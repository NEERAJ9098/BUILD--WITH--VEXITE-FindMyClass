/**
 * Secure Serverless AI Endpoint for FindMyClass
 * Compatible with Vercel, Netlify, and Node.js serverless runtimes.
 * 
 * Secure Architecture:
 * - Reads API key strictly from environment variable: process.env.API_KEY
 * - Never returns or exposes the API key to the client.
 * - Enforces strict campus location grounding; does NOT hallucinate/invent locations.
 */

const CAMPUS_LOCATIONS = [
  {
    id: "loc-1",
    name: "CSE Lab",
    category: "Laboratory",
    block: "Block B",
    floor: "2nd Floor",
    room: "B-204",
    description: "Computer Science practical laboratory equipped with high-end workstations and Linux environments.",
    directions: "Enter Block B, proceed up the main staircase to the 2nd Floor, turn right. Located across from the Network Systems Lab.",
    timings: "08:30 AM - 05:30 PM (Mon-Sat)",
    landmark: "Water cooler & Block B Staircase A"
  },
  {
    id: "loc-2",
    name: "Computer Science Classroom",
    category: "Classroom",
    block: "Block B",
    floor: "1st Floor",
    room: "B-102",
    description: "Smart lecture hall with projector facilities and tiered seating for Computer Science lectures.",
    directions: "First floor of Block B, direct left from the eastern elevator entrance.",
    timings: "09:00 AM - 04:30 PM (Mon-Fri)",
    landmark: "Adjacent to Faculty Room B-101"
  },
  {
    id: "loc-3",
    name: "Electronics Lab",
    category: "Laboratory",
    block: "Block C",
    floor: "Ground Floor",
    room: "C-005",
    description: "Digital electronics and VLSI hardware testing lab with oscilloscopes and circuit design kits.",
    directions: "Block C ground level corridor, second door on the left past the main foyer.",
    timings: "09:00 AM - 05:00 PM (Mon-Sat)",
    landmark: "Near Block C East Entrance"
  },
  {
    id: "loc-4",
    name: "Mechanical Lab",
    category: "Laboratory",
    block: "Block C",
    floor: "Ground Floor",
    room: "C-010",
    description: "Heavy machinery, thermodynamics testing setups, and lathe workshops for mechanical engineering.",
    directions: "Block C rear engineering bay, entrance opposite the materials workshop courtyard.",
    timings: "09:00 AM - 05:00 PM (Mon-Sat)",
    landmark: "Workshop Bay Loading Dock"
  },
  {
    id: "loc-5",
    name: "Central Library",
    category: "Library & Study",
    block: "Block A",
    floor: "2nd Floor",
    room: "A-201",
    description: "Multi-tier central campus library with thousands of academic textbooks, quiet research cubicles, and digital journals.",
    directions: "Enter Block A, take the central elevator or grand staircase to the 2nd Floor. Entrance is glass double doors directly ahead.",
    timings: "08:00 AM - 08:00 PM (Mon-Sun)",
    landmark: "Block A Central Atrium Elevator"
  },
  {
    id: "loc-6",
    name: "Principal Office",
    category: "Administrative",
    block: "Block A",
    floor: "1st Floor",
    room: "A-101",
    description: "Official executive office of the College Principal and Dean of Academic Affairs.",
    directions: "Block A first floor, head south down the executive corridor. Signboard outside room A-101.",
    timings: "10:00 AM - 04:00 PM (Appointments Preferred)",
    landmark: "Opposite Main Conference Hall"
  },
  {
    id: "loc-7",
    name: "Administration Office",
    category: "Administrative",
    block: "Block A",
    floor: "Ground Floor",
    room: "A-002",
    description: "Main administrative queries, admissions, ID cards, document verifications, and registrar support.",
    directions: "Ground floor of Block A, immediately to the right upon entering the main campus reception.",
    timings: "09:00 AM - 05:00 PM (Mon-Fri)",
    landmark: "Behind Student Help Desk"
  },
  {
    id: "loc-8",
    name: "Accounts Section",
    category: "Administrative",
    block: "Block A",
    floor: "Ground Floor",
    room: "A-005",
    description: "Fee payments, scholarship processing, semester challans, and financial disbursements.",
    directions: "Ground floor of Block A, west wing corridor, third door on the left.",
    timings: "09:30 AM - 03:30 PM (Mon-Fri)",
    landmark: "Next to ATM kiosk inside Block A"
  },
  {
    id: "loc-9",
    name: "Campus Canteen",
    category: "Canteen & Dining",
    block: "Block D",
    floor: "Ground Floor",
    room: "D-001",
    description: "Spacious student cafeteria serving hot meals, snacks, coffee, cold drinks, and vegetarian lunch thalis.",
    directions: "Block D ground floor, directly facing the student recreation lawn and basketball court.",
    timings: "07:30 AM - 08:00 PM (Daily)",
    landmark: "Central Lawn Pergola"
  },
  {
    id: "loc-10",
    name: "Auditorium",
    category: "Auditorium & Halls",
    block: "Main Complex",
    floor: "Ground Floor",
    room: "AUD-01",
    description: "1200-seater acoustic auditorium with stage lighting for convocation, cultural fests, and guest lectures.",
    directions: "Opposite the central fountain in the main plaza, grand double glass entryway.",
    timings: "09:00 AM - 06:00 PM (During scheduled events)",
    landmark: "Grand Portico & Central Fountain"
  },
  {
    id: "loc-11",
    name: "Seminar Hall",
    category: "Auditorium & Halls",
    block: "Block B",
    floor: "3rd Floor",
    room: "B-301",
    description: "Medium-scale air-conditioned presentation hall for departmental seminars, workshops, and project reviews.",
    directions: "Block B, take elevator to 3rd Floor, turn left. Entrance is at end of the hall.",
    timings: "09:00 AM - 05:00 PM",
    landmark: "Top floor elevator exit, Block B"
  },
  {
    id: "loc-12",
    name: "Boys Hostel H1",
    category: "Accommodation",
    block: "Block H1",
    floor: "All Floors (G+4)",
    room: "H1 Complex",
    description: "Residential campus hostel for male students with dining hall, laundry, and indoor games room.",
    directions: "North campus residential zone, 5-minute walk past Block D and the sports grounds.",
    timings: "Gate curfew: 09:30 PM",
    landmark: "North Campus Gate & Basketball Court"
  },
  {
    id: "loc-13",
    name: "Girls Hostel H2",
    category: "Accommodation",
    block: "Block H2",
    floor: "All Floors (G+4)",
    room: "H2 Complex",
    description: "Residential hostel for female students with 24/7 security, warden office, gym, and dining hall.",
    directions: "South campus residential sector, adjacent to the campus botanical garden.",
    timings: "Gate curfew: 09:30 PM",
    landmark: "Botanical Garden & Security Post 3"
  },
  {
    id: "loc-14",
    name: "Main Entrance Gate",
    category: "Campus Facility",
    block: "Entrance Sector",
    floor: "Ground Level",
    room: "GATE-01",
    description: "Primary pedestrian and vehicle access point to the college campus with security reception.",
    directions: "Main highway campus frontage; primary vehicle and pedestrian entrance.",
    timings: "Open 24/7 (Security ID Check required)",
    landmark: "University Signboard & Security Post"
  },
  {
    id: "loc-15",
    name: "Parking Area",
    category: "Campus Facility",
    block: "Entrance Sector",
    floor: "Ground Level",
    room: "PKG-01",
    description: "Designated covered parking slots for student two-wheelers, faculty vehicles, and EV charging points.",
    directions: "Immediate left turn upon entering through the Main Gate.",
    timings: "07:00 AM - 10:00 PM",
    landmark: "Adjacent to Security Post 1"
  },
  {
    id: "loc-16",
    name: "Campus Health & Medical Centre",
    category: "Campus Facility",
    block: "Block A",
    floor: "Ground Floor",
    room: "A-008",
    description: "Equipped medical clinic with resident nurse, first-aid station, emergency medicines, and doctor consultation.",
    directions: "Ground floor of Block A, west wing corridor past the Accounts office.",
    timings: "08:30 AM - 07:00 PM (Emergency on-call 24/7)",
    landmark: "West Garden Exit of Block A"
  }
];

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function findLocationInText(text) {
  const t = text.toLowerCase();
  for (const loc of CAMPUS_LOCATIONS) {
    if (t.includes(loc.name.toLowerCase()) || t.includes(loc.room.toLowerCase().replace(/[^a-z0-9]/g, ""))) {
      return loc;
    }
  }
  return null;
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid JSON body" }));
      return;
    }
  }

  const query = (body && body.query ? String(body.query) : "").trim();
  if (!query) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Query is required" }));
    return;
  }

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey.includes("your_api_key_here")) {
    // If no external key configured on backend, provide clean fallback message
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: false,
      message: "AI navigation is temporarily unavailable. You can still search campus locations manually."
    }));
    return;
  }

  try {
    const campusSummary = CAMPUS_LOCATIONS.map(
      (l) => `${l.name} | Room: ${l.room} | Block: ${l.block} | Floor: ${l.floor} | Landmark: ${l.landmark} | Directions: ${l.directions} | Hours: ${l.timings}`
    ).join("\n");

    const systemInstruction = `You are the FindMyClass AI Campus Assistant for college students.
Use ONLY the official campus location directory below:
${campusSummary}

STRICT NAVIGATION RULES:
1. Provide concise, friendly, and accurate step-by-step navigation instructions mentioning Block, Floor, Room number, and Landmark.
2. The AI must NOT invent locations. If the user asks about a location, department, or person that is NOT in the campus directory above, you MUST return exactly this phrase:
"Sorry, I couldn't find that location in this campus."
3. Keep answers under 3-4 sentences.`;

    const candidateModels = [
      process.env.AI_MODEL,
      "gemini-3.7-flash",
      "gemini-2.5-flash",
      "gemini-1.5-flash"
    ].filter(Boolean);

    let responseText = "";
    let lastStatus = 503;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
        const apiResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemInstruction}\n\nStudent question: ${query}` }]
            }]
          })
        });

        if (apiResponse.ok) {
          const data = await apiResponse.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
          if (responseText) break;
        } else {
          lastStatus = apiResponse.status;
        }
      } catch (e) {
        // Try next model
      }
    }

    if (!responseText) {
      res.statusCode = 503;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        success: false,
        message: "AI navigation is temporarily unavailable. You can still search campus locations manually."
      }));
      return;
    }

    // Match referenced location if any
    const matched = findLocationInText(responseText) || findLocationInText(query);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: true,
      text: responseText,
      location: matched ? {
        id: matched.id,
        name: matched.name,
        room: matched.room,
        block: matched.block,
        floor: matched.floor
      } : null
    }));
  } catch (error) {
    console.error("Backend error processing AI query:", error.message);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: false,
      message: "AI navigation is temporarily unavailable. You can still search campus locations manually."
    }));
  }
};
