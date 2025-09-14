import { Project, ProjectSequence } from "../types/project";

const birdhouse: Project = {
  id: "birdhouse",
  title: "Some furniture",
  description:
    "Build a charming birdhouse for your garden with basic woodworking skills.",
  difficulty: "Beginner",
  totalTime: "2-3 hours",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1682322350840-642c25439b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBiaXJkaG91c2UlMjBjb25zdHJ1Y3Rpb24lMjBkaXl8ZW58MXx8fHwxNzU3NzkxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  steps: [
    {
      id: 1,
      title: "Cut the Wood Pieces",
      description: "Measure and cut all the wood pieces according to the plan.",
      instructions: [
        'Cut front and back panels: 7" x 8"',
        'Cut side panels: 5" x 8"',
        'Cut bottom piece: 5" x 5"',
        'Cut roof pieces: 5" x 7" and 6.5" x 7"',
        "Sand all pieces smooth",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1577372440262-d86980dc1d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY3V0dGluZyUyMHNhdyUyMHRvb2xzfGVufDF8fHx8MTc1Nzc5MTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "30 minutes",
      materials: ["Pine wood boards", "Sandpaper"],
      tools: ["Saw", "Measuring tape", "Pencil"],
    },
    {
      id: 2,
      title: "Drill the Entry Hole",
      description: "Create the entrance hole for the birds.",
      instructions: [
        'Mark the center point on the front panel, 2" from the top',
        'Use a 1.25" drill bit for small birds',
        "Drill slowly to prevent splintering",
        "Sand the hole smooth",
        'Optional: Add a small perch 2" below the hole',
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1644522675914-c4d7d7140b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmlsbCUyMGhvbGVzJTIwd29vZCUyMHdvcmtzaG9wfGVufDF8fHx8MTc1Nzc5MTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "15 minutes",
      materials: ["Wooden dowel (optional)"],
      tools: ["Drill", '1.25" drill bit', "Clamp"],
    },
    {
      id: 3,
      title: "Assemble the Walls",
      description: "Glue and assemble the four walls of the birdhouse.",
      instructions: [
        "Apply wood glue to the edges of the side panels",
        "Attach side panels to the back panel",
        "Attach the front panel to complete the box",
        "Use clamps to hold pieces while glue dries",
        "Let dry for 30 minutes",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581331583759-c1504d02c2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwYXNzZW1ibHklMjBnbHVlJTIwY2xhbXBzfGVufDF8fHx8MTc1Nzc5MTQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "45 minutes",
      materials: ["Wood glue"],
      tools: ["Clamps", "Damp cloth"],
    },
    {
      id: 4,
      title: "Attach Bottom and Roof",
      description: "Complete the structure with the bottom and roof pieces.",
      instructions: [
        "Glue the bottom piece inside the assembled walls",
        "Attach the smaller roof piece first",
        "Attach the larger roof piece with a slight overhang",
        "Ensure roof pieces meet at the peak",
        "Clamp and let dry completely",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581331583759-c1504d02c2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwYXNzZW1ibHklMjBnbHVlJTIwY2xhbXBzfGVufDF8fHx8MTc1Nzc5MTQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "30 minutes",
      materials: ["Wood glue"],
      tools: ["Clamps"],
    },
    {
      id: 5,
      title: "Finish and Paint",
      description:
        "Apply the final finish to protect and beautify your birdhouse.",
      instructions: [
        "Sand the entire birdhouse lightly",
        "Apply wood stain or primer if painting",
        "Paint with exterior wood paint or leave natural",
        "Add drainage holes in the bottom if desired",
        "Install hanging hardware on the back",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1689102816270-dc301aeaec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMHdvb2QlMjBicnVzaHxlbnwxfHx8fDE3NTc3OTE0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "45 minutes",
      materials: ["Wood stain/paint", "Hanging hardware"],
      tools: ["Paintbrush", "Sandpaper", "Screwdriver"],
    },
  ],
};

const planterBox: Project = {
  id: "planter-box",
  title: "Garden Planter Box",
  description: "Create a raised planter box perfect for herbs and vegetables.",
  difficulty: "Intermediate",
  totalTime: "3-4 hours",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1584804515466-e328c1147cc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBwbGFudGVyJTIwYm94JTIwZGl5fGVufDF8fHx8MTc1Nzc5MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  steps: [
    {
      id: 1,
      title: "Cut Cedar Boards",
      description: "Prepare all the cedar boards for the planter box.",
      instructions: [
        'Cut 4 pieces of 2x8 cedar: two at 48" and two at 24"',
        'Cut 1 piece of 2x2 cedar at 16" for the bottom support',
        "Sand all cut edges smooth",
        "Pre-drill screw holes to prevent splitting",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1577372440262-d86980dc1d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY3V0dGluZyUyMHNhdyUyMHRvb2xzfGVufDF8fHx8MTc1Nzc5MTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "45 minutes",
      materials: ["Cedar boards 2x8", "Cedar 2x2"],
      tools: ["Circular saw", "Measuring tape", "Drill"],
    },
    {
      id: 2,
      title: "Assemble the Box Frame",
      description: "Join the cut boards to form the planter box frame.",
      instructions: [
        "Layout the four boards in a rectangle",
        "Apply exterior wood glue to the joints",
        'Use 3" deck screws to secure corners',
        "Check for square using a speed square",
        "Wipe away excess glue",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581331583759-c1504d02c2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaXwxfHx3b29kJTIwYXNzZW1ibHklMjBnbHVlJTIwY2xhbXBzfGVufDF8fHx8MTc1Nzc5MTQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "30 minutes",
      materials: ["Exterior wood glue", '3" deck screws'],
      tools: ["Drill", "Speed square", "Clamps"],
    },
    {
      id: 3,
      title: "Add Bottom Support",
      description: "Install the bottom support and drainage.",
      instructions: [
        "Cut hardware cloth to fit the bottom",
        "Attach the 2x2 support pieces as crossbraces",
        "Staple hardware cloth to the bottom frame",
        "Drill drainage holes every 6 inches",
        "Apply wood preservative if desired",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1584804515466-e328c1147cc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBwbGFudGVyJTIwYm94JTIwZGl5fGVufDF8fHx8MTc1Nzc5MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "45 minutes",
      materials: ["Hardware cloth", "Staples", "Wood preservative"],
      tools: ["Staple gun", "Wire cutters", "Drill"],
    },
  ],
};

const gardenTrellis: Project = {
  id: "garden-trellis",
  title: "Climbing Plant Trellis",
  description: "Build a decorative trellis for climbing plants and vines.",
  difficulty: "Beginner",
  totalTime: "2 hours",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1708015694046-ba486c73fe4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0cmVsbGlzJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1Nzc5ODk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  steps: [
    {
      id: 1,
      title: "Cut Frame Pieces",
      description: "Prepare the main frame pieces for the trellis.",
      instructions: [
        "Cut 2 vertical pieces: 6 feet long",
        "Cut 3 horizontal pieces: 2 feet long",
        "Cut diagonal crosspieces: 8 pieces at various lengths",
        "Sand all pieces smooth",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1577372440262-d86980dc1d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY3V0dGluZyUyMHNhdyUyMHRvb2xzfGVufDF8fHx8MTc1Nzc5MTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "30 minutes",
      materials: ["Cedar fence pickets"],
      tools: ["Saw", "Measuring tape", "Sandpaper"],
    },
    {
      id: 2,
      title: "Assemble the Frame",
      description: "Create the basic rectangular frame structure.",
      instructions: [
        "Lay out the frame pieces on a flat surface",
        "Attach horizontal pieces to verticals with screws",
        "Ensure frame is square and sturdy",
        "Add the middle horizontal piece for extra support",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581331583759-c1504d02c2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwYXNzZW1ibHklMjBnbHVlJTIwY2xhbXBzfGVufDF8fHx8MTc1Nzc5MTQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "45 minutes",
      materials: ["Wood screws"],
      tools: ["Drill", "Square", "Clamps"],
    },
    {
      id: 3,
      title: "Add Lattice Pattern",
      description:
        "Install the diagonal crosspieces to create the climbing structure.",
      instructions: [
        "Mark positions for diagonal pieces",
        "Create a diamond or crisscross pattern",
        "Attach each piece with small screws",
        "Check that pattern is even and attractive",
        "Apply exterior wood stain or paint",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1708015694046-ba486c73fe4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0cmVsbGlzJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1Nzc5ODk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "45 minutes",
      materials: ["Small wood screws", "Exterior stain"],
      tools: ["Drill", "Level", "Paintbrush"],
    },
  ],
};

export const projectSequences: ProjectSequence[] = [
  {
    id: "garden-basics",
    title: "Garden Essentials Collection",
    description:
      "Build everything you need to start your dream garden - from wildlife homes to plant containers and climbing support.",
    totalEstimatedTime: "7-9 hours",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1584804515466-e328c1147cc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBwbGFudGVyJTIwYm94JTIwZGl5fGVufDF8fHx8MTc1Nzc5MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    projects: [birdhouse, planterBox, gardenTrellis],
  },
  {
    id: "outdoor-structures",
    title: "Backyard Builder Series",
    description:
      "Create functional outdoor structures that enhance your property and provide storage solutions.",
    totalEstimatedTime: "12-15 hours",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1666740169340-d10dfe7a48c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBzaGVkJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1Nzc5ODk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    projects: [planterBox, gardenTrellis], // Example with fewer projects
  },
];

// Export individual projects for backward compatibility if needed
export const projects: Project[] = [birdhouse, planterBox, gardenTrellis];
