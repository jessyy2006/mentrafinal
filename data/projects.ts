import { Project, ProjectSequence } from "../types/project";

const birdhouse: Project = {
  id: "birdhouse",
  title: "3 Shelf Bookcase White - Room Essentials",
  description:
    "Assemble a functional 3-shelf bookcase for organizing your space.",
  difficulty: "Beginner",
  totalTime: "1-2 hours",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJvb2tjYXNlJTIwc2hlbGZ8ZW58MXx8fHwxNzU3NzkxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  steps: [
    {
      id: 1,
      title: "Assemble side panels",
      description: "Attach the side panels to the top and bottom shelves.",
      instructions: [
        "Align side panels with shelves",
        "Insert cam locks and screws",
        "Tighten cam locks securely",
        "Ensure side panels are flush with the shelves",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBhc3NlbWJseSUyMHNpZGUlMjBwYW5lbHN8ZW58MXx8fHwxNzU3NzkxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "20 minutes",
      materials: ["Side panels", "Top shelf", "Bottom shelf", "Cam locks", "Screws"],
      tools: ["Screwdriver", "Allen wrench"],
    },
    {
      id: 2,
      title: "Attach middle shelf",
      description: "Connect the middle shelf to the side panels.",
      instructions: [
        "Align middle shelf with side panels",
        "Insert cam locks and screws",
        "Tighten cam locks",
        "Make sure middle shelf is level",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1556909114-44e3e70034e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rY2FzZSUyMHNoZWxmJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc1Nzc5MTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "15 minutes",
      materials: ["Middle shelf", "Cam locks", "Screws"],
      tools: ["Screwdriver", "Level"],
    },
    {
      id: 3,
      title: "Install back panel",
      description: "Secure the back panel to the assembled bookcase.",
      instructions: [
        "Position back panel on the bookcase",
        "Attach with screws",
        "Ensure back panel is flush",
        "Carefully align back panel before screwing in",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1609205807490-b18f5caa7e6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBiYWNrJTIwcGFuZWwlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzU3NzkxNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "20 minutes",
      materials: ["Back panel", "Screws"],
      tools: ["Screwdriver", "Measuring tape"],
    },
    {
      id: 4,
      title: "Attach levelers",
      description: "Install the leveling feet on the bottom of the bookcase.",
      instructions: [
        "Screw levelers into the bottom of the side panels",
        "Adjust levelers as needed for stability",
        "Level the bookcase on uneven floors",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1565105260192-6a797b4fe286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBsZXZlbGVycyUyMGZlZXR8ZW58MXx8fHwxNzU3NzkxNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "10 minutes",
      materials: ["Leveling feet"],
      tools: ["Screwdriver"],
    },
    {
      id: 5,
      title: "Secure bookcase to wall",
      description:
        "Attach the bookcase to the wall to prevent tipping.",
      instructions: [
        "Locate wall stud locations",
        "Drill pilot holes",
        "Insert wall anchor screws",
        "Use wall anchors for drywall installations",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1633613286991-611e299f2920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwYW5jaG9yJTIwZnVybml0dXJlfGVufDF8fHx8MTc1Nzc5MTQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      estimatedTime: "15 minutes",
      materials: ["Wall anchors", "Screws"],
      tools: ["Drill", "Stud finder", "Screwdriver"],
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
